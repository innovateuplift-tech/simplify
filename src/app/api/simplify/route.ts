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

    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockResponse = {
        title: topic,
        category: "Computer Science",
        shortDescription: `A brief summary of ${topic}.`,
        tldr: `The absolute simplest way to explain ${topic} in one sentence.`,
        sections: [
          {
            title: "What is it really?",
            content: `Imagine a restaurant. The chefs are the processors, the waiters are the data buses, and the customers are the end-users. ${topic} is essentially the recipe book they all share.`
          },
          {
            title: "Why does it matter?",
            content: `Without ${topic}, the restaurant would be complete chaos.`
          }
        ],
        keyTerms: [
          { term: "Chef", definition: "The processor that does the work." },
          { term: "Waiter", definition: "The data bus that carries information." }
        ],
        deepDive: `If you want to get technical, ${topic} involves complex interactions between multiple systems, but at its core, it's just a way to organize information efficiently.`
      };

      return NextResponse.json(mockResponse);
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://integrate.api.nvidia.com/v1',
    });

    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.3-70b-instruct",
      messages: [
        {
          role: "system",
          content: "You are an expert simplifier. Your job is to take complex topics and break them down into simple, easy-to-understand explanations using clear analogies. Keep the overall explanation concise, and use markdown bolding (**word**) for key concepts. You MUST respond ONLY with a valid JSON object, without markdown code blocks or wrapper text."
        },
        {
          role: "user",
          content: `Please provide a simple, analogy-based explanation for: ${topic}

          Match the exact following JSON structure:
          {
            "title": "Topic Title",
            "category": "Broad Category (e.g., Physics, Computer Science)",
            "shortDescription": "1-2 sentence high-level summary",
            "tldr": "The absolute simplest explanation in one sentence",
            "sections": [
              {
                "title": "Section Title (e.g., What is it really?)",
                "content": "Analogy-based explanation paragraph."
              },
              {
                 "title": "Section Title (e.g., Why does it matter?)",
                 "content": "Why this topic is important."
              }
            ],
            "keyTerms": [
              {
                "term": "Term 1",
                "definition": "Simple definition"
              }
            ],
            "deepDive": "A slightly more technical, but still accessible, paragraph for those who want more detail."
          }`
        }
      ],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
    });

    let text = completion.choices[0]?.message?.content || "";
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(text);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("Error parsing Nemotron JSON:", text, parseError);
      return NextResponse.json(
         { error: "Failed to parse the explanation format from the model." },
         { status: 500 }
      );
    }

  } catch (error: unknown) {
    console.error("Nemotron API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to process the request and generate an explanation.";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
