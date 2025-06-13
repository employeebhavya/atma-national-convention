import Image from "next/image";
import React from "react";

function Team() {
  return (
    <section className="relative mb-14">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4">
        <div className="">
          <h2 className="text-2xl lg:text-3xl text-black">
            Team at <br /> Annual Convention
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          <div className="flex flex-col gap-2">
            <Image
              src="/team/1.png"
              alt="Dr. Geetha Sivasubramaniam, MD"
              width={372}
              height={395}
              className="object-cover"
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
              className="object-cover"
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
