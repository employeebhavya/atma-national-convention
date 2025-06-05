import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  isMember: { type: String, required: true, enum: ["yes", "no"] },
  medicalSchool: { type: String, required: true },
  specialty: { type: String, required: true },
  spouseName: { type: String },
  childrenNames: { type: String },
  vegetarianMeals: { type: Number, required: true, default: 1 },
  nonVegetarianMeals: { type: Number, required: true, default: 1 },
  registrationType: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true },
  paymentStatus: { type: String, required: true, default: "pending" },
  registrationDate: { type: Date, required: true, default: Date.now },
});

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);

export default Registration;
