import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export const generateReview = async (businessName, businessDescription, businessServices) => {
    console.log(`AI Service called for: ${businessName}`);
    console.log(`Using API Key (first 5 chars): ${process.env.GOOGLE_AI_API_KEY?.substring(0, 5)}...`);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are a happy and satisfied customer of a business called "${businessName}".
            The business is described as: "${businessDescription}".
            They offer services like: "${businessServices}".

            Write a short, natural-sounding, and positive Google Review (2-3 sentences).
            Sound like a real person, avoid being overly formal or using too many emojis.
            Do not include the business name in every sentence.
            Focus on the quality of service and overall experience.
            Provide ONLY the review text.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        return text;
    } catch (error) {
        console.error("AI Generation Error:", error);
        return "Excellent service! Highly recommended for their professional approach and quality work.";
    }
};
