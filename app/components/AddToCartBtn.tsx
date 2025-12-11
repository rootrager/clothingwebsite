"use client";

import React, { useState } from "react";
import { Product } from "@/lib/supabase";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, Check } from "lucide-react";

export default function AddToCartBtn({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating to product detail if parent is a link
        e.stopPropagation();

        addItem(product);
        setIsAdded(true);

        // Reset visual state after 2 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`
        absolute bottom-4 right-4 z-20 
        flex items-center gap-2 
        px-4 py-3 
        font-heading font-bold text-xs uppercase tracking-wider
        transition-all duration-300 shadow-lg border border-black
        ${isAdded
                    ? "bg-vintage-red text-white border-vintage-red"
                    : "bg-white text-black hover:bg-black hover:text-white"
                }
      `}
        >
            {isAdded ? (
                <>
                    <Check size={16} />
                    <span className="hidden md:inline">Added</span>
                </>
            ) : (
                <>
                    <ShoppingBag size={16} />
                    <span className="hidden md:inline">Add</span>
                </>
            )}
        </button>
    );
}
