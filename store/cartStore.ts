// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/types"; // Import your types

type CartState = {
	items: CartItem[];
	total: number;
	addItem: (product: Product) => void;
	removeItem: (id: string) => void;
	increaseQuantity: (id: string) => void;
	decreaseQuantity: (id: string) => void;
	emptyCart: () => void
};

const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],
			total: 0,
			addItem: (product) =>
				set((state) => {
					const existingItem = state.items.find((i) => i._id === product._id);
					let updatedItems;
					if (existingItem) {
						updatedItems = state.items.map((i) =>
							i._id === product._id
								? { ...i, selectedQuantity: i.selectedQuantity + 1 }
								: i
						);
					} else {
						const cartItem: CartItem = { ...product, selectedQuantity: 1 };
						updatedItems = [...state.items, cartItem];
					}
					const newTotal = updatedItems.reduce(
						(sum, item) => sum + item.price * item.selectedQuantity,
						0
					);
					return { items: updatedItems, total: newTotal };
				}),
			removeItem: (id) =>
				set((state) => {
					const updatedItems = state.items.filter((item) => item._id !== id);
					const newTotal = updatedItems.reduce(
						(sum, item) => sum + item.price * item.selectedQuantity,
						0
					);
					return { items: updatedItems, total: newTotal };
				}),
			increaseQuantity: (id) =>
				set((state) => {
					const updatedItems = state.items.map((item) =>
						item._id === id
							? { ...item, selectedQuantity: item.selectedQuantity + 1 }
							: item
					);
					const newTotal = updatedItems.reduce(
						(sum, item) => sum + item.price * item.selectedQuantity,
						0
					);
					return { items: updatedItems, total: newTotal };
				}),
			decreaseQuantity: (id) =>
				set((state) => {
					const updatedItems = state.items.map((item) =>
						item._id === id && item.selectedQuantity > 1
							? { ...item, selectedQuantity: item.selectedQuantity - 1 }
							: item
					);
					const newTotal = updatedItems.reduce(
						(sum, item) => sum + item.price * item.selectedQuantity,
						0
					);
					return { items: updatedItems, total: newTotal };
				}),
			emptyCart: () => set({items: [], total: 0})
		}),
		{
			name: "cart-storage",
		}
	)
);

export default useCartStore;
