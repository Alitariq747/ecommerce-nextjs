import ProductCard from "./ProductCard";
import { fetchFeaturedProducts } from "@/utils/fetchData";

const FeaturedProductsList = async () => {

	const products = await fetchFeaturedProducts()

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				Featured Products
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard
						key={product.name}
						product={product}
					/>
				))}
			</div>
		</section>
	);
};

export default FeaturedProductsList;
