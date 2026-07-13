import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import SocialProof from "@/components/home/SocialProof";
import StorySection from "@/components/home/StorySection";
import Newsletter from "@/components/home/Newsletter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollReveal>
        <TrustStrip />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedCollection />
      </ScrollReveal>
      <ScrollReveal>
        <SocialProof />
      </ScrollReveal>
      <ScrollReveal>
        <StorySection />
      </ScrollReveal>
      <ScrollReveal>
        <Newsletter />
      </ScrollReveal>
    </>
  );
}
