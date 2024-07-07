import Link from "next/link";
import Image from "next/image";
import {  Product } from "@/types/types";
import { urlFor } from "@/utils/sanity/client";


interface ProductCardProps {
	product: Product;
	category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, category }) => {


	return (
		<Link href={`/categories/products/${product.slug.current}`}>
			<div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
				{product.image && (
					<Image
						src={urlFor(product.image).url()}
						alt={product.name}
						className="w-full h-48 md:h-80 object-cover"
						width={500}
						height={300}
					/>
				)}
				<div className="p-4">
					<h2 className="text-xl font-semibold p-1">{product.name}</h2>
					<p className="text-gray-700 p-1">{product.category.categoryName}</p>
					<p className="text-lg font-bold p-1">{`$${product.price}`}</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
