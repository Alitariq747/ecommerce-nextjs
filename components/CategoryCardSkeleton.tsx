import React from "react";

const CategoryCardSkeleton: React.FC = () => {
	return (
		<div className="min-w-[300px] max-w-lg border-md border-slate-700 rounded-lg bg-gray-50 outline-none shadow-md animate-pulse">
			<div className="relative h-48 lg:h-80 w-full bg-gray-200"></div>
			<div className="pt-6 pl-1">
				<div className="h-6 bg-gray-200 rounded w-3/4"></div>
			</div>
		</div>
	);
};

export default CategoryCardSkeleton;
