import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Swirepay callback received:", data);
    
    // Validate the payment data
    if (data.status === 'SUCCEEDED' && data.paymentSession?.status === 'SUCCEEDED') {
      // Process successful payment - update your database
      await processSuccessfulPayment(data);
      
      return NextResponse.json({ success: true });
    } else {
      console.log('Payment not successful:', data.status);
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error('Swirepay callback error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

async function processSuccessfulPayment(data) {
  // This function would update an existing registration
  // or create a new one if it doesn't exist yet
  try {
    const { gid, paymentSession } = data;
    
    if (!gid || !paymentSession) {
      throw new Error('Missing payment data');
    }
    
    // Check if registration already exists
    const checkResponse = await fetch(`/api/registrations/check?checkoutPageId=${gid}`, {
      method: 'GET',
    });
    
    const checkData = await checkResponse.json();
    
    if (checkData.exists) {
      // Update existing registration
      await fetch(`/api/registrations/${checkData.registrationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: paymentSession.receiptNumber,
          paymentStatus: 'completed',
          paymentDate: paymentSession.paymentDate,
        }),
      });
    } else {
      // Registration will be created when user returns to the callback page
      console.log('Registration not found for checkout page ID:', gid);
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}