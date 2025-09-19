import { GoogleGenAI } from "@google/genai";
import type { FinancialData } from '../types';

const API_KEY = process.env.API_KEY;
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY environment variable not set. AI Sidekick will not function.");
}


export const getFinancialAdvice = async (userQuery: string, context: FinancialData): Promise<string> => {
  if (!ai) {
    return "The AI Sidekick is currently unavailable because the API key has not been configured.";
  }
  
  const { investments, netWorthHistory, budgetItems, goals, transactions } = context;

  const netWorth = netWorthHistory.length > 0 ? netWorthHistory[netWorthHistory.length - 1].netWorth : 0;
  const totalInvestments = investments.reduce((acc, inv) => acc + inv.value, 0);

  const systemInstruction = `
You are "Sidekick", a helpful and insightful AI financial advisor for the Origin Financial app. 
Your tone should be encouraging, clear, and professional. Your purpose is to analyze the user's provided financial data and answer their questions based *only* on that data.
You must not provide actual financial, investment, or legal advice. Instead, frame your answers as educational analysis and insights derived from the data given.
Use markdown for formatting like lists, bolding, and italics. 
**Crucially, when comparing options (like rent vs. buy, or two investment strategies), you MUST format the comparison in a markdown table for clarity.**

Here is a summary of the user's financial data:
- Current Net Worth: $${netWorth.toLocaleString()}
- Total Investments: $${totalInvestments.toLocaleString()}
- Monthly Spending Summary (budgeted categories): ${JSON.stringify(budgetItems)}
- Financial Goals: ${JSON.stringify(goals.map(g => ({ name: g.name, progress: `${((g.currentAmount / g.targetAmount) * 100).toFixed(1)}%`})))}
- Recent Transactions: A list of the last 5 transactions: ${JSON.stringify(transactions.slice(0,5))}

Based on this data, please answer the user's question. Start your response with a friendly greeting.
`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userQuery,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return "Sorry, I encountered an error while processing your request. Please try again later.";
  }
};