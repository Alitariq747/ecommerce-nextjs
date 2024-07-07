import { client } from "@/utils/sanity/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	res: NextResponse
) {
   
    
	
		try {
			const { username, email, phoneNumber, orderItems, totalAmount, dispatched, paid, postalCode, address } =
				await req.json();

			const result = await client.create({
				_type: "order",
				username,
				email,
				phoneNumber,
				orderItems,
				totalAmount,
                orderDate: new Date().toISOString(),
                dispatched,
                paid,
                postalCode,
                address
            });
            
            return NextResponse.json({result})

		} catch (error: any) {
            console.error("Internal Error:", error);
            return NextResponse.json(error, {
	        status: 400,
});		}
	
}

