import Image from "next/image";
import React from "react";

const atmaList = [
  {
    img: "/images/medical-networking.png",
    title: "Medical Networking",
    desc: `Connect with like-minded professionals across specialties.`,
  },
  {
    img: "/images/vibrant-ent.png",
    title: "Cultural Celebration",
    desc: `Enjoy live performances, entertainment, and cinematic experiences.`,
  },
  {
    img: "/images/cultural-celeb.png",
    title: "Culinary Delight",
    desc: `Join Us for a Feast of Fire & Flavor - A Chettinad Culinary Celebration!`,
  },
  {
    img: "/images/family-bond.png",
    title: "Family Bonding",
    desc: `Grow together as the ATMA family while celebrating shared purpose and pride.`,
  },
];

function AtmaConvention() {
  return (
    <section className="relative py-14">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl lg:text-3xl text-black text-center ">
            What to Expect at the ATMA Convention
          </h2>
          <hr className="w-20 mt-2 border-2 text-[#dc1d46]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 md:gap-6">
          {atmaList.map((list, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Image
                src={list.img}
                width={366}
                height={322}
                alt="image"
                quality={100}
                className="w-full h-auto object-cover"
              />
              <h3 className="text-xl font-medium mt-2">{list.title}</h3>
              <p className="text-base text-black">{list.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AtmaConvention;
