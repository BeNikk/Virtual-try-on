import FeaturedExamples from "@/components/examples";
import Hero from "@/components/hero";
import ResultsGallery from "@/components/result-gallery";
import Testimonials from "@/components/testimonials";
import TryOnSection from "@/components/try-on";
import { Suspense } from "react";
import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
  credentials:process.env.FAL_KEY
});
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <Hero/>
      <FeaturedExamples/>
      <Suspense fallback={<div className="w-full h-40 flex items-center justify-center">Loading...</div>}>
        <TryOnSection />
      </Suspense>
      <Testimonials/>
      <ResultsGallery/>
    </main>
  );
}
