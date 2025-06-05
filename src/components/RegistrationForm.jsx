"use client";
import { useState, useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isMember: "",
    medicalSchool: "",
    specialty: "",
    spouseName: "",
    childrenNames: "",
    vegetarianMeals: 1,
    nonVegetarianMeals: 1,
    registrationType: "",
    amount: "",
    agreeTerms: false,
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);
  const router = useRouter();
  const successMessageRef = useRef(null);

  const registrationOptions = [
    {
      label: "Platinum Donor (Physician & Spouse)",
      value: "platinum_couple",
      amount: 1900,
    },
    {
      label: "Platinum Donor (Physician Only)",
      value: "platinum_single",
      amount: 1400,
    },
    {
      label: "Paramedical/Allied Professionals",
      value: "paramedical",
      amount: 1500,
    },
    {
      label: "Retired Medical Professionals",
      value: "retired_medical",
      amount: 1300,
    },
    { label: "Active Physician (Member)", value: "active_member", amount: 450 },
    {
      label: "Active Physician (Non-Member)",
      value: "active_non_member",
      amount: 525,
    },
    {
      label: "Retired Physician (Member)",
      value: "retired_member",
      amount: 400,
    },
    {
      label: "Retired Physician (Non-Member)",
      value: "retired_non_member",
      amount: 500,
    },
    {
      label: "Medical Student/Resident",
      value: "student_resident",
      amount: 200,
    },
    { label: "Children (9-18 years)", value: "children", amount: 200 },
    { label: "Guest Patron", value: "guest_patron", amount: 1000 },
  ];

  // Validate form
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
      formData.isMember !== "" &&
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

  useEffect(() => {
    if (showPaymentOptions) {
      setPaypalReady(true);
    }
  }, [showPaymentOptions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegistrationTypeChange = (e) => {
    const selectedOption = registrationOptions.find(
      (opt) => opt.value === e.target.value
    );
    setFormData((prev) => ({
      ...prev,
      registrationType: e.target.value,
      amount: selectedOption ? selectedOption.amount.toString() : "",
    }));
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: formData.amount,
            currency_code: "USD",
          },
          description: `ATMA Registration: ${formData.registrationType}`,
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();

      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          transactionId: details.id,
          paymentStatus: "completed",
          registrationDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process registration");
      }

      setPaymentSuccess(true);
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert(
        "There was an error processing your registration. Please try again."
      );
      setShowPaymentOptions(false);
    }
  };

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
        <div className="mt-6">
          <Link href="/">
            <button className="px-4 py-2 bg-[#dc1d46] text-white rounded-md hover:bg-[black] cursor-pointer">
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
        <h1 className="text-3xl text-center mb-8">ATMA Registration Form</h1>

        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-8">
              <div>
                <label className="block text-base font-medium text-black mb-1">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  E-Mail Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Medical School<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="medicalSchool"
                  value={formData.medicalSchool}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Number Of Vegetarian Meals
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="vegetarianMeals"
                  value={formData.vegetarianMeals}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Zip Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Specialty<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-black mb-1">
                  Number Of Non Vegetarian Meals
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="nonVegetarianMeals"
                  value={formData.nonVegetarianMeals}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-medium text-black mb-1">
                Are you a member of ATMA?<span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isMember"
                    value="yes"
                    checked={formData.isMember === "yes"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#dc1d46]"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="isMember"
                    value="no"
                    checked={formData.isMember === "no"}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#dc1d46]"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-black mb-1">
                Spouse Name
              </label>
              <input
                type="text"
                name="spouseName"
                value={formData.spouseName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-black mb-1">
                Children Names
              </label>
              <input
                type="text"
                name="childrenNames"
                value={formData.childrenNames}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-base font-medium text-black mb-1">
                Registration Type<span className="text-red-500">*</span>
              </label>
              <select
                name="registrationType"
                value={formData.registrationType}
                onChange={handleRegistrationTypeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Registration Type</option>
                {registrationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} (${option.amount})
                  </option>
                ))}
              </select>
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

            {!showPaymentOptions ? (
              <div className="text-left">
                <button
                  type="button"
                  onClick={() => {
                    if (!formValid) {
                      alert(
                        "Please fill all required fields before proceeding to payment"
                      );
                      return;
                    }
                    setShowPaymentOptions(true);
                  }}
                  className="px-6 py-3 bg-[#dc1d46] text-white hover:bg-black cursor-pointer"
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="mb-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium">Registration Fee</h3>
                  <p className="text-2xl font-bold">${formData.amount}</p>
                </div>

                {paypalReady && (
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
                        setShowPaymentOptions(false);
                      }}
                      onCancel={() => {
                        console.log("Payment cancelled by user");
                        setShowPaymentOptions(false);
                      }}
                    />
                  </PayPalScriptProvider>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
