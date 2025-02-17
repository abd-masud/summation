import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { num1, num2 } = await req.json();

        if (typeof num1 !== "number" || typeof num2 !== "number") {
            return NextResponse.json({ error: "Invalid input. Numbers required." }, { status: 400 });
        }

        const sum = num1 + num2;

        const response = NextResponse.json({ sum });

        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type");

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
