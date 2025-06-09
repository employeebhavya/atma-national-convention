import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="relative bg-[#e9e9e9] md:bg-transparent">
      <div className="container flex items-center md:gap-8 justify-between">
        <div className="flex items-center justify-center">
          <Image
            src={"/logos/logo.png"}
            width={370}
            height={85}
            alt="logo"
            quality={100}
            className="h-auto object-cover"
          />
        </div>
        <div className="flex items-center justify-end gap-4 bg-[#E9E9E9] w-full h-full py-2 md:p-4">
          <div className="hidden md:flex gap-2 items-center">
            <Link
              href={"#"}
              className="relative hover:scale-125 transition-all duration-300"
            >
              <Image
                src={"/topbar/insta.svg"}
                width={25}
                height={25}
                alt="image"
                quality={100}
              />
            </Link>
            <Link
              href={"#"}
              className="relative hover:scale-125 transition-all duration-300"
            >
              <Image
                src={"/topbar/fb.svg"}
                width={25}
                height={25}
                alt="image"
                quality={100}
              />
            </Link>
            <Link
              href={"#"}
              className="relative hover:scale-125 transition-all duration-300"
            >
              <Image
                src={"/topbar/twitter.svg"}
                width={25}
                height={25}
                alt="image"
                quality={100}
              />
            </Link>
            <Link
              href={"#"}
              className="relative hover:scale-125 transition-all duration-300"
            >
              <Image
                src={"/topbar/yt.svg"}
                width={25}
                height={25}
                alt="image"
                quality={100}
              />
            </Link>
          </div>
          <div>
            <Link href={"#form"}>
              <button className="bg-[#dc1d46] text-white px-3 sm:px-5 py-2 text-base hover:bg-black transition-all duration-300 cursor-pointer">
                Register Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
