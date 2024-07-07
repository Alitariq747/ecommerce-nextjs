import { client } from '@/utils/sanity/client'

import CategoryCard from "@/components/CategoryCard";
import { Category } from '@/types/types';

const AllCategories = async () => {

	const categories = await client.fetch<Category[]>(`*[_type == 'category']`)
	

	return (
		<section className="h-full w-full p-3 lg:p-5">
			<div className="pb-3 text-center">
				<h1 className="text-lg font-bold text-slate-800">Collections</h1>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-max xl:grid-cols-5 gap-x-3 gap-y-3 mx-auto">
				{categories.map((category) => (
					<CategoryCard
						key={category.categoryName}
						category={category}
					/>
				))}
			</div>
		</section>
	);
};

export default AllCategories;
