import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

interface AiAnalysisRequestBody {
  extractedText: string;
  filename?: string;
}

interface AnalysisResult {
  normalRanges: Record<string, { min?: number; max?: number; unit?: string }>; // Made min/max optional, added unit
  findings: Array<{
    test: string; // e.g., 'Cholesterol'
    value: string; // e.g., '185' or '185 mg/dL'
    unit?: string; // e.g., 'mg/dL'
    status: 'normal' | 'high' | 'low' | 'borderline' | 'unknown' | 'inconclusive'; // Added more statuses
    recommendation?: string; // Brief comment from AI
    referenceRange?: string; // e.g. '< 200'
  }>;
  summary: string; // Overall summary from AI
}

// Helper function to attempt parsing JSON from AI response
function tryParseJson(text: string): any | null {
  try {
    // Sometimes the AI might wrap JSON in backticks with a language identifier
    const match = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      return JSON.parse(match[1]);
    }
    // Fallback for plain JSON string
    return JSON.parse(text);
  } catch (e) {
    console.warn("Failed to parse AI response as JSON:", e);
    return null;
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalysisResult | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { extractedText, filename }: AiAnalysisRequestBody = req.body;

    if (!extractedText) {
      return res.status(400).json({ error: 'Extracted text is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" }); // Using latest flash model as specific version might not be available

    const prompt = `
      Analyze the following blood work report text extracted from a document (filename: ${filename || 'N/A'}).
      Your primary goal is to identify key blood markers, their values, units, and compare them to standard reference ranges.
      Indicate whether each marker is normal, high, low, borderline, or if the status is unknown/inconclusive.
      Provide a brief comment or explanation for any abnormal values.
      Offer a general summary of the findings, noting that this is not medical advice.

      IMPORTANT: Structure your response as a single JSON object with two main keys: "findings" and "summary".
      The "findings" key should be an array of JSON objects, where each object represents a blood marker and has the following keys:
      - "test": string (name of the blood marker, e.g., "Hemoglobin")
      - "value": string (the reported value, e.g., "14.5")
      - "unit": string (the unit of measurement, e.g., "g/dL")
      - "status": string (one of: "normal", "high", "low", "borderline", "inconclusive", "unknown")
      - "referenceRange": string (the reference range for this marker, e.g., "13.5-17.5 g/dL")
      - "comment": string (a brief explanation, especially if abnormal, or any other relevant note)

      The "summary" key should be a string containing an overall interpretation of the blood work results.

      Example for a single marker in the "findings" array:
      {
        "test": "Glucose",
        "value": "110",
        "unit": "mg/dL",
        "status": "high",
        "referenceRange": "70-100 mg/dL",
        "comment": "Slightly elevated glucose, consider lifestyle changes and follow-up."
      }

      Please ensure the entire output is a valid JSON object. Do not include any text outside of this JSON object.
      Extracted text is below:
      ---
      ${extractedText}
      ---
    `;

    const generationResult = await model.generateContent(prompt);
    const response = await generationResult.response;
    const aiTextOutput = response.text();
    
    if (!aiTextOutput) {
      throw new Error('Failed to get analysis from AI (empty response)');
    }

    console.log("AI Raw Output:", aiTextOutput); // Log raw AI output for debugging

    const parsedJson = tryParseJson(aiTextOutput);

    if (!parsedJson || !parsedJson.findings || !parsedJson.summary) {
      console.error("Failed to parse structured JSON from AI response. Raw output:", aiTextOutput);
      // Fallback: return raw AI text as summary if parsing fails
      const fallbackResult: AnalysisResult = {
        normalRanges: {}, // Cannot determine reliably without structured data
        findings: [{
          test: "Analysis Error",
          value: "",
          status: "unknown",
          comment: "Could not parse detailed findings from AI response. The raw AI output is in the summary.",
        }],
        summary: `AI Output (unable to parse structured data): ${aiTextOutput}`,
      };
      return res.status(200).json(fallbackResult); // Return 200 but with an error indicated in data
    }
    
    // Ensure findings have a consistent structure, even if AI misses some fields
    const validatedFindings = parsedJson.findings.map((item: any) => ({
      test: String(item.test || 'Unknown Test'),
      value: String(item.value || ''),
      unit: String(item.unit || ''),
      status: ['normal', 'high', 'low', 'borderline', 'inconclusive', 'unknown'].includes(item.status) ? item.status : 'unknown',
      referenceRange: String(item.referenceRange || ''),
      comment: String(item.comment || '')
    }));


    const result: AnalysisResult = {
      // normalRanges is hard to populate reliably from current AI response structure.
      // Could be a future improvement or derived from referenceRange in findings.
      normalRanges: {}, 
      findings: validatedFindings,
      summary: String(parsedJson.summary || "No summary provided by AI."),
    };

    return res.status(200).json(result);

  } catch (error) {
    console.error('AI Analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during AI analysis';
    // Attempt to provide more specific error if it's a GoogleGenerativeAIError
    if (error && typeof error === 'object' && 'message' in error) {
        // This is a basic check; you might need to check error.constructor.name or a specific property
        // that Google's SDK errors might have.
        console.error("Google AI Error details:", JSON.stringify(error, null, 2));
    }
    return res.status(500).json({ error: errorMessage });
  }
}