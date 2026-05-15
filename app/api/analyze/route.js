export async function POST(req) {

  try {

    const body = await req.json();

    const { objection, style } = body;

    const prompt = `
You are an elite sales psychology AI.

Analyze this customer objection using the ${style} sales style.

Customer objection:
"${objection}"

Return ONLY valid JSON in this exact format:

{
  "objectionType": "",
  "hiddenMeaning": "",
  "emotionalState": "",
  "buyingIntent": "",
  "recommendedStrategy": "",
  "bestResponse": ""
}
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },

        body: JSON.stringify({
          model: "gpt-4o-mini",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    const content =
      data.choices?.[0]?.message?.content || "{}";

    const parsed = JSON.parse(content);

    return Response.json(parsed);

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        objectionType: "Error",
        hiddenMeaning: "API failed",
        emotionalState: "Unknown",
        buyingIntent: "0",
        recommendedStrategy: "Check API",
        bestResponse: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}