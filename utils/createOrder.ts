import { Order } from "@/types/types";

export const submitOrder = async (order: Order) => {
	try {
		const response = await fetch("/api/submitOrder", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(order),
		});

		const result = await response.json();
		if (!response.ok) {
			throw new Error(result.message || "Error submitting order");
		}

		console.log("Order submitted successfully:", result);
		return result;
	} catch (error) {
		console.error("Error submitting order:", error);
		throw new Error("Could not submit order");
	}
};
