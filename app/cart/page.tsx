"use client";

import useCartStore from "@/store/cartStore";
import { urlFor } from "@/utils/sanity/client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartPage: React.FC = () => {
	const { items, total, increaseQuantity, decreaseQuantity, removeItem } =
		useCartStore();
	let shippingCost: number;

	console.log(total);
	

	return (
		<div className="font-sans">
			<div className="grid lg:grid-cols-3">
				<div className="lg:col-span-2 p-6 bg-white overflow-x-auto">
					<div className="flex gap-2 border-b pb-4">
						<h2 className="text-2xl font-bold text-gray-800 flex-1">
							Shopping Cart
						</h2>
						<h3 className="text-base text-gray-800">
							{items.length === 0
								? "Your cart is empty"
								: `${items.length} items`}
						</h3>
					</div>

					<div className="overflow-x-auto">
						<table className="mt-6 w-full border-collapse divide-y">
							<thead className="whitespace-nowrap text-left">
								<tr>
									<th className="text-base text-gray-800 p-4">Description</th>
									<th className="text-base text-gray-800 p-4">Quantity</th>
									<th className="text-base text-gray-800 p-4">Price</th>
								</tr>
							</thead>

							<tbody className="whitespace-nowrap divide-y">
								{items.map((item) => (
									<tr key={item._id}>
										<td className="p-4">
											<div className="flex items-center gap-4 w-max">
												<div className="">
													<Image
														src={urlFor(item.image).url()}
														alt={item.name}
														className="object-cover rounded-lg w-auto h-auto"
														width={100}
														height={100}
													/>
												</div>
												<div>
													<p className="text-base font-bold text-gray-800">
														{item.name}
													</p>
													<button
														type="button"
														className="mt-2 font-semibold text-red-400 text-sm"
														onClick={() => removeItem(item._id)}
													>
														Remove
													</button>
												</div>
											</div>
										</td>
										<td className="p-4">
											<div className="flex divide-x border w-max rounded-lg overflow-hidden">
												<button
													type="button"
													className="flex items-center justify-center bg-gray-100 w-10 h-10 font-semibold"
													onClick={() => decreaseQuantity(item._id)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-3 fill-current"
														viewBox="0 0 124 124"
													>
														<path
															d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
															data-original="#000000"
														></path>
													</svg>
												</button>
												<button
													type="button"
													className="bg-transparent w-10 h-10 font-semibold text-gray-800 text-base"
												>
													{item.selectedQuantity}
												</button>
												<button
													type="button"
													className="flex justify-center items-center bg-gray-800 text-white w-10 h-10 font-semibold"
													onClick={() => increaseQuantity(item._id)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="w-3 fill-current"
														viewBox="0 0 42 42"
													>
														<path
															d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
															data-original="#000000"
														></path>
													</svg>
												</button>
											</div>
										</td>
										<td className="p-4">
											<h4 className="text-base font-bold text-gray-800">
												${item.price.toFixed(2)}
											</h4>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p>Free Shipping on all orders above $1000</p>
				</div>

				<div className="bg-gray-50 p-6 lg:sticky lg:top-0 lg:h-screen">
					<h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
						Order Summary
					</h2>

					<ul className="text-gray-800 divide-y mt-6">
						<li className="flex flex-wrap gap-4 text-base py-3">
							Subtotal{" "}
							<span className="ml-auto font-bold">${Math.floor(total)}</span>
						</li>
						<li className="flex flex-wrap gap-4 text-base py-3">
							Shipping{" "}
							<span className="ml-auto font-bold">Free till 31st Dec </span>
						</li>
						<li className="flex flex-wrap gap-4 text-base py-3">
							Tax <span className="ml-auto font-bold">Not applicable</span>
						</li>
						<li className="flex flex-wrap gap-4 text-base py-3 font-bold">
							Total <span className="ml-auto">${Math.floor(total)}</span>
						</li>
					</ul>
					<div className="flex flex-col gap-4 ">
						<Link href="/checkout">
							<button
								type="button"
								className="mt-6 text-base px-5 py-2.5 w-full
							bg-slate-900 hover:bg-blue-700 text-white rounded-lg text-center disabled:bg-slate-300"
								disabled={items.length === 0}
							>
								Checkout
							</button>
						</Link>

						<Link
							type="button"
							className="mt-6 text-base px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center"
							href="/categories/products"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
