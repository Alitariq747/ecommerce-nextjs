import ProductCard from "@/components/ProductCard";

import { fetchProductsByCategory } from "@/utils/fetchData";



const SingleCategoryPage = async ({ params }: { params: { slug: string } }) => {
        
	
    const  products  = await fetchProductsByCategory(params.slug)

    
    if (!products) {
        return <div>Loading...</div>
    }

    return (
        <section className="h-screen w-full p-2 md:p-4">
            <div className="flex justify-start items-center flex-col gap-4 md:gap-8">
                <h1>
                    {params.slug.toUpperCase()}
                    
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 w-full">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

            </div>

          
            
			</section>
		);
};

export default SingleCategoryPage;
