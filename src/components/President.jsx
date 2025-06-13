import Image from "next/image";
import React from "react";

function President() {
  return (
    <section className="py-14 bg-[#f4f4f4]">
      <div className="container grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="relative lg:col-span-1">
          <Image
            src={"/president.jpg"}
            width={467}
            height={623}
            alt="image"
            quality={100}
            className="w-full h-full object-cover"
          />
          <h4 className="absolute right-0 bottom-0 text-base bg-[#f9c5d0] p-2 w-[70%] text-center">
            Service to Humanity is Service to God
          </h4>
        </div>
        <div className="lg:col-span-3 flex flex-col gap-3">
          <p className="text-base text-gray-500">OUR MESSAGE</p>
          <h2 className="text-2xl sm:text-3xl text-black">
            Strength in Service: A Message from the President
          </h2>
          <h4 className="text-lg text-black relative ml-3 before:absolute before:content-[''] before:w-[2px] before:h-[80%] before:top-[5px] before:-left-2 before:bg-[#dc1d46]">
            Dr. Rajammal Jayakumar
            <br></br>
            President of ATMA
          </h4>
          <p className="text-base text-gray-900">
            As you all know all our members are doing a lot of charitable works.
            At include a few of them, Dr. Kabilan and Dr. Einstein are doing
            many projects, the BLS (Basic Life Support) is very important one.
            ATMA has sponsored artificial limbs, wheelchairs, and walking sticks
            to Leprosy people in Dharmapuri district.
          </p>
          <p className="text-base text-gray-900">
            As ATMA member and president, I did conduct BLS in two schools
            (Total of 100 students from 10th to 12th grade), sponsored for 50
            cataract surgeries in Salem Eye Hospital in 2023.
          </p>
          <p className="text-base text-gray-900">
            I request all members to report their charitable medically related
            work to ATMA (ATMA President or Board Chair). If anyone has any
            important project, please present it to the Project Committee well
            ahead, so that they can discuss and approve it.
          </p>
          <p className="text-base text-gray-900">
            Now we are in the process of conducting ATMA Convention, which is
            conducted once in two years. This year, it will be held in Fresno,
            California, from August 22 to 24, 2025. Please try to attend the
            convention and pass on the message to your ATMA friends. I wish this
            convention would be a very successful one, with all your
            cooperation.
          </p>
          <p className="text-base text-gray-900">
            Thanks for all your charitable work.
          </p>
        </div>
      </div>
    </section>
  );
}

export default President;
