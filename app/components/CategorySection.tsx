"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        id: "01",
        image: "/cat-upper.jpg",
        link: "/shop/tops",
        buttonText: "SHOP TOPS"
    },
    {
        id: "02",
        image: "/cat-pants.jpg",
        link: "/shop/pants",
        buttonText: "SHOP PANTS"
    },
    {
        id: "03",
        image: "/cat-sneakers.jpg",
        link: "/shop/shoes",
        buttonText: "SHOP KICKS"
    }
];

const CategorySection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cat-card", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Start when top of section hits 80% viewport height
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-vintage-cream py-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <h2 className="text-center font-heading text-sm font-bold uppercase tracking-widest mb-12 text-almost-black">
                    UNISEX COLLECTIONS & DIGITAL DROPS
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {categories.map((cat) => (
                        <a
                            key={cat.id}
                            href={cat.link}
                            className="cat-card group block border-2 border-black rounded-xl overflow-hidden cursor-pointer hover:shadow-[4px_4px_0px_#000] transition-shadow duration-300"
                        >
                            {/* Image Area (80%) */}
                            <div className="aspect-[3/4] relative w-full border-b-2 border-black overflow-hidden bg-gray-200">
                                {/* 
                                    Mobile: Always Color (grayscale-0) 
                                    Desktop (md): Grayscale default, Hover Color (grayscale-0)
                                    Zoom effect on hover
                                */}
                                <Image
                                    src={cat.image}
                                    alt={cat.buttonText}
                                    fill
                                    className="object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-500 ease-in-out"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {/* Index Number Overlay */}
                                <div className="absolute top-4 left-4 bg-white border border-black rounded-full w-8 h-8 flex items-center justify-center font-heading font-bold text-xs z-10 text-almost-black">
                                    {cat.id}
                                </div>
                            </div>

                            {/* Action Button Area (Bottom) */}
                            {/* Bg: Vintage Red -> Black | Text: Black -> Red */}
                            <div className="bg-vintage-red group-hover:bg-black transition-colors duration-300 h-14 flex items-center justify-center text-center">
                                <span className="font-bold font-heading uppercase tracking-wider text-black group-hover:text-vintage-red transition-colors duration-300 text-lg">
                                    {cat.buttonText}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CategorySection;
