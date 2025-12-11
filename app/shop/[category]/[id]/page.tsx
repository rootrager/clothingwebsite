import { getProductById } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductInteractives from "@/app/components/ProductInteractives";

// Force dynamic because we might not know all IDs at build time, 
// or if we want to ensure fresh data.
export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
    const { category, id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-vintage-cream text-almost-black">

            {/* Grid Layout: Stacked on Mobile, Split on Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] min-h-screen">

                {/* LEFT: Product Image (Scrollable) */}
                <div className="relative bg-white border-b lg:border-r lg:border-b-0 border-black flex items-center justify-center p-8 lg:p-20 min-h-[50vh] lg:min-h-screen">
                    <div className="relative w-full max-w-xl aspect-[3/4] shadow-2xl border border-black/5">
                        <Image
                            src={product.image_url}
                            alt={product.title}
                            fill
                            className="object-contain p-8"
                            priority
                            sizes="(max-width: 1024px) 100vw, 60vw"
                        />
                    </div>
                </div>

                {/* RIGHT: Details (Sticky) */}
                <div className="relative flex flex-col p-8 lg:p-16 lg:h-screen lg:sticky lg:top-0 overflow-y-auto">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-8">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
                        <span>/</span>
                        <Link href={`/shop/${category}`} className="hover:text-black transition-colors">{category}</Link>
                    </nav>

                    {/* Header */}
                    <div className="mb-4">
                        <h1 className="font-gravitas text-4xl lg:text-6xl uppercase leading-[0.9] text-black">
                            {product.title}
                        </h1>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                        <span className="font-mono text-3xl font-bold tracking-tight text-gray-700">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Separator */}
                    <div className="w-full h-px bg-black/10 mb-8"></div>

                    {/* Interactive Elements (Client Component) */}
                    <ProductInteractives product={product} />

                </div>
            </div>
        </main>
    );
}
