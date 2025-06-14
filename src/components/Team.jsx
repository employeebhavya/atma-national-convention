import Image from "next/image";
import React from "react";

function Team() {
  return (
    <section className="relative mb-14">
      <div className="container flex flex-col gap-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl lg:text-3xl text-black">
            Team at Annual Convention
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-4">
          <div className="flex flex-col gap-2">
            <Image
              src="/team/5.jpg"
              alt="Dr. Geetha Sivasubramaniam, MD"
              width={372}
              height={395}
              className="object-cover md:w-[290px] md:h-[300px]"
              loading="lazy"
              quality={100}
            />
            <h3 className="text-lg font-semibold">
              Dr. Rajarathinam Subramaniam
            </h3>
            <p className="text-sm text-gray-600">
              National Convention Chair, ATMA 2025
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Image
              src="/team/3.jpg"
              alt="Dr. Geetha Sivasubramaniam, MD"
              width={372}
              height={395}
              className="object-cover md:w-[290px] md:h-[300px]"
              loading="lazy"
              quality={100}
            />
            <h3 className="text-lg font-semibold">Mr. Prabu, PRO</h3>
            <p className="text-sm text-gray-600">ATMA. California State</p>
          </div>
          <div className="flex flex-col gap-2">
            <Image
              src="/team/4.jpg"
              alt="Dr. Geetha Sivasubramaniam, MD"
              width={372}
              height={395}
              className="object-cover md:w-[290px] md:h-[300px]"
              loading="lazy"
              quality={100}
            />
            <h3 className="text-lg font-semibold">
              Dr. Thillakarasi Kannappan,
              <br /> MD Gynecologist
            </h3>
            <p className="text-sm text-gray-600">Deputy Governor</p>
          </div>
          <div className="flex flex-col gap-2">
            <Image
              src="/team/1.png"
              alt="Dr. Geetha Sivasubramaniam, MD"
              width={372}
              height={395}
              className="object-cover md:w-[290px] md:h-[300px]"
              loading="lazy"
              quality={100}
            />
            <h3 className="text-lg font-semibold">
              Dr. Geetha Sivasubramaniam, MD
            </h3>
            <p className="text-sm text-gray-600">
              Secretary, ATMA California State
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Image
              src="/team/2.png"
              alt="Dr. Anandhi Narasimhan, MD"
              width={372}
              height={395}
              className="object-cover md:w-[290px] md:h-[300px]"
              loading="lazy"
              quality={100}
            />
            <h3 className="text-lg font-semibold">
              Dr. Anandhi Narasimhan, MD
            </h3>
            <p className="text-sm text-gray-600">
              Culture and Entertainment Secretary ATMA California
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
