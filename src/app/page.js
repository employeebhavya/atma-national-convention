import Accommodation from "@/components/Accommodation";
import AriseAwake from "@/components/AriseAwake";
import AtmaConvention from "@/components/AtmaConvention";
import Hero from "@/components/Hero";
import President from "@/components/President";
import RegistrationFoemTest from "@/components/RegistrationFoemTest";
import RegistrationForm from "@/components/RegistrationForm";
import RegistrationForm1 from "@/components/RegistrationForm1";
import SpecialHighlights from "@/components/SpecialHighlights";
import Team from "@/components/Team";
import TravelAndShuttle from "@/components/TravelAndShuttle";
import WhyAttend from "@/components/WhyAttend";
import YosemiteNational from "@/components/YosemiteNational";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="w-full h-25 bg-[#dc1d46]"></section>
      <AriseAwake />
      <AtmaConvention />
      <SpecialHighlights />
      {/* <RegistrationForm /> */}
      {/* <RegistrationFoemTest /> */}
      <RegistrationForm1 />
      <Accommodation />
      <YosemiteNational />
      <WhyAttend />
      {/* <President /> */}
      <Team />
      <TravelAndShuttle />
    </div>
  );
}
