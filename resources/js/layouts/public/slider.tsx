import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

export const slides = [
    {
        key: "slide-1",
        image: "/assets/images/slider/slider-image-4.png",
        title: "Evergreen Team",
        subtitle: "Passion - Performance - Teamwork",
    },
    {
        key: "slide-2",
        image: "/assets/images/slider/slider-image-5.jpg",
        title: "Match Day Ready",
        subtitle: "United We Play, United We Win",
    },
    {
        key: "slide-3",
        image: "/assets/images/slider/slider-image-6.jpg",
        title: "Champions In Action",
        subtitle: "Building A Winning Legacy",
    },
    {
        key: "slide-4",
        image: "/assets/images/slider/slider-image-7.jpg",
        title: "Champions In Action",
        subtitle: "Building A Winning Legacy",
    },
];

export default function Slider() {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (!carouselApi) {
            return;
        }

        setActiveSlide(carouselApi.selectedScrollSnap());
        const onSelect = () => setActiveSlide(carouselApi.selectedScrollSnap());
        carouselApi.on("select", onSelect);

        return () => {
            carouselApi.off("select", onSelect);
        };
    }, [carouselApi]);

    return (
        <section id="slider" className="relative overflow-hidden">
            <Carousel setApi={setCarouselApi} opts={{ loop: true }}>
                <CarouselContent className="ml-0">
                    {slides.map((slide) => (
                        <CarouselItem
                            key={slide.key}
                            className="relative h-105 pl-0 sm:h-135 lg:h-150"
                        >
                            <img
                                src={slide.image}
                                alt="Evergreen cricket team"
                                className="absolute inset-0 size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-zinc-950/45" />
                            <div className="absolute inset-x-5 bottom-14 mx-auto max-w-375 text-white sm:bottom-20 sm:px-3">
                                <p className="mb-2 text-xs font-bold tracking-[0.2em] text-lime-200 uppercase">
                                    Evergreen Cricket Club
                                </p>
                                <h1 className="font-display text-5xl leading-none uppercase sm:text-7xl lg:text-8xl">
                                    {slide.title}
                                </h1>
                                <p className="mt-3 text-sm font-semibold tracking-[0.12em] uppercase sm:text-base">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 size-11 rounded-none border-white/50 bg-black/20 text-white hover:bg-[#1f7a3d] sm:left-8" />
                <CarouselNext className="right-4 size-11 rounded-none border-white/50 bg-black/20 text-white hover:bg-[#1f7a3d] sm:right-8" />
                <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
                    {slides.map((slide, index) => (
                        <button
                            type="button"
                            key={slide.key}
                            aria-label={`Show ${slide.title}`}
                            onClick={() => carouselApi?.scrollTo(index)}
                            className={`h-1.5 w-8 transition ${index === activeSlide ? "bg-white" : "bg-white/40"}`}
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    );
}
