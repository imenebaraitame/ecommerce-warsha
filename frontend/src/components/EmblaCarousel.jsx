import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  const slides = [
    {
      image: "hero4.webp",
      subtitle: "Summer / AUTUMN 2026",
      title: "The Art of Timelessness",
      button: "SHOP THE COLLECTION",
    },
    {
      image: "hero-2.webp",
      subtitle: "NEW ARRIVALS",
      title: "Quiet Luxury",
      button: "DISCOVER THE COLLECTION",
    },
    {
      image: "hero-3.webp",
      subtitle: "EDITORIAL",
      title: "Mediterranean Elegance",
      button: "EXPLORE THE COLLECTION",
    },
  ];

  return (
    <div className="embla relative w-full">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla__slide relative h-190 min-w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Content */}
              <div className="relative z-10 flex h-full items-center justify-center">
                <div className=" flex w-full  flex-col items-center px-6 text-center text-white">
                  <div className="text-white">
                    <p className="mb-4 text-sm tracking-[0.3em] uppercase">
                      {slide.subtitle}
                    </p>

                    <h1 className="font-display text-6xl leading-tight mb-10">
                      {slide.title}
                    </h1>

                    <Link 
                      to="/shop"
                      className="border border-white px-8 py-4 tracking-widest uppercase transition hover:bg-white hover:text-black">
                      {slide.button}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow hover:bg-white"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/70 p-2 shadow hover:bg-white"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
}

export default EmblaCarousel;
