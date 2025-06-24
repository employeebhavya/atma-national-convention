import Image from "next/image";
import Link from "next/link";
import React from "react";

function AriseAwake() {
  return (
    <section className="relative py-14 bg-[#DEDEDE]">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="col-span-1 h-auto relative">
          <Image
            src="/arise.png"
            alt="arise"
            width={552}
            height={652}
            className="w-full h-auto"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <h2 className="text-3xl text-black flex gap-4 items-center">
            <span className="text-[#DC1D46] font-bold">Arise!</span>
            <span className="text-[#FF600E] font-bold">Awake!!</span>
            <span className="text-[#2E41DD] font-bold">Achieve!!!</span>
          </h2>
          <p className="text-sm 2xl:text-base text-[#DC1D46] font-bold">
            Do What you Can ! <br />
            With what you have !! <br />
            Where You are !!! <br />
            Empower yourself !! <br />
            Empowers others !!!
          </p>
          <p>
            The compassion and love of Tamilians knows no bounds; what began as
            a small effort in America has now united hundreds of medical
            professionals, becoming a pillar of humanity — likened to a banyan
            tree with its massive tentacles (ஆலமரத்தின் விழுதுகள் போலும்).
          </p>
          <p>
            We, as the California chapter of ATMA, are privileged and proud to
            take ATMA to the next level this year with our novice attempt at an
            annual convention.
          </p>
          <p>
            We invite you all to join us in this effort — to make the function a
            great success and take the organization forward to yet another
            level.
          </p>
          <p>
            We are doing many charitable works in North America and globally,
            please refer to main website{" "}
            <Link
              className="text-base font-semibold italic"
              href="https://atmausa.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              atmausa.org
            </Link>
          </p>
          <p>
            <span className="text-base font-semibold italic">
              - By ATMA National Convention Team{" "}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default AriseAwake;
