export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const systemPrompt = `You are a helpful customer service assistant for Sanima GIC Insurance Ltd. (SGIC), a licensed general insurance company in Nepal regulated by the Insurance Authority of Nepal.

IMPORTANT RULES:
- ONLY answer questions related to Sanima GIC Insurance and general insurance topics
- If asked about anything unrelated to insurance (weather, sports, politics, entertainment, coding, etc.), politely say: "I can only assist with Sanima GIC Insurance related queries. Please ask me about our insurance products, claims, premiums, or policies."
- Always be professional, helpful, and concise
- Respond in the same language the user writes in (English or Nepali)

About Sanima GIC Insurance Ltd.:
- Licensed general insurance company in Nepal
- Products: Motor Insurance, Property Insurance, Marine Insurance, Travel & Medical Insurance, Accidental & Medical Insurance, Cattle & Crops Insurance, Engineering Insurance, Miscellaneous Insurance
- Head Office: Naxal, Kathmandu, Nepal
- Phone: 01-4527101, 01-4527102
- Email: info@sanimagic.com.np
- Website: sanimagic.com.np
- Branches across all provinces of Nepal

Motor Insurance:
- Covers private cars, motorcycles, goods carriers, passenger vehicles, taxis
- Types: Comprehensive (own damage + third party) and Third Party Only
- NCD (No Claim Discount): Up to 50% discount for claim-free years
- Premium based on vehicle type, engine CC, sum insured

Property Insurance:
- Covers fire, lightning, explosion, earthquake, flood
- For residential, commercial, and industrial properties

Travel & Medical Insurance:
- For international travel
- Covers medical emergencies, trip cancellation, baggage loss

Claims Process:
- Notify SGIC immediately after incident
- Submit claim form with supporting documents
- Survey conducted by SGIC surveyor
- Settlement within stipulated timeframe

Renewals:
- Policies can be renewed before expiry
- Early renewal retains NCD benefits`;

  try {
    const cohereMessages = messages.map(m => ({
      role: m.role === 'user' ? 'USER' : 'CHATBOT',
      message: m.content
    }));

    const lastMessage = cohereMessages.pop();

    const response = await fetch('https://api.cohere.com/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'command-r-plus-08-2024',
        preamble: systemPrompt,
        chat_history: cohereMessages,
        message: lastMessage.message,
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Cohere API error', detail: err });
    }

    const data = await response.json();
    return res.status(200).json({ reply: data.text });

  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
