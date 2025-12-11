"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";
import { ArrowRight, Instagram, Send, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AboutContactSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current!.children, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-almost-black text-ivory relative overflow-hidden">

            {/* 1. Transition Element: The Marquee */}
            <div className="bg-vintage-cream text-black py-4 border-y-2 border-black">
                <Marquee gradient={false} speed={50} className="overflow-hidden">
                    <span className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-widest px-4">
                        ESTABLISHED 2025 • TEHRAN • TOKYO • NEW YORK • STREET CULTURE • ESTABLISHED 2025 • TEHRAN • TOKYO • NEW YORK • STREET CULTURE •
                    </span>
                </Marquee>
            </div>

            {/* 2. The "Dark" Footer Container */}
            <div className="container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden" ref={contentRef}>

                {/* 3. About Content (The Manifesto) */}
                <div className="max-w-4xl mb-20 w-full">
                    {/* Mobile: text-4xl, Desktop: text-7xl/8xl. Break-words to prevent overflow. */}
                    <h2 className="font-gravitas text-4xl md:text-7xl lg:text-8xl uppercase leading-[0.9] mb-8 break-words">
                        We Don't Follow <br /> Cannot Be Tamed <br /> Trends.
                    </h2>
                    <p className="font-body text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        We create pieces that tell a story. From the streets of Tehran to the neon lights of Tokyo and the concrete styling of New York. Join the movement of authentic expression.
                    </p>
                </div>

                {/* 4. Contact / Interaction Area */}
                <div className="w-full max-w-xl mx-auto mb-20">
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL FOR DROPS"
                            className="w-full bg-transparent border-b border-ivory/30 py-6 text-xl md:text-3xl font-heading font-bold uppercase placeholder:text-gray-600 focus:outline-none focus:border-vintage-red transition-colors text-center md:text-left"
                        />
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-ivory/50 group-hover:text-vintage-red transition-colors">
                            <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
                        </button>
                    </div>
                </div>

                {/* Social Icons (Lucide) */}
                <div className="flex gap-8 md:gap-16 items-center justify-center">
                    <a href="#" className="group">
                        <Instagram className="w-8 h-8 md:w-10 md:h-10 text-ivory group-hover:text-vintage-red group-hover:scale-110 transition-all duration-300" />
                    </a>
                    <a href="#" className="group">
                        <Send className="w-8 h-8 md:w-10 md:h-10 text-ivory group-hover:text-vintage-red group-hover:scale-110 transition-all duration-300" />
                    </a>
                    <a href="#" className="group">
                        <Twitter className="w-8 h-8 md:w-10 md:h-10 text-ivory group-hover:text-vintage-red group-hover:scale-110 transition-all duration-300" />
                    </a>
                </div>

                {/* Copyright/Footer Note */}
                <div className="mt-24 text-gray-600 font-body text-xs uppercase tracking-widest">
                    © 2025 RooTrageR Brand. All Rights Reserved.
                </div>

            </div>
        </section>
    );
};

export default AboutContactSection;
