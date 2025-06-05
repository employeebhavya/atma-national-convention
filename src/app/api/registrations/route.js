import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Registration from "@/models/Registration";

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_MAIL_HOST,
  port: parseInt(process.env.ZOHO_MAIL_PORT),
  secure: process.env.ZOHO_MAIL_SECURE === "true",
  auth: {
    user: process.env.ZOHO_MAIL_USER,
    pass: process.env.ZOHO_MAIL_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const registrationData = await request.json();

    await dbConnect();

    const newRegistration = new Registration({
      ...registrationData,
      registrationDate: new Date(),
    });
    const savedRegistration = await newRegistration.save();

    // Email to registrant
    const registrantMailOptions = {
      from: `ATMA National Convention - 2025 Registration <${process.env.ZOHO_MAIL_USER}>`,
      to: registrationData.email,
      subject: "Your ATMA National Convention - 2025 Registration Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">Thank you for registering, ${
            registrationData.firstName
          }!</h1>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748;">Registration Details</h2>
            <p><strong>Name:</strong> ${registrationData.firstName} ${
        registrationData.lastName
      }</p>
            <p><strong>Registration Type:</strong> ${
              registrationData.registrationType
            }</p>
            <p><strong>Amount:</strong> $${registrationData.amount}</p>
            <p><strong>Transaction ID:</strong> ${
              registrationData.transactionId
            }</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL}" 
               style="display: inline-block; background-color: #4299e1; color: white; 
                      padding: 10px 20px; text-decoration: none; border-radius: 4px;
                      font-weight: bold;">
              Visit Our Website
            </a>
          </div>
        </div>
      `,
    };

    // Email to ATMA admin
    const adminMailOptions = {
      from: `ATMA National Convention - 2025 Registration <${process.env.ZOHO_MAIL_USER}>`,
      //   to: "Atmausapresident@gmail.com",
      to: "riturajsingh3001@gmail.com",
      subject: `New Registration - ${registrationData.firstName} ${registrationData.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">New Registration Received</h1>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #2d3748;">Registration Details</h2>
            <p><strong>Name:</strong> ${registrationData.firstName} ${registrationData.lastName}</p>
            <p><strong>Email:</strong> ${registrationData.email}</p>
            <p><strong>Phone:</strong> ${registrationData.phone}</p>
            <p><strong>Registration Type:</strong> ${registrationData.registrationType}</p>
            <p><strong>Amount:</strong> $${registrationData.amount}</p>
            <p><strong>Transaction ID:</strong> ${registrationData.transactionId}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(registrantMailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json(
      { success: true, registrationId: savedRegistration._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration processing error:", error);
    return NextResponse.json(
      { success: false, error: "Error processing registration" },
      { status: 500 }
    );
  }
}
