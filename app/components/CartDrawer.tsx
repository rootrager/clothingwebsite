"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { X, Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
    const {
        items,
        isCartOpen,
        closeCart,
        removeItem,
        updateQuantity,
        subtotal
    } = useCartStore();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Overlay Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeCart}
            />

            {/* Drawer Panel */}
            <div
                className={`fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#121212] text-white z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10">
                    <h2 className="font-heading font-bold text-xl uppercase tracking-widest">
                        Your Bag ({items.length})
                    </h2>
                    <button onClick={closeCart} className="hover:text-vintage-red transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                            <span className="font-heading text-lg uppercase mb-2">Your cart is empty</span>
                            <p className="text-sm font-sans">Start adding some items from the archive.</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                                {/* Item Image */}
                                <div className="relative w-20 h-24 bg-white/5 rounded-md overflow-hidden shrink-0">
                                    <Image
                                        src={item.product.image_url}
                                        alt={item.product.title}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm uppercase leading-tight pr-4">
                                            {item.product.title}
                                        </h3>
                                        <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-wider">
                                            {item.product.category}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 bg-white/10 rounded-full px-2 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                className="p-1 hover:text-vintage-red disabled:opacity-30"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="font-mono text-xs font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                className="p-1 hover:text-vintage-red"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>

                                        {/* Price & Remove */}
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="font-mono font-bold text-sm">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item.product.id)}
                                                className="text-xs text-gray-500 underline hover:text-vintage-red transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer actions */}
                <div className="p-6 border-t border-white/10 bg-[#1a1a1a]">
                    <div className="flex justify-between items-center mb-6 font-heading font-bold uppercase tracking-wider">
                        <span>Subtotal</span>
                        <span className="font-mono text-xl">${subtotal().toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => {
                            closeCart();
                            router.push("/checkout");
                        }}
                        className="w-full bg-white text-black py-4 font-heading font-bold uppercase text-lg tracking-widest hover:bg-vintage-red hover:text-white transition-colors duration-300"
                    >
                        Checkout
                    </button>
                    <p className="text-center text-[10px] text-gray-500 mt-4 uppercase tracking-widest">
                        Free shipping on all archive orders
                    </p>
                </div>
            </div>
        </>
    );
}
