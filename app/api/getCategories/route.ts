import { NextRequest, NextResponse } from "next/server";
import {client} from '@/utils/sanity/client'

export async function GET(req: NextRequest, res: NextResponse) {
    try {

        const categories = await client.fetch(`*[_type == "category"]`)        

        return NextResponse.json(categories)


    } catch (error: any) {
        console.error(error)
        return NextResponse.json({error: error.message})
    }
}