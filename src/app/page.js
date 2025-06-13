import Accommodation from "@/components/Accommodation";
import AtmaConvention from "@/components/AtmaConvention";
import Hero from "@/components/Hero";
import President from "@/components/President";
import RegistrationForm from "@/components/RegistrationForm";
import SpecialHighlights from "@/components/SpecialHighlights";
import Team from "@/components/Team";
import TravelAndShuttle from "@/components/TravelAndShuttle";
import WhyAttend from "@/components/WhyAttend";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="w-full h-25 bg-[#dc1d46]"></section>
      <President />
      <AtmaConvention />
      <SpecialHighlights />
      <RegistrationForm />
      <Accommodation />
      <WhyAttend />
      <Team />
      <TravelAndShuttle />
    </div>
  );
}
