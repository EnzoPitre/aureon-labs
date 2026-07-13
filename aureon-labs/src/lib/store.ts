import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";
import { getProductById } from "@/lib/products";

interface RawCartItem {
  productId: string;
  quantity: number;
}

interface CartStore {
  rawItems: RawCartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  items: () => CartItem[];
  totalItems: () => number;
  totalPrice: () => number;
}

// Products are looked up live by slug at read time (not persisted),
// so price/name/image always reflect what's currently in products.ts —
// a cached product snapshot in localStorage would go stale the moment
// a price changes.
function resolveProduct(productId: string): Product | undefined {
  return getProductById(productId);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      rawItems: [],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.rawItems.find((i) => i.productId === product.id);
          if (existing) {
            return {
              rawItems: state.rawItems.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { rawItems: [...state.rawItems, { productId: product.id, quantity }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          rawItems: state.rawItems.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          rawItems: state.rawItems.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ rawItems: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      closeCart: () => set({ isOpen: false }),

      items: () =>
        get()
          .rawItems.map((i) => {
            const product = resolveProduct(i.productId);
            return product ? { product, quantity: i.quantity } : null;
          })
          .filter((i): i is CartItem => i !== null),

      totalItems: () => get().rawItems.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get()
          .items()
          .reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "aureon-cart",
      partialize: (state) => ({ rawItems: state.rawItems }),
    }
  )
);

interface WishlistStore {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        }));
      },
      has: (productId) => get().ids.includes(productId),
    }),
    { name: "aureon-wishlist" }
  )
);
