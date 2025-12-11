import { getProducts } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0; // Ensure fresh data on every request

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-vintage-cream text-almost-black">
            {/* Header */}
            <header className="pt-32 pb-16 px-6 text-center">
                <h1 className="font-gravitas text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter">
                    The Archive
                </h1>
                <p className="font-body text-gray-500 uppercase tracking-widest mt-4">
                    Curated Streetwear Collection
                </p>
            </header>

            {/* Toolbar */}
            <div className="sticky top-0 z-20 bg-vintage-cream border-y border-black">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center font-heading font-bold uppercase text-sm md:text-base tracking-widest">
                    <button className="hover:text-vintage-red transition-colors">Filter +</button>
                    <span className="hidden md:inline-block">All Products</span>
                    <button className="hover:text-vintage-red transition-colors">Sort By v</button>
                </div>
            </div>

            {/* Product Grid (Industrial Bordered) */}
            <section className="container mx-auto pb-32">
                {/* The Outer Grid Container */}
                <div className="border-l border-t border-black bg-vintage-cream">
                    {products.length === 0 ? (
                        <div className="border-r border-b border-black text-center py-20 px-6">
                            <p className="font-heading text-xl uppercase text-gray-400">No items found in the archives.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/shop/${product.category}/${product.id}`}
                                    className="group cursor-pointer border-r border-b border-black p-6 flex flex-col hover:bg-white transition-colors duration-300 relative min-h-[400px]"
                                >

                                    {/* "NEW" Badge */}
                                    {product.is_new && (
                                        <div className="absolute top-4 left-4 bg-vintage-red text-white text-[10px] font-bold uppercase px-2 py-0.5 z-10 tracking-wider">
                                            New
                                        </div>
                                    )}

                                    {/* Image Area (Aspect Square, Object Contain) */}
                                    <div className="relative aspect-square mb-6 w-full">
                                        <Image
                                            src={product.image_url}
                                            alt={product.title}
                                            fill
                                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        {/* View Indicator (Visual Only) */}
                                        <div className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 font-heading font-bold text-xs uppercase tracking-wider border border-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            View
                                        </div>
                                    </div>

                                    {/* Info Area */}
                                    <div className="mt-auto">
                                        <h3 className="font-sans font-bold text-lg uppercase leading-tight line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <div className="flex justify-between items-baseline mt-2">
                                            <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                                                {product.category}
                                            </span>
                                            <span className="font-mono text-gray-600 font-bold tabular-nums">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Simple Footer Link */}
            <div className="fixed bottom-8 right-8 z-50">
                <Link href="/" className="bg-black text-ivory px-6 py-3 rounded-full font-heading font-bold uppercase text-sm hover:bg-vintage-red transition-colors shadow-lg">
                    Back Home
                </Link>
            </div>
        </main>
    );
}
