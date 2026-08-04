import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
  
  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

   useEffect(() => {
    if (!emblaApi) return
    emblaApi.plugins().autoplay?.play()
  }, [emblaApi])

  const images = ["./hero4.webp", "./hero-2.webp", "./hero-3.webp", "./hero-1.webp"];

  return (
    <div className="embla relative w-full">
      <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
        <div className="embla__container flex">
            {images.map((src,index) => (
                <img 
                    src= {src}
                    className="embla__slide h-200 object-fill bg-center flex items-center justify-center " 
                    alt={`Slide ${index +1 }`}
                />
            ))}
        </div>
      </div>

      <button
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-2 shadow"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  );
  
}

export default EmblaCarousel;
