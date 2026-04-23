import { NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({
    success: true,
    message: 'Portfolio API is running.',
    data: {
      status: 'ok',
      service: 'portfolio',
    }
  }, { status: 200 });
};