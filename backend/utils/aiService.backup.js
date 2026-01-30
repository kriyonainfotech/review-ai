const dotenv = require('dotenv');

dotenv.config();

const generateReview = async (businessName, businessDescription, businessServices) => {
    console.log(`AI Service called for: ${businessName}`);
    console.log(`Using OpenRouter API Key (first 5 chars): ${process.env.OPENROUTER_API_KEY?.substring(0, 5)}...`);

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "xiaomi/mimo-v2-flash:free",
                "messages": [
                    {
                        "role": "user",
                        "content": `You are a happy and satisfied customer of a business called "${businessName}". The business is described as "${businessDescription}". They offer services like "${businessServices}". Write a very short, natural-sounding, and positive Google Review (max 1-2 sentences). Sound like a real person, avoid being overly formal or using too many emojis. Focus on the quality of service and overall experience. Provide ONLY the review text.`
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenRouter API Error:", data);
            throw new Error(data.error?.message || "Failed to generate review");
        }

        const text = data.choices[0].message.content.trim();
        return text;
    } catch (error) {
        console.error("AI Generation Error Details:", error);
        return "Excellent service! Highly recommended for their professional approach and quality work.";
    }
};

module.exports = { generateReview };

