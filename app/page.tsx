import CategoriesList from "@/components/CategoriesList";
import FeaturedProductsList from "@/components/FeaturedProductsList";
import ImageSlider from "@/components/ImageSlider";
import NewProducts from "@/components/NewProducts";


export default function Home() {
	return (
		<>
			<ImageSlider />
			<FeaturedProductsList />
			<CategoriesList />
			<NewProducts />
		</>
	);
}
