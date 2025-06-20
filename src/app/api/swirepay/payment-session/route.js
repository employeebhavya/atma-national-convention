// src/app/api/swirepay/payment-session/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      "https://api.swirepay.com/v2/payment-session",
      body,
      {
        headers: {
          "x-api-key": process.env.SWIREPAY_SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Payment session error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error:
          error.response?.data?.message || "Payment session creation failed",
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}

// Other methods omitted for brevity (same pattern as tokenize)
