import { NextApiRequest, NextApiResponse } from "next";
import { analyzeSMARTGoal } from "@/services/api/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    const response = await analyzeSMARTGoal(message);

    return res.status(200).json({
      id: Date.now().toString(),
      content: response,
      role: "assistant",
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
