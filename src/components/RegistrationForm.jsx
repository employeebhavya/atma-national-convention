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
    vegetarianMeals: 0,
    nonVegetarianMeals: 0,
    registrationType: "",
    registrationLabel: "",
    amount: "",
    agreeTerms: false,
  });

  const [quantities, setQuantities] = useState({
    specialGuest: 0,
    familyAdult: 0,
    familyKids: 0,
    medicalGuest: 0,
    yosemiteGuest: 0,
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const router = useRouter();
  const successMessageRef = useRef(null);

  const registrationOptions = [
    {
      label: "Platinum Donor",
      value: "platinum_family",
      amount: 2500,
      description: [
        "Includes: Spouse and Blood Relatives",
        "Special Recognition & Front-row seating",
        "Stage Introduction (5-10 mins)",
        "Eligible for prize distribution",
        "Full-page souvenir feature (family photo)",
      ],
      buttonText: "Select Platinum",
    },
    {
      label: "Gold Donor",
      value: "gold_couple",
      amount: 2000,
      description: [
        "Reserved next-row table behind Platinum group",
        "Stage time: 2-3 minutes (introduction)",
        "Half-page souvenir feature (family photo)",
        "Recognition during event",
      ],
      buttonText: "Select Gold",
    },
    {
      label: "Silver Donor",
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
      label: "Special Guest",
      value: "special_guest",
      perPerson: 200,
      description: [
        "(Allied Medical Group)",
        "Includes PA, NP, RN, LVN, PCA, Technicians",
      ],
    },
    {
      label: "Family Guest",
      value: "family_guest",
      options: [
        {
          label: "Adult",
          value: "family_adult",
          perPerson: 150,
        },
        {
          label: "Kids below 15 yrs",
          value: "family_kids",
          perPerson: 100,
        },
      ],
      note: "Kids below 3 yrs: Free",
    },
    {
      label: "Medical Students / Foreign Guests / Others",
      value: "student_guest",
      perPerson: 100,
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

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: formData.amount,
            currency_code: "USD",
          },
          description: `ATMA Registration: ${formData.registrationLabel}`,
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
      setShowReviewModal(false);
    } catch (error) {
      console.error("Payment processing failed:", error);
      alert(
        "There was an error processing your registration. Please try again."
      );
      setShowPaymentOptions(false);
      setShowReviewModal(false);
    }
  };

  const handleProceedToPayment = () => {
    if (!formValid) {
      alert("Please fill all required fields before proceeding to payment");
      return;
    }
    setShowReviewModal(true);
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
          ATMA Registration Form
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
              <div>
                <label className="block text-base font-medium text-gray-600 mb-1">
                  Are you a member of ATMA?
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="isMember"
                      value="yes"
                      checked={formData.isMember === "yes"}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#dc1d46] accent-[#dc1d46]"
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
                      className="h-4 w-4 text-[#dc1d46] acceent-[#dc1d46]"
                      required
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
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
                    <label className="block text-base font-medium text-gray-600 mb-1">
                      Number Of Vegetarian Meals
                    </label>
                    <input
                      type="number"
                      name="vegetarianMeals"
                      value={formData.vegetarianMeals}
                      onChange={handleChange}
                      min="0"
                      className="w-full border-b border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-600 mb-1">
                      Number Of Non Vegetarian Meals
                    </label>
                    <input
                      type="number"
                      name="nonVegetarianMeals"
                      value={formData.nonVegetarianMeals}
                      onChange={handleChange}
                      min="0"
                      className="w-full border-b border-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Type Cards */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-black mb-4">
              Registration Type<span className="text-red-500">*</span>
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
                <p className="text-lg font-bold text-[#dc1d46]">
                  ${parseInt(formData.amount).toLocaleString()}
                </p>
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
                onClick={() => {
                  setShowReviewModal(false);
                  setShowPaymentOptions(true);
                }}
                className="px-4 py-2 bg-[#dc1d46] text-white hover:bg-black flex-1"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Options */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="mb-4 p-4 bg-gray-50">
              <h3 className="text-lg font-medium">Registration Fee</h3>
              <p className="text-xl font-bold">
                ${parseInt(formData.amount).toLocaleString()}
              </p>
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
            <button
              onClick={() => setShowPaymentOptions(false)}
              className="mt-4 px-4 py-2 border border-gray-300 text-black hover:bg-gray-100 w-full"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
