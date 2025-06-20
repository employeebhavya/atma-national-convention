// src/app/api/swirepay/payment-method/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      "https://api.swirepay.com/v1/payment-method",
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
      "Payment method error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error:
          error.response?.data?.message || "Payment method creation failed",
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}

// Other methods omitted for brevity (same pattern as tokenize)
