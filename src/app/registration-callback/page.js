"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// Loading component for Suspense fallback
function LoadingFallback() {
  return (
    <div className="max-w-md mx-auto my-10 p-8 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-black mb-4">Loading...</h2>
      <div className="w-12 h-12 border-4 border-t-[#dc1d46] border-gray-200 rounded-full animate-spin mx-auto"></div>
    </div>
  );
}

// Component that uses useSearchParams
function RegistrationCallbackContent() {
  const [status, setStatus] = useState("loading");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function verifyPaymentAndSaveRegistration() {
      try {
        const checkoutPageId =
          searchParams.get("sp-checkout-page") ||
          localStorage.getItem("checkoutPageId");

        if (!checkoutPageId) {
          setStatus("error");
          return;
        }

        // Verify payment with your backend
        const verifyResponse = await fetch(
          `/api/verify-payment?id=${checkoutPageId}`
        );
        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
          // Get the stored registration data
          const pendingRegistrationData = localStorage.getItem(
            "pendingRegistration"
          );

          if (!pendingRegistrationData) {
            setStatus("data-missing");
            return;
          }

          const { formData } = JSON.parse(pendingRegistrationData);

          // Now save the registration with confirmed payment status
          const saveResponse = await fetch("/api/registrations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              checkoutPageId: checkoutPageId,
              transactionId:
                verifyData.paymentDetails.receiptNumber || checkoutPageId,
              paymentStatus: "completed",
              registrationDate: new Date().toISOString(),
              // Make sure to pass along the discount information from localStorage
              discountApplied: formData.discountApplied || 0,
              originalAmount: formData.originalAmount || formData.amount,
              paidAmount: formData.paidAmount || formData.amount,
              // Use the paidAmount as the final amount
              amount: formData.paidAmount || formData.amount,
            }),
          });

          if (!saveResponse.ok) {
            const errorData = await saveResponse.json();
            console.error("Registration save error:", errorData);
            setStatus("save-failed");
            return;
          }

          // Success! Clear localStorage
          localStorage.removeItem("pendingRegistration");
          localStorage.removeItem("checkoutPageId");

          setStatus("success");
          setPaymentDetails(verifyData.paymentDetails);
        } else {
          setStatus("payment-failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
      }
    }

    verifyPaymentAndSaveRegistration();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="max-w-md mx-auto my-10 p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-black mb-4">
          Verifying Registration...
        </h2>
        <div className="w-12 h-12 border-4 border-t-[#dc1d46] border-gray-200 rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto my-14 p-8 bg-green-50 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-black mb-4">
          Registration Successful!
        </h2>
        <p className="text-black mb-4">
          Thank you for registering for ATMA. A confirmation has been sent to
          your email.
        </p>
        {paymentDetails && (
          <div className="mb-6 text-left p-4 bg-white rounded">
            <p className="font-medium">
              Receipt #: {paymentDetails.receiptNumber}
            </p>
            <p className="font-medium">
              Amount: ${paymentDetails.amount.toFixed(2)}
            </p>
          </div>
        )}
        <div className="mt-6">
          <Link href="/">
            <button className="px-4 py-2 bg-[#dc1d46] text-white hover:bg-[black] cursor-pointer">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Handle various error states
  const errorMessages = {
    error:
      "There was an issue verifying your registration. Please contact support.",
    "data-missing":
      "Your registration data was not found. Please try registering again.",
    "save-failed":
      "Your payment was processed but we could not save your registration. Please contact support.",
    "payment-failed":
      "Your payment was not successful. Please try again or contact support.",
  };

  return (
    <div className="max-w-md mx-auto my-14 p-8 bg-red-50 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-black mb-4">
        Registration Verification Failed
      </h2>
      <p className="text-black mb-4">
        {errorMessages[status] ||
          "There was an issue with your registration. Please contact support."}
      </p>
      <div className="mt-6">
        <Link href="/">
          <button className="px-4 py-2 bg-[#dc1d46] text-white hover:bg-[black] cursor-pointer">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

// Main export component with Suspense boundary
export default function RegistrationCallback() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegistrationCallbackContent />
    </Suspense>
  );
}
