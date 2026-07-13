import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import SocialProof from "@/components/home/SocialProof";
import StorySection from "@/components/home/StorySection";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedCollection />
      <SocialProof />
      <StorySection />
      <Newsletter />
    </>
  );
}
