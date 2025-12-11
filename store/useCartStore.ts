import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/supabase';

export interface CartItem {
    product: Product;
    quantity: number;
    size?: string;
}

interface CartState {
    items: CartItem[];
    isCartOpen: boolean; // UI State
    addItem: (product: Product, size?: string) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void; // Added for drawer controls
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void; // Added for checkout
    totalItems: () => number;
    subtotal: () => number; // Added for drawer footer
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isCartOpen: false,

            addItem: (product, size) => {
                const currentItems = get().items;
                // Check if item exists (matching ID and size if applicable)
                const existingItem = currentItems.find(
                    (item) => item.product.id === product.id && item.size === size
                );

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.product.id === product.id && item.size === size
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isCartOpen: true, // Open cart when adding item
                    });
                } else {
                    set({
                        items: [...currentItems, { product, quantity: 1, size }],
                        isCartOpen: true, // Open cart when adding item
                    });
                }
            },

            removeItem: (productId) => {
                set({
                    items: get().items.filter((item) => item.product.id !== productId),
                });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity < 1) return;
                set({
                    items: get().items.map(item =>
                        item.product.id === productId ? { ...item, quantity } : item
                    )
                });
            },

            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),
            clearCart: () => set({ items: [] }),

            totalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            subtotal: () => {
                return get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
            },
        }),
        {
            name: 'cart-storage', // name of the item in the storage (must be unique)
            // We don't persist 'isCartOpen' usually, but 'partialize' can handle that if needed.
            // Default behavior persists everything. For UI state it's often better NOT to persist.
            partialize: (state) => ({ items: state.items }),
        }
    )
);
