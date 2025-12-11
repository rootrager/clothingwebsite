"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Intro animations
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                delay: 0.2,
                ease: "power3.out"
            });

            gsap.from(".hero-image-card", {
                scale: 0.95,
                opacity: 0,
                duration: 1.5,
                delay: 0.4,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col min-h-screen bg-ivory text-almost-black overflow-hidden hover:cursor-default">

            {/* Navbar (Full Width) */}
            <nav className="w-full border-b border-black px-6 py-4 flex justify-between items-center bg-ivory z-50 sticky top-0">
                <div className="font-heading text-xl font-bold tracking-widest uppercase">
                    Brand
                </div>

                <div className="hidden md:flex gap-8 font-body text-sm font-medium uppercase tracking-wide">
                    <a href="/" className="hover:text-vintage-red transition-colors">Home</a>
                    <a href="/shop" className="hover:text-vintage-red transition-colors">Shop</a>
                    <a href="#about" className="hover:text-vintage-red transition-colors">About</a>
                    <a href="#about" className="hover:text-vintage-red transition-colors">Contact</a>
                </div>

                <div className="font-heading text-sm font-bold border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition-colors cursor-pointer">
                    Cart (0)
                </div>
            </nav>

            {/* Main Content Grid */}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 relative">

                {/* Left Column: Stacked Design */}
                {/* MOBILE: Centered items. DESKTOP: Left aligned. */}
                <div className="relative p-8 md:p-12 lg:pl-20 flex flex-col justify-between items-center text-center md:items-start md:text-left order-2 md:order-1 h-full hero-content">

                    {/* TOP: Headline */}
                    <div className="w-full mt-8 md:mt-0">
                        {/* Applied 'font-gravitas' here */}
                        <h1 className="font-gravitas text-6xl md:text-7xl lg:text-9xl uppercase leading-[0.85] text-almost-black md:-ml-1 tracking-tighter">
                            Street <br />
                            <span className="font-serif italic font-normal text-5xl md:text-7xl lg:text-8xl lowercase tracking-normal block transform translate-y-[-10px]">Culture</span>
                            Revived
                        </h1>
                    </div>

                    {/* MIDDLE: Social Proof & CTA */}
                    <div className="w-full flex flex-col items-center md:items-start gap-6 my-8 md:my-0">
                        {/* Social Proof */}
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory bg-gray-300 relative overflow-hidden">
                                        {/* Placeholder Avatar */}
                                        <div className={`w-full h-full bg-gray-${i * 100 + 300}`}></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="font-bold font-heading text-sm uppercase tracking-wider">Join 150k+</span>
                                <span className="text-xs text-gray-600 font-medium">Streetwear Enthusiasts</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button className="bg-black text-white py-4 px-12 rounded-full font-heading font-bold uppercase tracking-wider text-lg hover:scale-105 hover:bg-vintage-red transition-all duration-300 shadow-xl cursor-pointer">
                            Shop Collection ↗
                        </button>
                    </div>

                    {/* BOTTOM: Feature Card */}
                    <div className="w-full bg-[#EAE8DC] rounded-xl p-6 border border-black/5 flex items-center text-left gap-6 max-w-md shadow-sm mt-auto mb-8 md:mb-0">
                        <div className="w-16 h-16 bg-black rounded-lg shrink-0 overflow-hidden relative">
                            {/* Mini image placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-vintage-red to-black opacity-80"></div>
                        </div>
                        <div>
                            <p className="font-body text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Featured Drop</p>
                            <h3 className="font-heading font-bold text-lg leading-tight uppercase">Urban Utility Jacket V2</h3>
                            <div className="flex gap-4 mt-2 text-xs font-bold uppercase">
                                <span className="underline decoration-1 underline-offset-2 cursor-pointer">View Details</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Floating Image Card (Portrait) */}
                <div className="relative h-full order-1 md:order-2 p-6 md:p-8 lg:p-10 flex items-center justify-center">
                    {/* The Frame: Portrait aspect ratio (aspect-[3/4]) and max-width limit. Scaled up for Desktop (lg). */}
                    <div className="w-full max-w-md lg:max-w-xl aspect-[3/4] relative border-2 border-black rounded-3xl overflow-hidden shadow-2xl hero-image-card">
                        <Image
                            src="/hero-character.jpeg"
                            alt="Streetwear Model"
                            fill
                            className="object-cover object-top"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>

                {/* NOTE: Spinning Badge Removed as requested */}

            </main>
        </div>
    );
};

export default HeroSection;
