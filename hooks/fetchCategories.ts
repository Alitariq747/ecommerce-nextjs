import { Category } from "@/types/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function fetchCategories() {
	const { data, error } = useSWR<Category[]>("/api/getCategories", fetcher);

	return {
		categories: data,
		isLoading: !error && !data,
		isError: error,
	};
}
