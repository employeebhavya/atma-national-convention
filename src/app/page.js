import Accommodation from "@/components/Accommodation";
import AriseAwake from "@/components/AriseAwake";
import AtmaConvention from "@/components/AtmaConvention";
import Hero from "@/components/Hero";
import RegistrationForm1 from "@/components/RegistrationForm1";
import SpecialHighlights from "@/components/SpecialHighlights";
import Team from "@/components/Team";
import ThreeDaysEvent from "@/components/ThreeDaysEvent";
import TravelAndShuttle from "@/components/TravelAndShuttle";
import WhyAttend from "@/components/WhyAttend";
import YosemiteNational from "@/components/YosemiteNational";

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="w-full h-25 bg-[url('/texture.png')] bg-cover bg-center bg-no-repeat"></section>
      <AriseAwake />
      <AtmaConvention />
      <SpecialHighlights />
      <RegistrationForm1 />
      <Accommodation />
      <YosemiteNational />
      <ThreeDaysEvent />
      <WhyAttend />
      <Team />
      <TravelAndShuttle />
    </div>
  );
}
