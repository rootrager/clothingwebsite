import { createClient, SupabaseClient } from '@supabase/supabase-js';

// 1. Read from Env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Validation (The Safety Net)
let client: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Supabase Env Vars missing! Check .env.local for typos.");
} else {
    // 3. Initialization
    client = createClient(supabaseUrl, supabaseKey);
    console.log("✅ Supabase Client initialized via Environment Variables.");
}

// Export the client (can be null if env vars are missing)
export const supabase = client;

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image_url: string;
    is_new: boolean;
    description?: string;
}

// 4. Exports (Data Fetching Functions)
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
        console.error("[Supabase] Client is null. Check environment variables.");
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
