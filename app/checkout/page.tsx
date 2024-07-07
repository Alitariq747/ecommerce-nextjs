"use client";

import { FormEvent, useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import useCartStore from "@/store/cartStore";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
import { Order } from "@/types/types";
import { submitOrder } from "@/utils/createOrder";
import { useRouter } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
	throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {


	const router = useRouter()

	let { total, items, emptyCart } = useCartStore();
	total = Math.round(total);

	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const phoneNumberRef = useRef<HTMLInputElement>(null);
	const addressRef = useRef<HTMLInputElement>(null);
	const postalCodeRef = useRef<HTMLInputElement>(null);

	const [paymentMethod, setPaymentMethod] = useState<string>("COD");
	const [order, setOrder] = useState<Order | null>(null);

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (
			!firstNameRef.current?.value ||
			!lastNameRef.current?.value ||
			!emailRef.current?.value ||
			!phoneNumberRef.current?.value ||
			!addressRef.current?.value ||
			!postalCodeRef.current?.value
		) {
			toast.error("Please fill in all the fields", { position: "top-right" });
			return;
		}

		const newOrder: Order = {
			username: `${firstNameRef.current.value} ${lastNameRef.current.value}`,
			email: emailRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
			address: addressRef.current.value,
			postalCode: postalCodeRef.current.value,
			orderItems: items,
			paid: paymentMethod === "Online",
			dispatched: false,
			orderDate: new Date(),
			totalAmount: total,
		};

		if (paymentMethod === "COD") {
			try {
				toast.success("Placing Order...", { position: "top-right" });

				const result = await submitOrder(newOrder);

				firstNameRef.current.value = "";
				lastNameRef.current.value = "";
				phoneNumberRef.current.value = "";
				emailRef.current.value = "";
				addressRef.current.value = "";
				postalCodeRef.current.value = "";
				

				router.push(`/payment-success?amount=${total}`)

				
			} catch (error) {
				console.log(error);
			}
		} else {
			setOrder(newOrder); // Store the order to create it after payment
		}

		emptyCart()
		
	};

	return (
		<div className="max-w-4xl mx-auto font-[sans-serif] p-6">
			<div className="text-center mb-10">
				<h2 className="text-gray-800 text-lg md:text-2xl font-semibold mt-6">
					Checkout
				</h2>
			</div>

			<form onSubmit={submitHandler}>
				<div className="grid sm:grid-cols-2 gap-8">
					<div>
						<label className="text-gray-800 text-sm mb-2 block">
							First Name
						</label>
						<input
							name="name"
							type="text"
							className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
							placeholder="Enter name"
							ref={firstNameRef}
						/>
					</div>
					<div>
						<label className="text-gray-800 text-sm mb-2 block">
							Last Name
						</label>
						<input
							name="lname"
							type="text"
							className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
							placeholder="Enter last name"
							ref={lastNameRef}
						/>
					</div>
					<div>
						<label className="text-gray-800 text-sm mb-2 block">Email Id</label>
						<input
							name="email"
							type="text"
							className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
							placeholder="Enter email"
							ref={emailRef}
						/>
					</div>
					<div>
						<label className="text-gray-800 text-sm mb-2 block">
							Mobile No.
						</label>
						<input
							name="phoneNumber"
							type="number"
							className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
							placeholder="Enter mobile number"
							ref={phoneNumberRef}
						/>
					</div>
					<div>
						<label className="text-gray-800 text-sm mb-2 block">Address</label>
						<input
							name="address"
							type="text"
							className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
							placeholder="Enter Address"
							ref={addressRef}
						/>
					</div>
					<div>
						<label className="text-gray-800 text-sm mb-2 block">
							Postal Code
						</label>
						<input
							name="postalCode"
							type="number"
							className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
							placeholder="Enter postal code"
							ref={postalCodeRef}
						/>
					</div>
				</div>

				<div className="!mt-12 flex flex-col gap-4">
					<div className="flex flex-row gap-10 items-center">
						<label className="text-gray-800 text-sm">
							<input
								type="radio"
								name="paymentMethod"
								value="COD"
								checked={paymentMethod === "COD"}
								onChange={() => setPaymentMethod("COD")}
								className="mr-2"
							/>
							COD
						</label>
						<label className="text-gray-800 text-sm">
							<input
								type="radio"
								name="paymentMethod"
								value="Online"
								checked={paymentMethod === "Online"}
								onChange={() => setPaymentMethod("Online")}
								className="mr-2"
							/>
							Online Payment
						</label>
					</div>
				</div>

				<div className="!mt-8 flex flex-col gap-4">
					<div className="flex flex-row gap-10 items-center">
						<button
							type="submit"
							className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-none"
						>
							{paymentMethod === "COD" ? "Place Order" : "Enter Card Details"}
						</button>
					</div>
				</div>
			</form>

			{total && paymentMethod === "Online" && order && (
				<div className="max-w-lg mt-6">
					<Elements
						stripe={stripePromise}
						options={{
							mode: "payment",
							amount: convertToSubcurrency(total),
							currency: "usd",
						}}
					>
						<PaymentForm
							amount={total}
							setPaymentMethod={setPaymentMethod}
							order={order}
						/>
					</Elements>
				</div>
			)}
		</div>
	);
}
