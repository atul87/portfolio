import axios from 'axios';
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const isValidEmail = (value = '') => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value);
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_WINDOW_MS = RATE_LIMIT_WINDOW_SECONDS * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map();
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })
  : null;

function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for') || '';
  const firstIp = forwardedFor.split(',')[0].trim();
  return firstIp || 'unknown';
}

async function isRateLimited(ip) {
  if (redis) {
    try {
      const key = `rate:${ip}`;
      const requests = await redis.incr(key);
      if (requests === 1) {
        await redis.expire(key, RATE_LIMIT_WINDOW_SECONDS);
      }

      return requests > RATE_LIMIT_MAX_REQUESTS;
    } catch (error) {
      console.error('Rate limiter Redis fallback:', error.message);
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

// Helper function to create Nodemailer transporter dynamically
function getTransporter() {
  const user = process.env.EMAIL_ADDRESS;
  const pass = (process.env.GMAIL_PASSKEY || '').replace(/\s+/g, '');
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });
}

// Helper function to send a message via Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error('Error sending Telegram message:', error.response?.data || error.message);
    return false;
  }
};

const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char])
  );

// HTML email template
const generateEmailTemplate = (name, email, userMessage) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #007BFF;">New Message Received</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #007BFF; padding-left: 10px; margin-left: 0;">
        ${escapeHtml(userMessage)}
      </blockquote>
      <p style="font-size: 12px; color: #888;">Click reply to respond to the sender.</p>
    </div>
  </div>
`;

// Helper function to send an email via Nodemailer
async function sendEmail(payload, message) {
  const { name, email, message: userMessage } = payload;
  const user = process.env.EMAIL_ADDRESS;
  const pass = (process.env.GMAIL_PASSKEY || '').replace(/\s+/g, '');

  if (!user || !pass) {
    return { ok: false, error: 'Email sender credentials are missing.' };
  }

  // Sanitize against SMTP CRLF injection
  const cleanName = String(name || '').replace(/[\r\n]/g, ' ').trim();
  const cleanEmail = String(email || '').replace(/[\r\n]/g, '').trim();

  const transporter = getTransporter();
  const mailOptions = {
    from: `Portfolio Contact <${user}>`,
    to: user,
    subject: `New Message From ${cleanName}`,
    text: message,
    html: generateEmailTemplate(cleanName, cleanEmail, userMessage),
    replyTo: cleanEmail,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { ok: true };
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return { ok: false, error: error.message };
  }
};

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    if (await isRateLimited(ip)) {
      return NextResponse.json({
        success: false,
        message: 'Too many requests. Try later.',
      }, { status: 429 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const { name, email, message: userMessage, website } = payload;

    // Honeypot check: automated spam bots fill hidden inputs
    if (website) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!',
      }, { status: 200 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chat_id = process.env.TELEGRAM_CHAT_ID;
    const emailAddress = process.env.EMAIL_ADDRESS;
    const gmailPasskey = process.env.GMAIL_PASSKEY;

    // Basic payload validation
    if (!name || !email || !userMessage) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and message are required.',
      }, { status: 400 });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof userMessage !== 'string') {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and message must be valid strings.',
      }, { status: 400 });
    }

    // Strip carriage returns and line feeds to prevent header injection
    const cleanName = name.replace(/[\r\n]/g, ' ').trim();
    const cleanEmail = email.replace(/[\r\n]/g, '').trim();

    if (!cleanName) {
      return NextResponse.json({
        success: false,
        message: 'Name, email, and message are required.',
      }, { status: 400 });
    }

    if (cleanName.length > 100 || cleanEmail.length > 100 || userMessage.length > 2000) {
      return NextResponse.json({
        success: false,
        message: 'Input exceeds maximum allowed length.',
      }, { status: 400 });
    }

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a valid email address.',
      }, { status: 400 });
    }

    if (!emailAddress || !gmailPasskey) {
      return NextResponse.json({
        success: false,
        message: 'Email sender credentials are missing.',
      }, { status: 400 });
    }

    const message = `New message from ${cleanName}\n\nEmail: ${cleanEmail}\n\nMessage:\n\n${userMessage}\n\n`;

    // Email is the primary channel.
    const emailResult = await sendEmail({ name: cleanName, email: cleanEmail, message: userMessage }, message);

    // Telegram is optional and should not block email delivery.
    let telegramSuccess = null;
    if (token && chat_id) {
      telegramSuccess = await sendTelegramMessage(token, chat_id, message);
    }

    if (emailResult.ok) {
      return NextResponse.json({
        success: true,
        message: telegramSuccess === false
          ? 'Email sent, but Telegram notification failed.'
          : 'Message sent successfully!',
      }, { status: 200 });
    }

    const isBadCredentials = emailResult.error && (
      emailResult.error.includes('535') || 
      emailResult.error.includes('BadCredentials') ||
      emailResult.error.includes('Username and Password not accepted')
    );

    return NextResponse.json({
      success: false,
      message: isBadCredentials
        ? 'Gmail rejected the configured App Password. Update GMAIL_PASSKEY in Vercel Project Settings → Environment Variables for Production, then redeploy. Do not rely on .env.local for production.'
        : 'Failed to send email. Please try again later.',
    }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Server error occurred.',
    }, { status: 500 });
  }
};