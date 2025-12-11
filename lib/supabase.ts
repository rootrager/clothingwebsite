import { createClient } from '@supabase/supabase-js';

// 1. Define Constants
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const localUrl = "https://lnuhrwcigrcgqtwwiimg.supabase.co";
const localKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudWhyd2NpZ3JjZ3F0d3dpaW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNjYyMTEsImV4cCI6MjA4MDk0MjIxMX0.TDMT6VGuNK_3XpQ00jNgzOsSoZihzHkh2_MJx-N7OHI";

// 2. Selection Logic
let supabaseUrl: string | undefined;
let supabaseKey: string | undefined;

if (envUrl && envKey) {
    supabaseUrl = envUrl;
    supabaseKey = envKey;
    console.log("✅ Supabase Client initialized via Environment Variables.");
} else if (process.env.NODE_ENV === 'development') {
    supabaseUrl = localUrl;
    supabaseKey = localKey;
    console.warn("⚠️ Using Hardcoded Fallback keys for Local Dev.");
} else {
    // Production and missing keys
    // We Log an error but do NOT throw, to allow build to pass (e.g. static generation)
    console.error("❌ CRITICAL ERROR: Supabase Environment Variables are missing in Production! Client set to null.");
}

// 3. Client Initialization
export const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image_url: string;
    is_new: boolean;
    description?: string;
}

// 4. Exports
export async function getProducts() {
    if (!supabase) {
        console.warn("Supabase client not initialized. Returning empty list.");
        return [];
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as Product[];
}

export async function getProductsByCategory(category: string) {
    console.log(`[Supabase] Fetching products for category: '${category}'`);

    if (!supabase) {
        console.warn("[Supabase] Client is null. Returning empty list.");
        return [];
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(`[Supabase] Error fetching category <${category}>:`, error.message);
        return [];
    }

    console.log(`[Supabase] Success. Found ${data?.length || 0} items for category '${category}'.`);
    return data as Product[];
}

export async function getProductById(id: string) {
    if (!supabase) {
        console.warn("[Supabase] Client is null. Returning null for product.");
        return null;
    }

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error(`[Supabase] Error fetching product id <${id}>:`, error.message);
        return null;
    }

    return data as Product;
}
