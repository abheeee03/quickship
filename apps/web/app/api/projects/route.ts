import { useAuth, useSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const user = await currentUser()
    console.log("reqm come: ", user!.id)
    const projects = await prisma.projects.findMany({
        where: {
            userID: user!.id
        }
    })

    return NextResponse.json({
        projects,
        count: projects.length
    })
}