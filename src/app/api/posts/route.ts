import { getCurrentUser } from "@/lib/session"
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const POST = async (req: Request) => {
    const user = await getCurrentUser();
    try {
        if(!user?.email) {
            return NextResponse.json({ message: "not authenticated" }, {status: 401})
        }
        const {title, content} = await req.json()
        const newPost = await prisma.post.create({
            data: {
                title, content, authorEmail: user.email
            }
        })
          return NextResponse.json({newPost}, {status : 200})
    } catch (error) {
        return NextResponse.json({ message: "something went wrong" }, {status: 500})
    }
}