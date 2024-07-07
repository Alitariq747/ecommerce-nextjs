
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";


import CartIcons from "./svgs/CartIcons";
import ContactModal from "./ContactModal";
import UserIcon from "./svgs/UserIcon";

const MyNavbar = () => {

  const { userId } = useAuth();

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<nav className="bg-white border-b border-gray-200 shadow-md w-full z-10">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/">
							<h1 className="text-xl font-bold">Logo</h1>
						</Link>
					</div>
					<div className="hidden md:flex md:items-center md:space-x-6">
						<Link
							href="/categories/products"
							className="text-gray-800 hover:text-gray-600"
						>
							All
						</Link>
						<Link
							href="/categories"
							className="text-gray-800 hover:text-gray-600"
						>
							Categories
						</Link>
						<ContactModal />
					</div>
					<div className="hidden md:flex md:items-center md:space-x-4">
						{!userId ? (
							<Link href="/sign-in">
								<UserIcon />
							</Link>
						) : (
							<UserButton />
						)}
						<Link href="/cart">
							<CartIcons />
						</Link>
					</div>
					<div className="flex items-center md:hidden">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600"
							aria-label="Toggle mobile menu"
						>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d={
										isMobileMenuOpen
											? "M6 18L18 6M6 6l12 12"
											: "M4 6h16M4 12h16m-7 6h7"
									}
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div
				className={`md:hidden transition-all duration-300 ${
					isMobileMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
				}`}
			>
				<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
					<Link
						href="/categories/products"
						className="block text-gray-800 hover:text-gray-600"
					>
						All
					</Link>
					<Link
						href="/categories"
						className="block text-gray-800 hover:text-gray-600"
					>
						Categories
					</Link>
					<Link
						href="/contact-us"
						className="block text-gray-800 hover:text-gray-600"
					>
						Contact Us
					</Link>

					<Link
						href="/cart"
						className="block text-gray-800 hover:text-gray-600"
					>
						Cart
					</Link>
					{!userId ? (
						<Link
							href="/sign-in"
							className="block text-gray-800 hover:text-gray-600"
						>
							Sign-In
						</Link>
					) : (
						<UserButton />
					)}
				</div>
			</div>
		</nav>
	);
};

export default MyNavbar;
