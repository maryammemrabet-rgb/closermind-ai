import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {

  try {

    const { objection, tone } = await req.json();

    const completion = await openai.chat.completions.create({

      model: "gpt-4.1-mini",

      response_format: { type: "json_object" },

      messages: [

        {
          role: "system",
          content: `
You are an elite sales coach and objection handling expert.

Analyze customer objections deeply using a ${tone} sales style.

Return ONLY valid JSON.

Use this EXACT structure:

{
  "objectionType": "",
  "hiddenMeaning": "",
  "emotionalState": "",
  "buyingIntent": 0,
  "recommendedStrategy": "",
  "bestResponse": ""
}
`,
        },

        {
          role: "user",
          content: `
Customer objection:
"${objection}"
`,
        },

      ],

      temperature: 0.8,

    });

    const raw = completion.choices[0].message.content;

    const parsed = JSON.parse(raw);

    return Response.json({
      result: parsed,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      result: {
        objectionType: "Error",
        hiddenMeaning: "Something went wrong.",
        emotionalState: "Unknown",
        buyingIntent: 0,
        recommendedStrategy: "Retry analysis.",
        bestResponse: "Please try again.",
      },
    });

  }

}