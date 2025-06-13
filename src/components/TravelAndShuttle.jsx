import Image from "next/image";
import React from "react";

function TravelAndShuttle() {
  return (
    <section className="relative py-14 bg-[#ebebeb]">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4">
        <div className="lg:bg-[url('/suuny-left-bg.png')] bg-cover bg-center bg-no-repeat">
          <h2 className="text-2xl lg:text-3xl text-black">
            Travel and Shuttle Information
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg md:text-xl font-semibold">
            Central Valley Airport Shuttle Services
          </h3>
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src="/sunny.png"
                alt="Shuttle Services"
                width={80}
                height={80}
              />
            </div>
            <h4 className="text-lg font-semibold">
              Provided by Mr. Sunny Johal
            </h4>
          </div>
          <p className="text-base text-black">
            Planning to arrive in Fresno? Book your airport shuttle in advance
            from the following cities:
          </p>
          <div className="relative ml-4 before:content-[''] before:absolute before:w-[3px] before:h-[80%] before:bg-[#dc1d46] before:-left-4 before:top-1.5">
            <h4 className="text-lg font-semibold">From San Francisco (SFO)</h4>
            <p className="text-base text-black">
              📞 Call or WhatsApp: 415-999-3325
            </p>
          </div>
          <div className="relative ml-4 before:content-[''] before:absolute before:w-[3px] before:h-[80%] before:bg-[#dc1d46] before:-left-4 before:top-1.5">
            <h4 className="text-lg font-semibold">From Los Angeles (LAX)</h4>
            <p className="text-base text-black">
              📞 Call or WhatsApp: 310-999-2741
            </p>
          </div>
          <div className="relative ml-4 before:content-[''] before:absolute before:w-[3px] before:h-[80%] before:bg-[#dc1d46] before:-left-4 before:top-1.5">
            <h4 className="text-lg font-semibold">
              For International Travelers
            </h4>
            <p className="text-base text-black">
              📞 Call or WhatsApp: 559-321-4342
            </p>
          </div>
          <p className="text-base text-black">
            Early booking is recommended to secure your seat.
          </p>
        </div>
      </div>
    </section>
  );
}

export default TravelAndShuttle;
