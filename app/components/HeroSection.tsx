"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    // Cart Store Integration
    const totalItems = useCartStore((state) => state.totalItems());
    const toggleCart = useCartStore((state) => state.toggleCart); // Added toggle action
    const [isMounted, setIsMounted] = useState(false);

    // Hydration check
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Navbar Animation
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                delay: 0.2
            });

            // Image Reveal (Left to Right)
            gsap.from(".hero-image-frame", {
                xPercent: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.5
            });

            // Text Stagger
            gsap.from(".hero-text-element", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.8
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen bg-vintage-cream text-almost-black overflow-hidden flex flex-col pt-32 lg:pt-0">

            {/* Fixed Navbar - Layout Fix: using justify-between for proper spacing */}
            <nav ref={navRef} className="fixed top-0 left-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 bg-vintage-cream/80 backdrop-blur-md border-b border-black/5">

                {/* 1. Logo (Left) */}
                <div className="font-heading text-2xl font-bold tracking-tighter uppercase cursor-pointer">
                    <Link href="/">Antigravity</Link>
                </div>

                {/* 2. Links (Center) */}
                <div className="hidden md:flex gap-8 font-body text-sm font-medium uppercase tracking-wide absolute left-1/2 transform -translate-x-1/2">
                    <Link href="/" className="hover:text-vintage-red transition-colors">Home</Link>
                    <Link href="/shop" className="hover:text-vintage-red transition-colors">Shop</Link>
                    <a href="#about" className="hover:text-vintage-red transition-colors">About</a>
                    <a href="#about" className="hover:text-vintage-red transition-colors">Contact</a>
                </div>

                {/* 3. Cart Button (Right) */}
                <div
                    onClick={toggleCart}
                    className="font-heading text-sm font-bold border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition-colors cursor-pointer select-none"
                >
                    Cart ({isMounted ? totalItems : 0})
                </div>
            </nav>

            {/* Main Content Grid */}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-2 relative h-full">

                {/* Left Column: Stacked Design */}
                <div className="relative p-8 md:p-12 lg:pl-20 flex flex-col justify-center items-center text-center md:items-start md:text-left order-2 md:order-1 h-full hero-content z-10">

                    {/* TOP: Headline */}
                    <div className="w-full mt-8 md:mt-0 mb-8 md:mb-12">
                        <h1 className="hero-text-element font-gravitas text-6xl md:text-7xl lg:text-9xl uppercase leading-[0.85] text-almost-black md:-ml-1 tracking-tighter">
                            Street <br />
                            <span className="font-serif italic font-normal text-5xl md:text-7xl lg:text-8xl lowercase tracking-normal block transform translate-y-[-10px]">Culture</span>
                            Revived
                        </h1>
                    </div>

                    {/* MIDDLE: Social Proof & CTA */}
                    <div className="hero-text-element w-full flex flex-col items-center md:items-start gap-8">

                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-ivory bg-gray-300 relative overflow-hidden">
                                        <div className={`w-full h-full bg-gray-${i * 100 + 300}`}></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="font-bold font-heading text-sm uppercase tracking-wider">Join 150k+</span>
                                <span className="text-xs text-gray-600 font-medium">Streetwear Enthusiasts</span>
                            </div>
                        </div>

                        <Link href="/shop" className="bg-black text-white py-4 px-12 rounded-full font-heading font-bold uppercase tracking-wider text-lg hover:scale-105 hover:bg-vintage-red transition-all duration-300 shadow-xl cursor-pointer">
                            Shop Collection ↗
                        </Link>
                    </div>

                    {/* BOTTOM: Feature Card */}
                    <div className="hero-text-element w-full bg-[#EAE8DC] rounded-xl p-6 border border-black/5 flex items-center text-left gap-6 max-w-md shadow-sm mt-12 md:mt-auto">
                        <div className="w-16 h-16 bg-black rounded-lg shrink-0 overflow-hidden relative">
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
                <div className="relative order-1 md:order-2 p-6 md:p-8 lg:p-10 flex items-center justify-center">
                    <div className="hero-image-frame w-full max-w-md lg:max-w-xl aspect-[3/4] relative border-2 border-black rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
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

            </main>
        </section>
    );
};

export default HeroSection;
