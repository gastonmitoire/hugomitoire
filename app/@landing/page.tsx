import { Suspense } from "react";

import Loading from "./loading";

import { HeroWithSwiper } from "../_components/HeroWithSwiper";

export default function LandingPage() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <HeroWithSwiper />
      </Suspense>
      <section className="container mx-auto">landing</section>
    </main>
  );
}
