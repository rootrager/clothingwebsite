"use client";

import React, { useState } from "react";
import { Product } from "@/lib/supabase";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Check, AlertCircle } from "lucide-react";

export default function ProductInteractives({ product }: { product: Product }) {
    const { addItem, openCart } = useCartStore();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState(false);

    const sizes = ['S', 'M', 'L', 'XL'];

    const handleAddToCart = () => {
        if (!selectedSize) {
            setError(true);
            setTimeout(() => setError(false), 500); // Shake animation duration
            return;
        }

        addItem(product, selectedSize);
        setIsAdded(true);
        openCart(); // Auto-open drawer as requested

        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <div className="flex flex-col gap-8 mt-8">
            {/* Size Selector */}
            <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                    <span className="font-heading font-bold uppercase text-sm tracking-wider">Select Size</span>
                    <span className="text-xs text-gray-500 uppercase cursor-pointer hover:underline">Size Guide</span>
                </div>

                <div className="flex gap-4">
                    {sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => {
                                setSelectedSize(size);
                                setError(false);
                            }}
                            className={`
                                w-14 h-14 flex items-center justify-center 
                                border border-black font-heading font-bold 
                                transition-all duration-200
                                ${selectedSize === size
                                    ? "bg-black text-white"
                                    : "bg-transparent text-black hover:bg-black/5"
                                }
                            `}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                {error && (
                    <div className="flex items-center gap-2 text-vintage-red text-xs font-bold uppercase animate-pulse">
                        <AlertCircle size={14} />
                        Please select a size
                    </div>
                )}
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className={`
                    w-full py-5 px-8 
                    font-heading font-bold uppercase text-lg tracking-widest
                    flex items-center justify-center gap-3
                    transition-all duration-300 shadow-xl
                    ${isAdded
                        ? "bg-vintage-red text-white"
                        : "bg-black text-white hover:bg-vintage-red"
                    }
                    ${error ? "animate-shake" : ""}
                `}
            >
                {isAdded ? (
                    <>
                        <Check size={20} />
                        <span>Added to Cart</span>
                    </>
                ) : (
                    <>
                        <ShoppingBag size={20} />
                        <span>Add to Cart</span>
                    </>
                )}
            </button>

            {/* Description / Extra Info */}
            <div className="text-sm font-sans text-gray-600 leading-relaxed space-y-4 border-t border-black/10 pt-8">
                <p>{product.description || "No description available for this archival piece."}</p>
                <ul className="list-disc list-inside text-xs uppercase font-bold tracking-wide opacity-70 space-y-1">
                    <li>Heavyweight Cotton</li>
                    <li>Oversized Fit</li>
                    <li>Limited Archive Drop</li>
                </ul>
            </div>
        </div>
    );
}
