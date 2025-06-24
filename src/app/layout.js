import { Marcellus } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "American Tamil Medical Association",
  description:
    "ATMA is an organization formed to promote charitable work through their foundation (ATMA-CF) nationally and internationally",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${marcellus.variable} ${inter.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
