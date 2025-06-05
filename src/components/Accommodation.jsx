import Link from "next/link";
import React from "react";

function Accommodation() {
  return (
    <section className="my-14 relative">
      <div className="container bg-[#DEDEDE] p-8">
        <div className="md:max-w-[70%]">
          <h2 className="text-3xl text-black mb-2">Accommodation</h2>
          <p className="text-base text-black">
            Hotel rooms are available at a discounted rate of $172 per night (+
            tax) for ATMA convention attendees at the Double Tree Hotel, Fresno.
            Book now!{" "}
            <Link
              href={"https://www.hilton.com/en/search/find-hotels/"}
              target="_blank"
              className="text-[#dc1d46]"
            >
              Hotel Booking Link
            </Link>{" "}
            <br></br>Last date for hotel booking: July 31, 2025.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Accommodation;
