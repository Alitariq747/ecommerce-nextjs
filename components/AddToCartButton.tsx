'use client'
import {toast} from 'sonner'
import { useRouter } from "next/navigation";
import useCartStore from "@/store/cartStore";
import { CartItem, Product } from "@/types/types";

interface AddToCartButtonPropTypes {
    product: CartItem
}

const AddToCartButton: React.FC<AddToCartButtonPropTypes> = ({ product }) => {

    
    
    const router = useRouter()

    const { addItem } = useCartStore()
    
    const handleAddItem = (product: CartItem) => {
        addItem(product)
        toast.success('Added To Cart...', {position: 'top-right'})
    }

    return (
        <>
				<button
					type="button"
					className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-md"
					onClick={() => handleAddItem(product)}
				>
					Add to cart
            </button>
			</>
		);
}

export default AddToCartButton