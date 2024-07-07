import ProductCard from "./ProductCard";
import { fetchNewProducts } from "@/utils/fetchData";

const NewProducts = async () => {

	const newProducts = await fetchNewProducts()

  return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				Explore Upcoming
			</h2>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{newProducts.map((product) => (
					<ProductCard
						key={product.name}
						product={product}
					/>
				))}
			</div>
		</section>
	);
}

export default NewProducts