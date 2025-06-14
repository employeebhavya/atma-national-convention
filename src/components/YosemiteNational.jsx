import Image from "next/image";
import React from "react";

function YosemiteNational() {
  return (
    <section className="my-14 relative" id="yosemite-national">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="col-span-1">
          <Image
            src="/yosemite.png"
            alt="Yosemite National Park"
            width={480}
            height={517}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-6">
          <h2 className="text-2xl lg:text-3xl text-black mb-2">
            Yosemite National Park Tour
          </h2>
          <div>
            <p>
              <strong>Date:</strong> Saturday, August 23rd
            </p>
            <p>
              <strong>Time:</strong> Departure at 6:00 AM | Return by 6:00 PM
            </p>
          </div>
          <p>
            Join us for an unforgettable one-day adventure to the breathtaking
            Yosemite National Park! Witness stunning landscapes, majestic
            waterfalls, and iconic views like El Capitan and Half Dome—all in a
            single day.
          </p>
          <div>
            <p>Tour Includes:</p>
            <ul className="list-disc pl-5">
              <li>Round-trip transportation</li>
              <li>Park entry fee</li>
              <li>
                Guided experience with plenty of time to explore and enjoy
                nature
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg text-[#dc1d46] font-semibold">
              Cost: $100 per person
            </h4>
            <p>(Includes all transportation and entry fees)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YosemiteNational;
