import { Button } from "flowbite-react";
import Link from "next/link";

export default function PaymentSuccess({
	searchParams: { amount, result },
}: {
	searchParams: { amount: string; result: any };
}) {
	return (
		<main className="max-w-6xl h-screen mx-auto p-10 text-slate-800 text-center border m-10 rounded-md ">
			<div className="flex flex-col items-center justify-center gap-4 md:gap-8">
				<h1 className="text-2xl font-bold">Thanks a lot for your purchase</h1>
				<h3 className="text-lg font-bold">Your order has been recieved</h3>
				<p className="text-sm font-light">
					Your order will be delivered within next 4 working days
				</p>

				<Link href='/'>
					<Button color='dark'>Continue Shopping</Button>
				</Link>

				<h4>{result}</h4>
			</div>
		</main>
	);
}
