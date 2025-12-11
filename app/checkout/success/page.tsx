"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="bg-white p-12 border border-black shadow-2xl max-w-lg w-full flex flex-col items-center">
            <CheckCircle size={64} className="text-black mb-6" strokeWidth={1.5} />

            <h1 className="font-gravitas text-4xl mb-2 uppercase">Order Confirmed</h1>
            <p className="font-body text-gray-500 uppercase tracking-widest text-sm mb-8">
                Thank you for securing your piece of history.
            </p>

            <div className="bg-gray-100 p-4 w-full mb-8 font-mono text-sm border border-gray-300">
                <span className="block text-gray-500 text-xs uppercase mb-1">Order ID</span>
                <span className="font-bold">{orderId || "UNKNOWN-ID"}</span>
            </div>

            <Link href="/shop" className="bg-black text-white px-8 py-4 font-heading font-bold uppercase tracking-widest hover:bg-vintage-red transition-colors w-full">
                Return to Archive
            </Link>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-vintage-cream flex flex-col items-center justify-center p-6 text-center">
            <Suspense fallback={
                <div className="bg-white p-12 border border-black shadow-2xl max-w-lg w-full flex flex-col items-center">
                    <p className="font-heading uppercase tracking-widest animate-pulse">Loading Order Details...</p>
                </div>
            }>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
