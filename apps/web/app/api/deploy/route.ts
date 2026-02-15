import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const { gitURL } = await req.json();
    console.log(gitURL);
    return NextResponse.json({ id: "randomassid" })
}