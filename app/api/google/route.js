import axios from "axios";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_WINDOW_MS = RATE_LIMIT_WINDOW_SECONDS * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitStore = new Map();

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

function getClientIp(request) {
  const directIp = request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip");
  if (directIp) {
    const trimmed = directIp.trim();
    if (/^[a-fA-F0-9:.]+$/.test(trimmed) && trimmed.length <= 45) {
      return trimmed;
    }
  }
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const firstIp = forwardedFor.split(",")[0].trim();
  if (firstIp && /^[a-fA-F0-9:.]+$/.test(firstIp) && firstIp.length <= 45) {
    return firstIp;
  }
  return "127.0.0.1";
}

async function isRateLimited(ip) {
  if (redis) {
    try {
      const key = `google-verify-rate:${ip}`;
      const requests = await redis.incr(key);
      if (requests === 1) {
        await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
      }
      return requests > RATE_LIMIT_MAX_REQUESTS;
    } catch (error) {
      console.error("Google verify Redis fallback:", error.message);
    }
  }

  const now = Date.now();
  if (rateLimitStore.size > 1000) {
    for (const [storedIp, list] of rateLimitStore.entries()) {
      if (list.every((ts) => now - ts >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitStore.delete(storedIp);
      }
    }
  }

  const timestamps = rateLimitStore.get(ip) || [];
  const validTimestamps = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitStore.set(ip, validTimestamps);
  return false;
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again later.", success: false },
        { status: 429 }
      );
    }

    let reqBody;
    try {
      reqBody = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON payload.",
          success: false,
        },
        { status: 400 }
      );
    }

    if (!reqBody || typeof reqBody !== "object" || Array.isArray(reqBody)) {
      return NextResponse.json(
        {
          error: "Invalid JSON payload.",
          success: false,
        },
        { status: 400 }
      );
    }

    const secret_key = process.env.RECAPTCHA_SECRET_KEY;

    if (!reqBody?.token || typeof reqBody.token !== "string" || !reqBody.token.trim()) {
      return NextResponse.json(
        {
          error: "Captcha token is required.",
          success: false,
        },
        { status: 400 }
      );
    }

    if (reqBody.token.length > 2048) {
      return NextResponse.json(
        {
          error: "Captcha token exceeds allowed length.",
          success: false,
        },
        { status: 400 }
      );
    }

    if (!secret_key) {
      return NextResponse.json(
        {
          error: "Captcha secret key is missing on server.",
          success: false,
        },
        { status: 400 }
      );
    }

    try {
      const params = new URLSearchParams();
      params.append("secret", secret_key);
      params.append("response", reqBody.token.trim());

      const res = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        params.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 5000,
        }
      );

      if (res.data.success) {
        return NextResponse.json({
          message: "Captcha verification success!!",
          success: true,
        });
      }

      return NextResponse.json(
        {
          error: "Captcha verification failed!",
          success: false,
        },
        { status: 500 }
      );
    } catch {
      return NextResponse.json(
        {
          error: "Captcha verification failed!",
          success: false,
        },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        error: "Server error occurred.",
        success: false,
      },
      { status: 500 }
    );
  }
}
