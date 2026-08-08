import React from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen text-neutral-800">
      {/* Hero Section */}
      <section className="pt-1">
        <EmblaCarousel />
      </section>

      {/* Rest of page content */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center gap-15 lg:flex-row lg:justify-center">
          <div className="zoom-wrapper flex flex-col items-center">
            <div className="zoom-clip overflow-hidden ">
              <img
                className="zoom-img w-full max-w-xs object-cover"
                src="bags-home.webp"
                alt="bags"
              />
            </div>

            <div className="mt-7 flex flex-col items-center gap-1.5">
              <h1 className="font-display text-tertiary cursor-pointer text-lg capitalize">
                handbags
              </h1>
              <Link to="/shop" className="text-tertiary-container text-xs uppercase mb-5">
                view all
              </Link>
            </div>

          </div>

          <div className="zoom-wrapper flex flex-col items-center mt-35 ">
            <div className="zoom-clip overflow-hidden">
              <img
                className="zoom-img w-full max-w-xs object-cover transition-transform duration-[500ms] ease-in-out group-hover:scale-110"
                src="shoes-home.webp"
                alt="shoes"
              />
            </div>

            <div className="mt-7 flex flex-col items-center gap-1.5">
              <h1 className="font-display text-tertiary cursor-pointer text-lg capitalize">
                shoes
              </h1>
              <Link to="/shop" className="text-tertiary-container text-xs uppercase mb-5">
                view all
              </Link>
            </div>

          </div>

          <div className="zoom-wrapper flex flex-col items-center">
            <div className="zoom-clip overflow-hidden ">
              <img
                className="zoom-img w-full max-w-xs object-cover transition-transform duration-[500ms] ease-in-out group-hover:scale-110"
                src="accessories.webp"
                alt="accessories"
              />
            </div>

            <div className="mt-7 flex flex-col items-center gap-1.5">
              <h1 className="font-display text-tertiary cursor-pointer text-lg capitalize">
                accessories
              </h1>
              <Link to="/shop" className="text-tertiary-container text-xs uppercase mb-5">
                view all
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
