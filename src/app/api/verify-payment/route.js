import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const checkoutPageId = searchParams.get('id');
  
  if (!checkoutPageId) {
    return NextResponse.json({ success: false, error: 'Missing checkout page ID' }, { status: 400 });
  }

  try {
    // Call Swirepay verification API
    const response = await fetch(`https://api.swirepay.com/v1/checkout-page/${checkoutPageId}/verify`, {
      method: 'GET',
      headers: {
        'x-api-key': process.env.SWIREPAY_SECRET_KEY || process.env.NEXT_PUBLIC_SWIREPAY_PUBLIC_KEY,
      }
    });

    const data = await response.json();
    console.log("Swirepay verification response:", data);
    
    if (data.status === 'SUCCESS' && data.entity?.status === 'SUCCEEDED') {
      return NextResponse.json({ 
        success: true, 
        paymentDetails: {
          status: data.entity.status,
          receiptNumber: data.entity.paymentSession?.receiptNumber || `receipt_${checkoutPageId}`,
          amount: data.entity.amount / 100, // Convert cents to dollars
          paymentDate: data.entity.paymentSession?.paymentDate || new Date().toISOString()
        }
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        status: data.entity?.status || 'UNKNOWN' 
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}