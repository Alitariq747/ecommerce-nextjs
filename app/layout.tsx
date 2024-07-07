import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MyNavbar from "@/components/Navbar";
import MyFooter from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopee",
  description: "Exclusive wear 2024",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<MyNavbar />

					{children}
					<Toaster />

					<MyFooter />
				</body>
			</html>
		</ClerkProvider>
	);
}
