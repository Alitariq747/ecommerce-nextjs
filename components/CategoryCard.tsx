// components/CategoryCard.tsx
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/utils/sanity/client";

import { Category } from "@/types/types";


interface CategoryCardProps {
	category: Category;
}


const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {

	const link = category.slug.current
	
	return (
		<Link href={`/categories/${link}`}>
			<div className="min-w-[300px] max-w-lg border-md border-slate-700 rounded-lg bg-gray-50 outline-none shadow-md">
				<div className="relative h-48 lg:h-80 w-full">
					<Image
						src={urlFor(category.image).url()}
						alt={category.categoryName}
						fill
						className="object-cover"
						sizes="100%"
					/>
				</div>
				<div className="pt-6 pl-1">
					<h2 className="text-md font-light text-slate-600">
						{category.categoryName}
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default CategoryCard;


