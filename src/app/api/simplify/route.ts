import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "A valid topic is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback logic for when the user hasn't set up their OpenAI API key yet.
      // This prevents the application from breaking immediately after cloning.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const explanation = `**Note: OpenAI API Key is missing!**\n\nTo see real AI-generated simplifications, please set your \`OPENAI_API_KEY\` in a \`.env.local\` file at the root of the project.\n\n---\n\nHere is a placeholder explanation of **${topic}**.\n\nImagine ${topic} like a busy restaurant kitchen. In the kitchen, you have different chefs (components) working together. The head chef is the main system directing orders, the sous chefs prep the ingredients (process data), and the waiters bring out the final dish to the customer (output).\n\nEven though the recipes (the underlying mechanics) are very complex, the end result is just a perfectly cooked meal served to your table. So instead of worrying about the intricate cooking methods, just know that ${topic} is basically a well-coordinated team working behind the scenes to give you exactly what you asked for!`;

      return NextResponse.json({ explanation });
    }

    // Initialize the OpenAI client
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert simplifier. Your job is to take complex topics and break them down into simple, easy-to-understand explanations using clear analogies. Keep it concise (under 250 words), and use markdown bolding (**word**) for key concepts."
        },
        {
          role: "user",
          content: `Please provide a simple, analogy-based explanation for: ${topic}`
        }
      ],
      temperature: 0.7,
      max_tokens: 350,
    });

    const explanation = completion.choices[0]?.message?.content || "Sorry, I couldn't generate an explanation for that topic.";

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "Failed to process the request and generate an explanation." },
      { status: 500 }
    );
  }
}
