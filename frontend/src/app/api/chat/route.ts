import { NextResponse } from "next/server";
import { analyzeSMARTGoal } from "@/services/api/openai";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await analyzeSMARTGoal(message);

    return NextResponse.json({
      id: Date.now().toString(),
      content: response,
      role: "assistant",
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
