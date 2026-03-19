import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const ProductMockup = dynamic(() => import("@/components/ProductMockup"));
const Metrics = dynamic(() => import("@/components/Metrics"));
const UseCases = dynamic(() => import("@/components/UseCases"));
const WaitlistForm = dynamic(() => import("@/components/WaitlistForm"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <ProductMockup />
      <Metrics />
      <UseCases />
      <section className="py-24 px-4">
        <WaitlistForm variant="bottom" />
      </section>
      <Footer />
    </main>
  );
}
