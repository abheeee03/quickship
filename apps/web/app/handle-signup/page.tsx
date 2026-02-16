import { useUser } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@repo/db/client";
import { redirect } from "next/navigation";

export default async function HandleNewAcount() {
    const user = await currentUser();
    if (!user) {
        return <div className="h-screen w-full">Loading...</div>
    }
    if (user) {
        const res = await prisma.user.create({
            data: {
                email: user.emailAddresses[0].emailAddress,
                id: user.id,
            }
        })
        if (res) {
            redirect("/home")
        }
    }
    redirect('/')
}