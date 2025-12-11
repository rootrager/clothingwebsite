"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!supabase) {
            alert("Database connection error. Please try again later.");
            setLoading(false);
            return;
        }

        try {
            const total = subtotal();

            // 1. Create Order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert([
                    {
                        customer_name: formData.name,
                        customer_email: formData.email,
                        customer_address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
                        total_amount: total,
                        status: 'pending'
                    }
                ])
                .select()
                .single();

            if (orderError) throw orderError;
            if (!orderData) throw new Error("No order data returned");

            // 2. Insert Order Items
            const orderItems = items.map(item => ({
                order_id: orderData.id,
                product_title: item.product.title,
                quantity: item.quantity,
                size: item.size || 'N/A',
                price: item.product.price
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Clear Cart & Redirect
            clearCart();
            router.push(`/checkout/success?orderId=${orderData.id}`);

        } catch (error: any) {
            console.error("Order failed:", error);
            alert(`Order failed: ${error.message || "Unknown error"}`);
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-vintage-cream flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-3xl mb-4">Your Bag is Empty</h1>
                    <button onClick={() => router.push('/shop')} className="underline">Return to Shop</button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-vintage-cream text-almost-black pt-32 pb-20">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Left Column: Shipping Form */}
                <div>
                    <h2 className="font-heading text-3xl uppercase mb-8 border-b-2 border-black pb-2">Shipping Manifest</h2>
                    <form onSubmit={submitOrder} className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider">Full Name</label>
                            <input
                                name="name"
                                required
                                type="text"
                                placeholder="JOHN DOE"
                                className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-vintage-red transition-colors placeholder:opacity-40"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider">Email Address</label>
                            <input
                                name="email"
                                required
                                type="email"
                                placeholder="JOHN@EXAMPLE.COM"
                                className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-vintage-red transition-colors placeholder:opacity-40"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider">Address</label>
                            <input
                                name="address"
                                required
                                type="text"
                                placeholder="123 ARCHIVE ST"
                                className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-vintage-red transition-colors placeholder:opacity-40"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider">City</label>
                                <input
                                    name="city"
                                    required
                                    type="text"
                                    placeholder="NEW YORK"
                                    className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-vintage-red transition-colors placeholder:opacity-40"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold uppercase tracking-wider">Postal Code</label>
                                <input
                                    name="postalCode"
                                    required
                                    type="text"
                                    placeholder="10001"
                                    className="bg-transparent border-b border-black py-2 focus:outline-none focus:border-vintage-red transition-colors placeholder:opacity-40"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-black text-white w-full py-5 font-heading font-bold uppercase tracking-widest text-lg hover:bg-vintage-red transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processing..." : "Confirm Order"}
                        </button>
                    </form>
                </div>

                {/* Right Column: Order Summary */}
                <div className="bg-white p-8 border border-black shadow-xl h-fit">
                    <h2 className="font-heading text-xl uppercase mb-6 tracking-wider">Order Summary</h2>
                    <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto">
                        {items.map((item, idx) => (
                            <div key={`${item.product.id}-${idx}`} className="flex gap-4 items-start">
                                <div className="relative w-16 h-16 border border-gray-200 shrink-0">
                                    <Image src={item.product.image_url} alt={item.product.title} fill className="object-contain p-1" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm uppercase leading-tight">{item.product.title}</h4>
                                    <p className="text-xs text-gray-500 mt-1">Size: {item.size} | Qty: {item.quantity}</p>
                                </div>
                                <span className="font-mono font-bold text-sm">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-black pt-6 flex justify-between items-baseline">
                        <span className="font-heading font-bold uppercase text-lg">Total</span>
                        <span className="font-mono text-3xl font-bold">${subtotal().toFixed(2)}</span>
                    </div>
                </div>

            </div>
        </main>
    );
}
