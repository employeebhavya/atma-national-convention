import Image from "next/image";
import React from "react";

function Team() {
  return (
    <section className="relative my-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
          <div className="col-span-2">
            <h2 className="text-2xl lg:text-3xl text-black -mt-1">
              Team at Annual Convention
            </h2>
          </div>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4">
            <div className="flex flex-col gap-2">
              <Image
                src="/president.jpg"
                alt="Dr. Geetha Sivasubramaniam, MD"
                width={372}
                height={395}
                className="object-cover"
                loading="lazy"
                quality={100}
              />
              <h3 className="text-lg">Dr. Rajammal Jayakumar, MD</h3>
              <p className="text-sm text-gray-600 max-w-[90%] md:max-w-full">
                President ATMA USA/ Chair - ATMA National Convention 2025
              </p>
            </div>
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
              <h3 className="text-lg">Dr. Rajarathinam Subramaniam, MD</h3>
              <p className="text-sm text-gray-600 max-w-[90%] md:max-w-full">
                National ATMA Convention Co-Chair / Governor, ATMA West Coast
                Chapter
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/team/2.png"
                alt="Dr. Geetha Sivasubramaniam, MD"
                width={372}
                height={395}
                className="object-cover"
                loading="lazy"
                quality={100}
              />
              <h3 className="text-lg">
                Dr. Thillakarasi Kannappan,
                <br /> MD Gynecologist
              </h3>
              <p className="text-sm text-gray-600 max-w-[90%] md:max-w-full">
                Deputy Governor - California State and West Coast Chapter
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/team/6.png"
                alt="Dr. Geetha Sivasubramaniam, MD"
                width={372}
                height={395}
                className="object-cover"
                loading="lazy"
                quality={100}
              />
              <h3 className="text-lg">Dr. Einstein Arunachalam, MD</h3>
              <p className="text-sm text-gray-600 max-w-[90%] md:max-w-full">
                Former Governor, West Coast Chapter / Board Member, ATMA
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/team/7.png"
                alt="Dr. Geetha Sivasubramaniam, MD"
                width={372}
                height={395}
                className="object-cover"
                loading="lazy"
                quality={100}
              />
              <h3 className="text-lg">Dr. Rajesh Rangaswamy, MD</h3>
              <p className="text-sm text-gray-600">
                Former Governor, West Coast Chapter
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/team/4.png"
                alt="Dr. Geetha Sivasubramaniam, MD"
                width={372}
                height={395}
                className="object-cover"
                loading="lazy"
                quality={100}
              />
              <h3 className="text-lg">Dr. Geetha Sivasubramaniam, MD</h3>
              <p className="text-sm text-gray-600">
                Secretary, ATMA California State
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/team/5.png"
                alt="Dr. Anandhi Narasimhan, MD"
                width={372}
                height={395}
                className="object-cover"
                loading="lazy"
                quality={100}
              />
              <h3 className="text-lg">Dr. Anandhi Narasimhan, MD</h3>
              <p className="text-sm text-gray-600">
                Culture and Entertainment Secretary ATMA California
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/team/3.png"
                alt="Dr. Geetha Sivasubramaniam, MD"
                width={372}
                height={395}
                className="object-cover"
                loading="lazy"
                quality={100}
              />
              <h3 className="text-lg">Mr. Prabhu Venkatesh Subramanian</h3>
              <p className="text-sm text-gray-600">
                PRO (Public Relations Officer), ATMA West Coast Chapter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
