import { GoogleGenAI, Type } from "@google/genai";
import type { UserProfile } from '../types';

// Fix: Per coding guidelines, initialize GoogleGenAI with process.env.API_KEY directly.
// The availability of the API key is assumed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateContent = async (prompt: string, modelName: string = 'gemini-2.5-flash') => {
    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate content from Gemini API.");
    }
};

const generateJsonContent = async (prompt: string, schema: any, modelName: string = 'gemini-2.5-flash') => {
    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating JSON content:", error);
        throw new Error("Failed to generate structured JSON from Gemini API.");
    }
}

export const generateGenericResume = (profile: UserProfile): Promise<string> => {
    const prompt = `
        You are a professional resume writer. Based on the following user profile, generate a comprehensive and professional resume in Markdown format.
        The resume should include a Professional Summary, Skills, Work Experience, and Education sections.
        For the Work Experience section, list responsibilities and achievements in bullet points, starting with strong action verbs.

        User Profile:
        ${JSON.stringify(profile, null, 2)}
    `;
    return generateContent(prompt);
};

export const generateCustomResume = (profile: UserProfile, jobDescription: string): Promise<string> => {
    const prompt = `
        You are an expert career coach specializing in resume optimization. Your task is to tailor a user's resume to a specific job description.

        First, here is the user's background information:
        ${JSON.stringify(profile, null, 2)}

        Next, here is the target job description:
        ---
        ${jobDescription}
        ---

        Now, generate a new, tailored resume in Markdown format. The resume should include a Professional Summary, Skills, Work Experience, and Education sections. 
        Emphasize the skills and experiences from the user's background that are most relevant to the job description. 
        Rephrase bullet points to align with the language and requirements of the job posting.
    `;
    return generateContent(prompt);
};

export const recommendJobTitles = async (profile: UserProfile): Promise<string[]> => {
    const prompt = `
        You are a career counselor. Analyze the following user profile and recommend 10 job titles that would be a good fit.
        Focus on the user's skills and recent experience.

        User Profile:
        ${JSON.stringify(profile, null, 2)}
        
        Provide only the job titles.
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            jobTitles: {
                type: Type.ARRAY,
                description: 'A list of 10 recommended job titles.',
                items: {
                    type: Type.STRING
                }
            }
        },
        required: ['jobTitles']
    };

    const jsonString = await generateJsonContent(prompt, schema);
    try {
        const result = JSON.parse(jsonString);
        return result.jobTitles || [];
    } catch (e) {
        console.error("Failed to parse job titles JSON:", e);
        throw new Error("Received an invalid format for job titles.");
    }
};