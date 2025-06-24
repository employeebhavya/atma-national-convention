import React from "react";

function ThreeDaysEvent() {
  return (
    <section className="relative py-14 bg-[url('/three-bg.png')] bg-cover">
      <div className="container flex flex-col gap-6">
        <h2 className="text-2xl lg:text-3xl text-center text-white text-shadow-lg">
          Three Days - Events Snap Shot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-[#ffffffbc] p-6 flex flex-col gap-4">
            <h4 className="bg-[#dc1d46] text-white px-4 py-2 w-fit text-center self-center">
              Friday, August 22nd
            </h4>
            <div>
              <p className="text-base font-semibold">4:00 PM - 7:00 PM</p>
              <ul className="list-disc pl-6">
                <li>Inaugural Ceremony</li>
                <li>Welcome Reception & Meet & Greet</li>
                <li>Snacks, Coffee & Journal Release</li>
              </ul>
            </div>
            <div>
              <p className="text-base font-semibold">7:00 PM - 10:30 PM</p>
              <ul className="list-disc pl-6">
                <li>Entertainment & Dinner</li>
                <li>Complimentary Cocktails</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#ffffffbc] p-6 flex flex-col gap-4">
            <h4 className="bg-[#dc1d46] text-white px-4 py-2 w-fit text-center self-center">
              Saturday, August 23rd
            </h4>
            <div>
              <p className="text-base font-semibold">
                Option 1: Yosemite National Park Adventure | 6:00 AM - 6:30 PM
              </p>
              <ul className="list-disc pl-6">
                <li>Includes Prepackaged Breakfast & Lunch</li>
              </ul>
            </div>
            <div>
              <p className="text-base font-semibold">
                Option 2: Stay-Back Fun at Masonic Hall | 9:00 AM - 5:00 PM
              </p>
              <ul className="list-disc pl-6">
                <li>Games, Yoga, and Entertainment</li>
              </ul>
            </div>
            <div>
              <p className="text-base font-semibold">
                Evening for All | 7:30 PM - 10:30 PM
              </p>
              <ul className="list-disc pl-6">
                <li>Entertainment & Dinner</li>
                <li>Complimentary Cocktails</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#ffffffbc] p-6 flex flex-col gap-4">
            <h4 className="bg-[#dc1d46] text-white px-4 py-2 w-fit text-center self-center">
              Sunday, August 24th
            </h4>
            <div>
              <p className="text-base font-semibold">8:00 AM - 1:30 PM</p>
              <ul className="list-disc pl-6">
                <li>Breakfast & Snacks</li>
                <li>CME Activities</li>
                <li>
                  Medical Topics of Common Interest for Physicians & Allied
                  Audiences
                </li>
              </ul>
            </div>
            <div>
              <p className="text-base font-semibold">2:30 PM - 4:00 PM</p>
              <ul className="list-disc pl-6">
                <li>General Body Meeting (All Members & Board Members)</li>
              </ul>
            </div>
            <div>
              <p className="text-base font-semibold">6:30 PM - 11:00 PM</p>
              <ul className="list-disc pl-6">
                <li>Light Music, Dance, and Entertainment</li>
                <li>Dinner & Complimentary Cocktails</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#ffffffbc] p-6 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 lg:pl-40 lg:items-center">
            <div className="felx">
              <h4 className="bg-[#dc1d46] text-white px-4 py-2 w-fit text-center">
                Monday, August 25th
              </h4>
            </div>
            <div>
              <p className="text-base font-semibold">8:00 AM - 11:00 AM</p>
              <ul className="list-disc pl-6">
                <li>Breakfast</li>
                <li>Mini Meeting & Dispersal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeDaysEvent;
