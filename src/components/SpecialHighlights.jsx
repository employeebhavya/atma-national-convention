import Image from "next/image";
import React from "react";

const spclHighlights = [
  {
    img: "/icon/1.png",
    desc: `Gourmet South Indian Dining: Feast on luxurious South Indian delicacies.`,
  },
  {
    img: "/icon/2.png",
    desc: `CME Accredited Sessions: Earn 4 hours of Continuing Medical Education (CME) while enjoying the event.`,
  },
  {
    img: "/icon/3.png",
    desc: `Entertainment Extravaganza: Cultural performances and entertainment.`,
  },
  {
    img: "/icon/4.png",
    desc: `Spousal Programs: Engage in enriching programs for spouses and guests.`,
  },
];

function SpecialHighlights() {
  return (
    <section className="py-14 relative bg-[#F4F4F4]">
      <div className="container grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="col-span-1">
          <h2 className="text-2xl md:text-3xl text-black">
            Special Highlights
          </h2>
        </div>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {spclHighlights.map((item, index) => (
            <div className="flex gap-2 items-center" key={index}>
              <Image
                src={item.img}
                width={50}
                height={50}
                alt="image"
                quality={100}
                className="w-15 h-15 object-cover"
              />
              <p className="text-base text-black">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialHighlights;
