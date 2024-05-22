const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
});

const generationConfig = {
    temperature: 0.8,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];



async function ask(question) {
    try {
        const chatSession = model.startChat({
            generationConfig,
            safetySettings,
        });
        console.log(question)
        const response = await chatSession.sendMessage(question);
        const answer = response.response.text();
        return {
            error: false,
            answer
        }
    } catch (e) {
        let error = { ...e.response }
        console.log(e)
        console.log(
            error.promptFeedback.blockReason.toLowerCase(),
            error.promptFeedback.blockReason.toLowerCase() === "other"
        )

        if (error.promptFeedback.blockReason.toLowerCase() === "other") {
            return {
                error: true,
                blocked: true
            }
        } else {
            return {
                error: true,
                unknown: true
            }
        }
    }
}

module.exports = { ask }