"use client";

import React, { useRef, useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/types";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import { fetchCategories } from "@/hooks/fetchCategories";

const CategoriesList = () => {
	const { categories, isLoading, isError } = fetchCategories();

	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isScrolling, setIsScrolling] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isScrolling && scrollContainerRef.current) {
				scrollContainerRef.current.scrollBy({ left: 1, behavior: "smooth" });
			}
		}, 20);

		return () => clearInterval(interval);
	}, [isScrolling]);

	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	if (isLoading) {
		return (
			<section className="w-full px-3 pt-4 pb-6 md:py-8 flex flex-col gap-y-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-800 pl-32">Categories</h2>
				</div>
				<div className="relative flex items-center">
					<button className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md">
						&#9664;
					</button>
					<div
						ref={scrollContainerRef}
						className="flex overflow-x-auto space-x-2 scroll-smooth py-2 px-10"
					>
						{Array.from({ length: 5 }).map((_, index) => (
							<CategoryCardSkeleton key={index} />
						))}
					</div>
					<button className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md">
						&#9654;
					</button>
				</div>
			</section>
		);
	}

	if (isError) {
		return (
			<section className="w-full px-3 pt-4 pb-6 md:py-8 flex flex-col gap-y-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-800 pl-32">Categories</h2>
				</div>
				<div className="text-red-500">Failed to load categories</div>
			</section>
		);
	}

	return (
		<section className="w-full px-3 pt-4 pb-6 md:py-8 flex flex-col gap-y-4">
			<div>
				<h2 className="text-2xl font-bold text-gray-800 pl-32">Categories</h2>
			</div>
			<div className="relative flex items-center">
				<button
					className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
					onClick={scrollLeft}
				>
					&#9664;
				</button>
				<div
					ref={scrollContainerRef}
					className="flex overflow-x-auto space-x-2 scroll-smooth py-2 px-10"
					onMouseEnter={() => setIsScrolling(false)}
					onMouseLeave={() => setIsScrolling(true)}
				>
					{categories?.map((category: Category) => (
						<CategoryCard
							key={category._id}
							category={category}
						/>
					))}
				</div>
				<button
					className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
					onClick={scrollRight}
				>
					&#9654;
				</button>
			</div>
		</section>
	);
};

export default CategoriesList;
