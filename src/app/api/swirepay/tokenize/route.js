// src/app/api/swirepay/tokenize/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      "https://api.swirepay.com/v1/token",
      body,
      {
        headers: {
          "x-api-key": process.env.SWIREPAY_PUBLIC_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Tokenization error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: error.response?.data?.message || "Tokenization failed",
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}

// Explicitly declare other unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
