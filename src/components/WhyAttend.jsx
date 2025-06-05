import Image from "next/image";
import Link from "next/link";
import React from "react";

function WhyAttend() {
  return (
    <section className="relative mb-14">
      <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div>
          <Image
            src={"/images/10.jpg"}
            width={742}
            height={574}
            alt="image"
            quality={100}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 items-start">
          <h2 className="text-2xl md:text-3xl text-black">
            Why Attend the 16th ATMA National Convention - 2025?
          </h2>
          <ul className="list-disc list-inside pl-2 text-base text-black flex flex-col gap-3">
            <li>Be part of a large Tamil medical community</li>
            <li>
              Gain valuable CME credits while enjoying cultural activities
            </li>
            <li>
              Stay at the comfortable Double Tree Hotel in the heart of Fresno
            </li>
            <li>
              Experience vibrant Tamil culture and South Indian culinary
              delights
            </li>
            <li>
              Strengthen professional and personal connections with ATMA members
            </li>
          </ul>
          <Link href={"#form"}>
            <button className="bg-[#dc1d46] text-white px-5 py-2 text-lg hover:bg-black transition-all duration-300 cursor-pointer">
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhyAttend;
