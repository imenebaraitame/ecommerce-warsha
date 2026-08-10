import React from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="min-h-screen text-neutral-800">
      {/* Hero Section */}
      <section className="pt-1">
        <EmblaCarousel />
      </section>

      {/* Rest of page content */}
      <section className="mx-auto px-4 py-4 md:px-0 md:py-0">
        {/* Show Case Product */}
        <section className="flex flex-col items-center gap-15 lg:flex-row lg:justify-center">
          <div className="zoom-wrapper flex flex-col items-center">
            <div className="zoom-clip overflow-hidden">
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
              <Link
                to="/shop"
                className="text-tertiary-container mb-5 text-xs uppercase"
              >
                view all
              </Link>
            </div>
          </div>
          <div className="zoom-wrapper flex flex-col items-center md:mt-35">
            <div className="zoom-clip overflow-hidden">
              <img
                className="zoom-img w-full max-w-xs object-cover"
                src="shoes-home.webp"
                alt="shoes"
              />
            </div>
            <div className="mt-7 flex flex-col items-center gap-1.5">
              <h1 className="font-display text-tertiary cursor-pointer text-lg capitalize">
                shoes
              </h1>
              <Link
                to="/shop"
                className="text-tertiary-container mb-5 text-xs uppercase"
              >
                view all
              </Link>
            </div>
          </div>
          <div className="zoom-wrapper flex flex-col items-center">
            <div className="zoom-clip overflow-hidden">
              <img
                className="zoom-img w-full max-w-xs object-cover"
                src="accessories.webp"
                alt="accessories"
              />
            </div>
            <div className="mt-7 flex flex-col items-center gap-1.5">
              <h1 className="font-display text-tertiary cursor-pointer text-lg capitalize">
                accessories
              </h1>
              <Link
                to="/shop"
                className="text-tertiary-container mb-5 text-xs uppercase"
              >
                view all
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="bg-surface-container-low mt-20">
          <section className="item-center flex flex-col gap-20 px-20 py-20 md:flex-row md:justify-center">
            <div className="zoom-wrapper relative inline-block">
              <div className="zoom-clip overflow-hidden">
                <img
                  src="./brand-story.webp"
                  alt="story image"
                
                  className="zoom-img relative z-10 object-cover blur-[1px] transition-transform duration-[500ms] ease-in-out group-hover:scale-110 md:h-150 md:w-500"
                />
              </div>
              <div className="bg-surface-variant absolute -right-9 -bottom-9 h-3/4 w-3/4" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-primary-container mb-10 text-[0.7rem] tracking-[0.3em] uppercase md:text-lg">
                our heritage
              </h2>
              <h1 className="font-display mb-9 text-3xl italic md:text-7xl">
                Rooted in Tradition, Designed for Eternity.
              </h1>
              <p className="text-on-surface-varian md:text-lg">
                Founded along the coast of the Mediterranean, AURELIA represents
                a dialogue between the earth's raw beauty and the precision of
                human artistry. Each piece is hand-carved from the finest
                materials, destined to become an heirloom.
              </p>
              <h2 className="text-on-surface-varian mt-10 tracking-[0.1em] uppercase md:text-sm">
                our story
              </h2>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Home;
