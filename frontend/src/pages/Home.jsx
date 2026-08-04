import React from "react";
import EmblaCarousel from "../components/EmblaCarousel";

const Home = () => {
  return (
    <div className="min-h-screen text-neutral-800">
      {/* Hero Section — full width, directly below the fixed header, no container/border */}
      <section className="pt-1">
        <EmblaCarousel />
      </section>

      {/* Rest of page content — constrained width goes here */}
      <div className="container mx-auto px-4 py-12">
        {/* other sections */}
      </div>
    </div>
  );
};

export default Home;


