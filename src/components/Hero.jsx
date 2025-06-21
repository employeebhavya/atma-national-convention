import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <section className="relative hero">
      <div className="container relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4">
        <div className="flex flex-col gap-2 justify-center pt-8 lg:pt-0">
          <h1 className="text-xl md:text-[37px]">
            Welcome to the{" "}
            <span className="text-[#cf1941]">
              ATMA August 2025 National Convention Registration
            </span>
          </h1>
          <hr className="text-[#CCCCCC] h-1" />
          <p className="text-lg text-black">
            Join us at the Yosemite National Park for an unforgettable
            experience!
          </p>
          <div className="flex sm:flex-row bg-[#f1f1f1] w-max px-4 md:px-8 py-4 rounded-xl gap-6 mt-5">
            <div className="flex items-center gap-2 border-r-2 border-[#ccc] pr-6">
              <Image
                src={"/calendar.svg"}
                width={30}
                height={30}
                alt="image"
                quality={100}
                className="w-10 h-auto object-cover"
              />
              <div>
                <h3 className="text-xl sm:text-2xl uppercase">22 - 24</h3>
                <p className="text-sm sm:text-base uppercase">August 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/clock.svg"}
                width={30}
                height={30}
                alt="image"
                quality={100}
                className="w-10 h-auto object-cover"
              />
              <div>
                <h3 className="text-xl sm:text-2xl uppercase">04 PM</h3>
                <p className="text-sm sm:text-base uppercase">onwards</p>
              </div>
            </div>
          </div>
          <h3 className="text-xl sm:text-3xl text-black mt-2">
            Fresno Masonic Hall, California
          </h3>
        </div>
        <Image
          src={"/early.png"}
          width={100}
          height={100}
          alt="image"
          quality={100}
          className="w-[150px] h-[150px] object-cover absolute top-[62%] left-[80%] md:top-[28%] md:left-[75%] lg:top-[65%] lg:left-[45%] transform -translate-y-1/2 -translate-x-1/2"
        />
        <div>
          <Image
            src={"/hero.png"}
            width={1000}
            height={500}
            alt="image"
            quality={100}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
