"use client";
import { useState, useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistrationForm1() {
  // Existing form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    medicalSchool: "",
    specialty: "",
    spouseName: "",
    childrenNames: "",
    vegetarianMeals: 0,
    nonVegetarianMeals: 0,
    registrationType: "",
    registrationLabel: "",
    amount: "",
    agreeTerms: false,
  });

  // Existing state variables
  const [quantities, setQuantities] = useState({
    specialGuest: 0,
    familyAdult: 0,
    familyKids: 0,
    medicalGuest: 0,
    yosemiteGuest: 0,
  });

  // Add Swirepay specific states
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [checkoutPageId, setCheckoutPageId] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Add to your existing state variables
  const [paypalReady, setPaypalReady] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // "paypal" or "swirepay"

  const router = useRouter();
  const successMessageRef = useRef(null);

  // Swirepay configuration
  const SWIREPAY_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_SWIREPAY_PUBLIC_KEY ||
    "pk_test_5CiWc6P5D92bGdj9x6L4FPH67aUMOG0m"; // This is the test key from the documentation
  const SWIREPAY_API_URL = "https://api.swirepay.com/v1";

  const registrationOptions = [
    {
      label: "Platinum Sponsors",
      value: "platinum_family",
      amount: 1950,
      description: [
        "Physician and Family",
        "Front Row Seating & Recognition",
        "Stage time 5 mins",
        "Awardee for Winners",
        "Full Page of Souvenir Family Photos and other Achievements details",
      ],
      buttonText: "Select Platinum",
    },
    {
      label: "Gold Sponsors",
      value: "gold_couple",
      amount: 1450,
      description: [
        "Physician and Spouse only",
        "Reservation for next Row to Platinum group",
        "Stage time 3 mins",
        "Half Page of Souvenir for Featuring Family Photos & Achievements",
        "Recognition during Event",
      ],
      buttonText: "Select Gold",
    },
    {
      label: "Silver Sponsors",
      value: "silver",
      options: [
        {
          label: "Physician",
          value: "silver_physician",
          amount: 450,
          buttonText: "Select Physician",
        },
        {
          label: "Spouse (Non-Physician)",
          value: "silver_spouse",
          amount: 300,
          buttonText: "Select Non-Physician",
        },
      ],
    },
    {
      label: "Allied Medical Group",
      value: "special_guest",
      perPerson: 200,
      description: ["PA, NP, RN, LVN, PCA and all Medical Technicians"],
    },
    {
      label: "Family Guest",
      value: "family_guest",
      options: [
        {
          label: "Adults/ Adolescents: $150 Each for three days",
          value: "family_adult",
          perPerson: 150,
        },
        {
          label: "Kids Below 15 years - 5 years old: $100 for three days",
          value: "family_kids",
          perPerson: 100,
        },
      ],
      note: "Kids below 5 yrs: No fees",
    },
    {
      label: "Medical Students, Foreign students and  foreign Guests",
      value: "student_guest",
      perPerson: 100,
      note: "$ 100 for three days",
    },
    {
      label: "Yosemite National Park Tour",
      value: "yosemite_trip",
      perPerson: 100,
      description: [
        "Includes transport + entry",
        "A one-day event on 23 August 2025",
        "Saturday | 6 AM - 6 PM",
      ],
    },
  ];

  const updateQuantity = (type, value) => {
    const newValue = Math.max(0, value);
    setQuantities((prev) => ({
      ...prev,
      [type]: newValue,
    }));

    if (newValue > 0) {
      let amount = 0;
      let label = "";

      switch (type) {
        case "specialGuest":
          amount = newValue * 200;
          label = `Special Guest (${newValue} person${
            newValue !== 1 ? "s" : ""
          })`;
          setFormData((prev) => ({
            ...prev,
            registrationType: "special_guest",
            registrationLabel: label,
            amount: amount.toString(),
          }));
          break;
        case "familyAdult":
          amount = newValue * 150 + quantities.familyKids * 100;
          label = `Family Guest (${newValue} adult${
            newValue !== 1 ? "s" : ""
          }, ${quantities.familyKids} kid${
            quantities.familyKids !== 1 ? "s" : ""
          })`;
          setFormData((prev) => ({
            ...prev,
            registrationType: "family_guest",
            registrationLabel: label,
            amount: amount.toString(),
          }));
          break;
        case "familyKids":
          amount = quantities.familyAdult * 150 + newValue * 100;
          label = `Family Guest (${quantities.familyAdult} adult${
            quantities.familyAdult !== 1 ? "s" : ""
          }, ${newValue} kid${newValue !== 1 ? "s" : ""})`;
          setFormData((prev) => ({
            ...prev,
            registrationType: "family_guest",
            registrationLabel: label,
            amount: amount.toString(),
          }));
          break;
        case "medicalGuest":
          amount = newValue * 100;
          label = `Medical Students (${newValue} person${
            newValue !== 1 ? "s" : ""
          })`;
          setFormData((prev) => ({
            ...prev,
            registrationType: "student_guest",
            registrationLabel: label,
            amount: amount.toString(),
          }));
          break;
        case "yosemiteGuest":
          amount = newValue * 100;
          label = `Yosemite Trip (${newValue} person${
            newValue !== 1 ? "s" : ""
          })`;
          setFormData((prev) => ({
            ...prev,
            registrationType: "yosemite_trip",
            registrationLabel: label,
            amount: amount.toString(),
          }));
          break;
      }
    } else if (
      formData.registrationType === type.replace("silver", "silver_")
    ) {
      setFormData((prev) => ({
        ...prev,
        registrationType: "",
        registrationLabel: "",
        amount: "",
      }));
    }
  };

  const handleRegistrationSelect = (option, subOption = null) => {
    let amount = 0;
    let label = option.label;

    if (subOption) {
      label = `${option.label} - ${subOption.label}`;
      amount = subOption.amount;
    } else if (option.perPerson) {
      const quantity =
        option.value === "special_guest"
          ? quantities.specialGuest
          : option.value === "student_guest"
          ? quantities.medicalGuest
          : quantities.yosemiteGuest;

      amount = quantity * option.perPerson;
      label = `${option.label} (${quantity} person${
        quantity !== 1 ? "s" : ""
      })`;
    } else {
      amount = option.amount;
    }

    setFormData((prev) => ({
      ...prev,
      registrationType: subOption ? subOption.value : option.value,
      registrationLabel: label,
      amount: amount.toString(),
    }));
  };

  useEffect(() => {
    const isValid =
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zip &&
      formData.medicalSchool &&
      formData.specialty &&
      formData.registrationType &&
      formData.amount &&
      !isNaN(parseFloat(formData.amount)) &&
      parseFloat(formData.amount) > 0 &&
      formData.agreeTerms;

    setFormValid(isValid);
  }, [formData]);

  useEffect(() => {
    if (paymentSuccess && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [paymentSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to create a Swirepay checkout page
  const createCheckoutPage = async () => {
    try {
      setPaymentLoading(true);

      // Check if early bird discount applies
      const discountApplied = isEarlyBirdActive();
      const originalAmount = formData.amount;
      const paidAmount = discountApplied
        ? calculateDiscountedAmount(originalAmount)
        : originalAmount;

      // Store registration data in localStorage for later retrieval
      localStorage.setItem(
        "pendingRegistration",
        JSON.stringify({
          formData: {
            ...formData,
            paymentMethod: "swirepay",
            discountApplied: discountApplied
              ? EARLY_BIRD_DISCOUNT_PERCENTAGE
              : 0,
            originalAmount: originalAmount,
            paidAmount: paidAmount,
            // Override the amount with the discounted amount if early bird is active
            amount: discountApplied ? paidAmount.toString() : originalAmount,
          },
          timestamp: new Date().toISOString(),
        })
      );

      // API call to create a checkout page
      const response = await fetch(`${SWIREPAY_API_URL}/checkout-page`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": SWIREPAY_PUBLIC_KEY,
        },
        body: JSON.stringify({
          // Apply early bird discount if applicable
          amount: discountApplied
            ? parseInt(paidAmount) * 100 // Convert to cents
            : parseInt(originalAmount) * 100, // Convert to cents
          currencyCode: "USD",
          sessionTimeout: 900, // 15 minutes
          paymentMethodType: ["CARD"],
          redirectUri: `${window.location.origin}/registration-callback`,
          serverCallbackUrl: `${window.location.origin}/api/swirepay-callback`,
          meta: {
            registrationType: formData.registrationType,
            registrationLabel:
              formData.registrationLabel +
              (discountApplied ? " (Early Bird)" : ""),
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerEmail: formData.email,
            paymentMethod: "swirepay",
            originalAmount: originalAmount,
            discountApplied: discountApplied
              ? EARLY_BIRD_DISCOUNT_PERCENTAGE
              : 0,
            paidAmount: paidAmount,
          },
        }),
      });

      const data = await response.json();
      console.error("Swirepay API response:", data);

      if (data.status === "SUCCESS" && data.entity) {
        const { gid, link } = data.entity;
        setCheckoutPageId(gid);

        // Store checkout page ID in localStorage
        localStorage.setItem("checkoutPageId", gid);

        // Redirect to Swirepay checkout page
        window.location.href = link;
      } else {
        console.error("Payment page creation failed:", data);
        alert(
          `Failed to create payment page: ${data.message || "Unknown error"}`
        );
        setPaymentLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(`There was an error processing your payment: ${error.message}`);
      setPaymentLoading(false);
    }
  };

  // Function to save registration data
  const saveRegistration = async (
    checkoutPageId,
    transactionId,
    status = "pending"
  ) => {
    try {
      // Check if early bird discount applies
      const discountApplied = isEarlyBirdActive();
      const originalAmount = formData.amount;
      const paidAmount = discountApplied
        ? calculateDiscountedAmount(originalAmount)
        : originalAmount;

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          checkoutPageId: checkoutPageId,
          transactionId: transactionId || `${checkoutPageId}`,
          paymentStatus: status,
          registrationDate: new Date().toISOString(),
          // Add discount information
          discountApplied: discountApplied ? EARLY_BIRD_DISCOUNT_PERCENTAGE : 0,
          originalAmount: originalAmount,
          paidAmount: paidAmount,
          // If early bird is active, override the amount with the discounted amount
          amount: discountApplied ? paidAmount.toString() : originalAmount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration save error details:", errorData);
        throw new Error(
          `Failed to save registration: ${errorData.error || "Unknown error"}`
        );
      }

      return true;
    } catch (error) {
      console.error("Registration save failed:", error);
      return false;
    }
  };

  // Function to verify payment (after redirect)
  const verifyPayment = async (checkoutPageId) => {
    // This would be implemented on your callback page
    // Code shown here for reference
    try {
      const response = await fetch(`/api/verify-payment?id=${checkoutPageId}`, {
        method: "GET",
      });

      const data = await response.json();

      if (data.success) {
        setPaymentSuccess(true);
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      alert(
        "There was an error verifying your payment. Please contact support."
      );
    }
  };

  // Replace handleProceedToPayment with this updated version
  const handleProceedToPayment = () => {
    if (!formValid) {
      alert("Please fill all required fields before proceeding to payment");
      return;
    }
    setShowReviewModal(true);
  };

  // Update the initiatePayment function to show payment options
  const initiatePayment = () => {
    setShowReviewModal(false);
    setShowPaymentOptions(true); // Show payment options instead of directly proceeding

    // Initialize PayPal when showing payment options
    setPaypalReady(true);
  };

  // Add a function to handle selecting a payment method
  const handlePaymentMethodSelect = async (method) => {
    setSelectedPaymentMethod(method);

    if (method === "swirepay") {
      // Close payment options modal and proceed with Swirepay
      setShowPaymentOptions(false);

      if (!validatePaymentData()) {
        return;
      }

      try {
        await createCheckoutPage();
      } catch (error) {
        console.error("Payment initiation failed:", error);
        alert("There was an error initiating payment. Please try again.");
        setPaymentLoading(false);
      }
    }
    // For PayPal, we leave the modal open with PayPal buttons
  };

  // Function to validate payment data
  const validatePaymentData = () => {
    const amount = parseInt(formData.amount);
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please select a valid registration option with a payment amount.");
      return false;
    }

    // Validate that amount is not too small (Swirepay may have minimum amount requirements)
    if (amount < 1) {
      alert(
        "Payment amount is too small. Please select a valid registration option."
      );
      return false;
    }

    return true;
  };

  // Update the debugPaymentCreation function
  const debugPaymentCreation = () => {
    const testPayload = {
      amount: parseInt(formData.amount) * 100,
      currencyCode: "USD",
      sessionTimeout: 900,
      paymentMethodType: ["CARD"], // Remove ACH, only use CARD
      redirectUri: `${window.location.origin}/registration-callback`,
      meta: {
        registrationType: formData.registrationType,
        customerName: `${formData.firstName} ${formData.lastName}`,
      },
    };

    // console.log("Testing with simplified payload:", testPayload);

    fetch(`${SWIREPAY_API_URL}/checkout-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SWIREPAY_PUBLIC_KEY,
      },
      body: JSON.stringify(testPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Debug API response:", data);
        if (data.status !== "SUCCESS") {
          console.error("API Error details:", data);
        }
      })
      .catch((error) => {
        console.error("Debug API call failed:", error);
      });
  };

  const updateMealQuantity = (type, value) => {
    const newValue = Math.max(0, value);
    setFormData((prev) => ({
      ...prev,
      [type]: newValue,
    }));
  };

  // Add PayPal functions
  const createOrder = (data, actions) => {
    // Apply early bird discount if applicable
    const paymentAmount = isEarlyBirdActive()
      ? calculateDiscountedAmount(formData.amount).toString()
      : formData.amount;

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: paymentAmount,
            currency_code: "USD",
          },
          description: `ATMA Registration: ${formData.registrationLabel}${
            isEarlyBirdActive() ? " (Early Bird)" : ""
          }`,
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      setPaymentLoading(true);
      const details = await actions.order.capture();

      // Check if early bird discount was applied
      const discountApplied = isEarlyBirdActive();
      const originalAmount = formData.amount;
      const paidAmount = discountApplied
        ? calculateDiscountedAmount(originalAmount)
        : originalAmount;

      // Save registration with PayPal transaction details
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          transactionId: details.id,
          paymentMethod: "paypal",
          paymentStatus: "completed",
          registrationDate: new Date().toISOString(),
          discountApplied: discountApplied ? EARLY_BIRD_DISCOUNT_PERCENTAGE : 0,
          originalAmount: originalAmount,
          paidAmount: paidAmount,
          // Override the amount with the discounted amount if early bird is active
          amount: discountApplied ? paidAmount.toString() : originalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process registration");
      }

      setPaymentSuccess(true);
      setShowPaymentOptions(false);
      setPaymentLoading(false);
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert(
        "There was an error processing your registration. Please try again."
      );
      setShowPaymentOptions(false);
      setPaymentLoading(false);
    }
  };

  // Add these constants after your state declarations

  // Early bird discount configuration
  const EARLY_BIRD_DISCOUNT_PERCENTAGE = 10;
  const EARLY_BIRD_END_DATE = new Date("2025-07-20T23:59:59");

  // Check if early bird discount is active and applicable
  const isEarlyBirdActive = () => {
    // Don't apply discount to Yosemite trip
    if (formData.registrationType === "yosemite_trip") {
      return false;
    }

    const currentDate = new Date();
    return currentDate <= EARLY_BIRD_END_DATE;
  };

  // Calculate discounted amount
  const calculateDiscountedAmount = (originalAmount) => {
    if (!isEarlyBirdActive()) return originalAmount;

    const originalValue = parseInt(originalAmount);
    const discountAmount =
      (originalValue * EARLY_BIRD_DISCOUNT_PERCENTAGE) / 100;
    return Math.round(originalValue - discountAmount);
  };

  // Update the success message display

  if (paymentSuccess) {
    return (
      <div
        ref={successMessageRef}
        className="max-w-md mx-auto mt-10 p-8 bg-green-50 rounded-lg shadow-md text-center"
      >
        <h2 className="text-3xl font-bold text-black mb-4">
          Registration Successful!
        </h2>
        <p className="text-black mb-4">
          Thank you for registering for ATMA. A confirmation has been sent to
          your email.
        </p>
        {isEarlyBirdActive() && (
          <div className="mb-4 p-3 bg-green-100 rounded-md">
            <p className="text-green-800">
              <span className="font-bold">Early Bird Discount:</span> 10% off
              applied to your registration
            </p>
          </div>
        )}
        <div className="mt-6">
          <Link href="/">
            <button className="px-4 py-2 bg-[#dc1d46] text-white hover:bg-[black] cursor-pointer">
              Return to ATMA Website
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="relative my-14" id="form">
      <div className="container bg-white">
        <h1 className="text-2xl lg:text-3xl text-center mb-8">
          ATMA August 2025 National Convention Registration Form
        </h1>

        <form className="space-y-8">
          <div className="flex flex-col gap-12">
            {/* Left Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  E-Mail Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  Zip Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full border-b border-gray-400"
                  required
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">
                    Medical School<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="medicalSchool"
                    value={formData.medicalSchool}
                    onChange={handleChange}
                    className="w-full border-b border-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">
                    Specialty<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full border-b border-gray-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">
                    Spouse Name
                  </label>
                  <input
                    type="text"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-600 mb-1">
                    Children Names
                  </label>
                  <input
                    type="text"
                    name="childrenNames"
                    value={formData.childrenNames}
                    onChange={handleChange}
                    className="w-full border-b border-gray-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-600 mb-5">
                      Number Of Vegetarian Meals
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateMealQuantity(
                            "vegetarianMeals",
                            formData.vegetarianMeals - 1
                          )
                        }
                        className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                        disabled={formData.vegetarianMeals <= 0}
                      >
                        -
                      </button>
                      <span className="text-sm text-[#dc1d46] border border-[#dc1d46] px-3 py-1.5">
                        {formData.vegetarianMeals}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateMealQuantity(
                            "vegetarianMeals",
                            formData.vegetarianMeals + 1
                          )
                        }
                        className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-600 mb-5">
                      Number Of Non Vegetarian Meals
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateMealQuantity(
                            "nonVegetarianMeals",
                            formData.nonVegetarianMeals - 1
                          )
                        }
                        className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                        disabled={formData.nonVegetarianMeals <= 0}
                      >
                        -
                      </button>
                      <span className="text-sm text-[#dc1d46] border border-[#dc1d46] px-3 py-1.5">
                        {formData.nonVegetarianMeals}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateMealQuantity(
                            "nonVegetarianMeals",
                            formData.nonVegetarianMeals + 1
                          )
                        }
                        className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Type Cards */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-black mb-4">
              Registration<span className="text-red-500">*</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 [1300px]:grid-cols-5 gap-4">
              {registrationOptions.map((option) => (
                <div
                  key={option.value}
                  className={`border rounded-lg p-6 transition-all flex flex-col h-full ${
                    formData.registrationType.startsWith(option.value)
                      ? "border-[#dc1d46] bg-red-50"
                      : "border-gray-300 hover:border-[#dc1d46]"
                  }`}
                >
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-black mb-2">
                      {option.label}
                    </h3>

                    {option.description && (
                      <ul className="text-base text-gray-800 space-y-1 mb-4">
                        {option.description.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    )}
                    {option.note && (
                      <p className="text-base text-gray-800 mb-4">
                        {option.note}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto">
                    {option.options ? (
                      // Silver Donor or Family Guest Card
                      <div className="space-y-3">
                        {option.options.map((subOption) => (
                          <div key={subOption.value} className="space-y-2">
                            <p className="text-gray-800 text-base">
                              {subOption.label}
                            </p>
                            <p className="text-lg font-bold text-[#dc1d46]">
                              ${subOption.perPerson || subOption.amount}
                              {subOption.perPerson ? " each" : ""}
                            </p>
                            {option.value === "family_guest" ? (
                              <div className="flex items-center gap-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      subOption.value === "family_adult"
                                        ? "familyAdult"
                                        : "familyKids",
                                      (subOption.value === "family_adult"
                                        ? quantities.familyAdult
                                        : quantities.familyKids) - 1
                                    )
                                  }
                                  className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                                  disabled={
                                    (subOption.value === "family_adult"
                                      ? quantities.familyAdult
                                      : quantities.familyKids) <= 0
                                  }
                                >
                                  -
                                </button>
                                <span className="text-sm text-[#dc1d46] border border-[#dc1d46] px-3 py-1.5">
                                  {(subOption.value === "family_adult"
                                    ? quantities.familyAdult
                                    : quantities.familyKids) || "0"}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      subOption.value === "family_adult"
                                        ? "familyAdult"
                                        : "familyKids",
                                      (subOption.value === "family_adult"
                                        ? quantities.familyAdult
                                        : quantities.familyKids) + 1
                                    )
                                  }
                                  className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  handleRegistrationSelect(option, subOption)
                                }
                                className={`px-4 py-2 w-full cursor-pointer text-sm ${
                                  formData.registrationType === subOption.value
                                    ? "bg-[#dc1d46] text-white"
                                    : "bg-transparent text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white border border-[#dc1d46] hover:border-transparent"
                                }`}
                              >
                                {subOption.buttonText}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : option.perPerson ? (
                      // Per-person cards (Special Guest, Medical Students, Yosemite)
                      <div className="space-y-2">
                        <p className="text-lg font-bold text-[#dc1d46]">
                          ${option.perPerson} per person
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                option.value === "special_guest"
                                  ? "specialGuest"
                                  : option.value === "student_guest"
                                  ? "medicalGuest"
                                  : "yosemiteGuest",
                                (option.value === "special_guest"
                                  ? quantities.specialGuest
                                  : option.value === "student_guest"
                                  ? quantities.medicalGuest
                                  : quantities.yosemiteGuest) - 1
                              )
                            }
                            className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                            disabled={
                              (option.value === "special_guest"
                                ? quantities.specialGuest
                                : option.value === "student_guest"
                                ? quantities.medicalGuest
                                : quantities.yosemiteGuest) <= 0
                            }
                          >
                            -
                          </button>
                          <span className="text-sm text-[#dc1d46] border border-[#dc1d46] px-3 py-1.5">
                            {(option.value === "special_guest"
                              ? quantities.specialGuest
                              : option.value === "student_guest"
                              ? quantities.medicalGuest
                              : quantities.yosemiteGuest) || "0"}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                option.value === "special_guest"
                                  ? "specialGuest"
                                  : option.value === "student_guest"
                                  ? "medicalGuest"
                                  : "yosemiteGuest",
                                (option.value === "special_guest"
                                  ? quantities.specialGuest
                                  : option.value === "student_guest"
                                  ? quantities.medicalGuest
                                  : quantities.yosemiteGuest) + 1
                              )
                            }
                            className="px-3 py-1 border border-[#dc1d46] text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Fixed price options (Platinum, Gold)
                      <div className="space-y-2">
                        <p className="text-lg font-bold text-[#dc1d46]">
                          ${option.amount.toLocaleString()}
                          {option.label === "Platinum Donor" &&
                            " (Physician Family)"}
                          {option.label === "Gold Donor" &&
                            " (Physician + Spouse)"}
                        </p>
                        <button
                          type="button"
                          onClick={() => handleRegistrationSelect(option)}
                          className={`px-4 py-2 w-full cursor-pointer text-sm ${
                            formData.registrationType === option.value
                              ? "bg-[#dc1d46] text-white"
                              : "bg-transparent text-[#dc1d46] hover:bg-[#dc1d46] hover:text-white border border-[#dc1d46] hover:border-transparent"
                          }`}
                        >
                          {option.buttonText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and Payment */}
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="flex items-center h-6">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#dc1d46]"
                  required
                />
              </div>
              <div className="ml-3 text-base">
                <label htmlFor="agreeTerms" className="font-medium text-black">
                  I agree to the terms and conditions
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-500">
                  By checking this box, I confirm that all information provided
                  is accurate.
                </p>
              </div>
            </div>

            <div className="text-left">
              <button
                type="button"
                onClick={handleProceedToPayment}
                disabled={!formValid}
                className={`px-6 py-3 text-white ${
                  formValid
                    ? "bg-[#dc1d46] hover:bg-black cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Payment Options Modal */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-black mb-4">
              Choose Payment Method
            </h2>
            <div className="mb-4 p-4 bg-gray-50">
              <h3 className="text-lg font-medium">Registration Fee</h3>
              {isEarlyBirdActive() ? (
                <div className="space-y-1">
                  <p className="text-xl font-bold flex items-center">
                    <span className="line-through text-gray-500 mr-2">
                      ${parseInt(formData.amount).toLocaleString()}
                    </span>
                    $
                    {calculateDiscountedAmount(
                      formData.amount
                    ).toLocaleString()}
                  </p>
                  <p className="text-sm text-[#dc1d46] font-medium flex items-center">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="#dc1d46"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Early Bird Discount (10% off) applied
                  </p>
                </div>
              ) : (
                <p className="text-xl font-bold">
                  ${parseInt(formData.amount).toLocaleString()}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-black text-base mb-4">
                For Direct Bank Transfers contact WhatsApp number{" "}
                <a
                  href="https://wa.me/17323546272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#dc1d46] font-semibold text-lg"
                >
                  +1 732-354-6272
                </a>
                .
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => handlePaymentMethodSelect("swirepay")}
                  className={`px-4 py-3 bg-[#dc1d46] border-[#dc1d46] text-white w-full flex items-center justify-center border-1 rounded-md hover:bg-transparent hover:text-black cursor-pointer`}
                >
                  <span className="font-medium">Pay with Swirepay</span>
                  <span className="text-xs ml-2">(Credit/Debit Cards)</span>
                </button>

                <div
                  className={`${
                    selectedPaymentMethod === "paypal"
                      ? "opacity-100"
                      : "opacity-90"
                  }`}
                >
                  <button
                    onClick={() => handlePaymentMethodSelect("paypal")}
                    className={`px-4 py-3 w-full border-[#dc1d46] border-1 text-base text-black flex items-center justify-center rounded-md mb-4 hover:bg-[#dc1d46] hover:text-white cursor-pointer`}
                  >
                    <span className="font-medium">Pay with PayPal</span>
                  </button>

                  {selectedPaymentMethod === "paypal" && paypalReady && (
                    <PayPalScriptProvider
                      options={{
                        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                        currency: "USD",
                        intent: "capture",
                      }}
                    >
                      <PayPalButtons
                        style={{
                          layout: "vertical",
                          color: "gold",
                          shape: "rect",
                          label: "paypal",
                        }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={(err) => {
                          console.error("PayPal Error:", err);
                          setSelectedPaymentMethod(null);
                        }}
                        onCancel={() => {
                          console.log("Payment cancelled by user");
                          setSelectedPaymentMethod(null);
                        }}
                      />
                    </PayPalScriptProvider>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowPaymentOptions(false);
                setSelectedPaymentMethod(null);
              }}
              className="mt-6 px-4 py-2 border border-gray-300 text-black hover:bg-[#dc1d46] hover:text-white cursor-pointer w-full"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-black mb-4">
              Review Your Registration
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-black">
                  {formData.registrationLabel}
                </h3>

                {isEarlyBirdActive() ? (
                  <div className="space-y-1">
                    <p className="text-lg font-bold text-[#dc1d46] flex items-center">
                      <span className="line-through text-gray-500 mr-2">
                        ${parseInt(formData.amount).toLocaleString()}
                      </span>
                      $
                      {calculateDiscountedAmount(
                        formData.amount
                      ).toLocaleString()}
                      <span className="ml-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        10% Early Bird Discount
                      </span>
                    </p>
                    <p className="text-sm text-[#dc1d46]">
                      Early bird offer valid until July 20, 2025
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-[#dc1d46]">
                    ${parseInt(formData.amount).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-700">
                  Please review your selected registration type and amount
                  before proceeding to payment.
                </p>
              </div>
            </div>
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 flex-1"
              >
                Cancel
              </button>
              <button
                onClick={initiatePayment}
                className="px-4 py-2 bg-[#dc1d46] text-white hover:bg-black flex-1"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Loading */}
      {paymentLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
            <div className="mb-4">
              <div className="w-12 h-12 border-4 border-t-[#dc1d46] border-gray-200 rounded-full animate-spin mx-auto"></div>
            </div>
            <p className="text-lg">Processing your payment...</p>
            <p className="text-sm text-gray-500 mt-2">
              Please do not close this window.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
