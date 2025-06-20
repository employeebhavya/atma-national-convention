import Image from "next/image";
import Link from "next/link";
import React from "react";

function AriseAwake() {
  return (
    <section className="relative py-14 bg-[#DEDEDE]">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="col-span-1">
          <Image
            src="/arise.png"
            alt="arise"
            width={552}
            height={652}
            className="w-full h-auto"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className="text-2xl lg:text-3xl text-black">
            Arise! Awake!! Achieve!!!
          </h2>
          <p className="text-base text-[#dc1d46] font-bold">
            Do what you can, with what you have, where you are.Empower yourself
            – Empower others
          </p>
          <p>
            The compassion and love of Tamilians know no bounds. What began in
            2005 as a small effort by ten physicians has grown into the American
            Tamil Medical Association (ATMA) — a vibrant, charitable
            organization of over 800 healthcare professionals united in service,
            like the ever-growing roots of a banyan tree (ஆலமரத்தின் விழுதுகள்
            போலும்).
          </p>
          <p>
            As the California Chapter of ATMA, we are proud to host our first
            annual convention, a humble yet meaningful step toward taking ATMA
            to new heights.
          </p>
          <p>
            We invite you to be part of this mission — to serve, uplift, and
            grow together.
          </p>
          <p className="text-base font-bold italic">
            – Team ATMA California Chapter
          </p>
        </div>
      </div>
    </section>
  );
}

export default AriseAwake;
