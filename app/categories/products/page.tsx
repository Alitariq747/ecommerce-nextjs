import { fetchAllProducts } from "@/utils/fetchData"
import ProductCard from "@/components/ProductCard"

const AllProductsPage = async () => {

  const products = await fetchAllProducts()

  if (!products) {
    return <div>Loading...</div>
  }

  return (
      <section className="w-full p-2 md:p-4">
            <div className="flex justify-start items-center flex-col gap-4 md:gap-8">
        <h1>
          
          All 
                    
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 w-full">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

            </div>

          
            
			</section>
		)
  
}

export default AllProductsPage