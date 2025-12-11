import { getProductsByCategory } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type CategoryTheme = {
    bg: string;
    text: string;
    border: string;
};

// Theme Logic (The Chameleon Effect)
const themes: Record<string, CategoryTheme> = {
    tops: { bg: "bg-[#121212]", text: "text-white", border: "border-white" },
    pants: { bg: "bg-[#F5F5F0]", text: "text-black", border: "border-black" },
    shoes: { bg: "bg-[#808080]", text: "text-white", border: "border-white" },
};

// Fallback theme
const defaultTheme: CategoryTheme = { bg: "bg-vintage-cream", text: "text-almost-black", border: "border-black" };

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const products = await getProductsByCategory(category);

    // Apply theme if category exists, else fallback
    const theme = themes[category] || defaultTheme;

    return (
        <main className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500`}>
            {/* Header */}
            <header className="pt-32 pb-16 px-6 text-center">
                <h1 className="font-gravitas text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter">
                    {category} Archive
                </h1>
                <p className={`font-body uppercase tracking-widest mt-4 opacity-70`}>
                    Curated Collection
                </p>
            </header>

            {/* Product Grid */}
            <section className="container mx-auto pb-32">
                {/* The Outer Grid Container */}
                <div className={`border-l border-t ${theme.border}`}>
                    {products.length === 0 ? (
                        <div className={`border-r border-b ${theme.border} text-center py-20 px-6`}>
                            <p className="font-heading text-xl uppercase opacity-50">No items found in this collection.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div key={product.id} className={`group cursor-pointer border-r border-b ${theme.border} p-6 flex flex-col hover:opacity-80 transition-opacity duration-300 relative min-h-[400px]`}>

                                    {/* "NEW" Badge */}
                                    {product.is_new && (
                                        <div className="absolute top-4 left-4 bg-vintage-red text-white text-[10px] font-bold uppercase px-2 py-0.5 z-10 tracking-wider">
                                            New
                                        </div>
                                    )}

                                    {/* Image Area */}
                                    <div className="relative aspect-square mb-6 w-full">
                                        <Image
                                            src={product.image_url}
                                            alt={product.title}
                                            fill
                                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>

                                    {/* Info Area */}
                                    <div className="mt-auto">
                                        <h3 className="font-sans font-bold text-lg uppercase leading-tight line-clamp-2">
                                            {product.title}
                                        </h3>
                                        <div className="flex justify-between items-baseline mt-2">
                                            <span className="text-xs font-bold uppercase opacity-60 tracking-wider">
                                                {category}
                                            </span>
                                            <span className="font-mono font-bold tabular-nums opacity-80">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Navigation Actions */}
            <div className="fixed bottom-8 right-8 z-50 flex gap-4">
                <Link href="/shop" className="bg-black text-ivory px-6 py-3 rounded-full font-heading font-bold uppercase text-sm hover:bg-vintage-red transition-colors shadow-lg border border-white/20">
                    All Items
                </Link>
                <Link href="/" className="bg-white text-black px-6 py-3 rounded-full font-heading font-bold uppercase text-sm hover:bg-vintage-red hover:text-white transition-colors shadow-lg border border-black/20">
                    Home
                </Link>
            </div>
        </main>
    );
}
