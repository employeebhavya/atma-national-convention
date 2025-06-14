import Image from "next/image";
import Link from "next/link";
import React from "react";

function Accommodation() {
  return (
    <section className="my-14 relative py-14 bg-[#DEDEDE]">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="col-span-1">
          <Image
            src="/accomod.png"
            alt="Accommodation"
            width={480}
            height={386}
            className="w-full h-auto"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <h2 className="text-2xl lg:text-3xl text-black mb-2">
            Accommodation
          </h2>
          <p className="text-base text-black">
            <strong>Hotel Stay:</strong> DoubleTree by Hilton, Fresno Downtown
          </p>
          <p>
            <strong>Special rate:</strong> $172 + tax per night (for two adults)
          </p>
          <p>
            <strong>Stay Dates:</strong> August 22-24 (3 nights)
          </p>
          <p>
            <strong>Booking Deadline:</strong> July 31
          </p>
          <Link
            href={
              "https://www.hilton.com/en/hotels/fatccdt-doubletree-fresno-convention-center/?msockid=0cdde5f7717369d014b7f3fc708168a9"
            }
            target="_blank"
            className="text-[#dc1d46]"
          >
            {`Book your room here >`}
          </Link>
          <p className="mt-2">
            Please book directly with the hotel at your convenience. Rooms are
            limited—early booking is recommended!
          </p>
          <p>
            <strong>Free shuttle service</strong> will be provided via mini vans
            between the DoubleTree Hotel and the Masonic Hall throughout the
            event.
          </p>
          <p>
            Special foods and snacks will be available on all three nights.
            Complimentary cocktails will be served to all guests for an extended
            period, until midnight.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Accommodation;
