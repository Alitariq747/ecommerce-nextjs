import { client } from "./sanity/client";

import { Category, Product } from "@/types/types";

export const fetchCategories = async () => {
	const query = '*[_type == "category"]';
	return await client.fetch(query);
};


export const fetchAllProducts = async () => {
	const allProducts = await client.fetch<Product[]>(`*[_type == 'product']{name, _id, image, category->{categoryName}, price, slug}`, {
		
	}, {next: {revalidate: 60}});
	
	return allProducts;
};

export const fetchNewProducts = async () => {
	const newProducts = await client.fetch<Product[]>(`*[_type == 'product' && new == true]{name, _id, image, category->{categoryName}, price, slug}`)


	return newProducts
	
}


export const fetchFeaturedProducts = async () => {
	const featuredProducts = await client.fetch<Product[]>(
		`*[_type == 'product' && price > 50]{name, _id, image, category->{categoryName}, price, slug}`
	);


	return featuredProducts;
};

export const fetchProductsByCategory = async (slug: string) => {

	if (slug == 'all') {

		return fetchAllProducts()
	}

	const category = await client.fetch<Category>(
		`*[_type == 'category' && slug.current == '${slug}']{categoryName, _id}[0]`
	);

	const categoryId = category._id;


	const products = await client.fetch<Product[]>(
		`*[_type == 'product' && category._ref == '${categoryId}' ]{name, _id, image, category->{categoryName}, price, slug}`
	);

	return  products
};

export const getSingleProduct = async (slug: string) => {
	const product = await client.fetch<Product>(`*[_type == 'product' && slug.current == '${slug}'][0]`)


	const category = await client.fetch<Category>(`*[_type == 'category' && _id == '${product.category._ref}']{categoryName}[0]`)

	const categoryName = category.categoryName

	

	return { product, categoryName }
}