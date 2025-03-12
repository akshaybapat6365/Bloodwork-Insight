import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AnalysisResult {
  normalRanges: Record<string, { min: number; max: number }>;
  findings: Array<{
    test: string;
    value: number;
    status: 'normal' | 'high' | 'low';
    recommendation?: string;
  }>;
  summary: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileId } = req.body;

    if (!fileId) {
      return res.status(400).json({ error: 'File ID is required' });
    }

    // Get the file path
    const filePath = path.join(process.cwd(), 'uploads', fileId);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // For PDF files, we would use a PDF parser here
    // For images, we would use OCR here
    // For this example, we'll assume the data is extracted and formatted

    // Process with OpenAI
    let completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "You are a medical AI assistant specialized in analyzing blood work results. Analyze the provided results and give detailed insights."
        },
        {
          role: "user",
          content: "Please analyze this blood work report and provide detailed insights about the results."
        }
      ],
      max_tokens: 1000,
    });

    // If the file is an image, we'll use the vision API
    if (fileBuffer.toString('base64').match(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/)) {
      const visionAnalysis = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this blood work report image and provide detailed insights about the results."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${fileBuffer.toString('base64')}`,
                },
              }
            ],
          },
        ],
        max_tokens: 1000,
      });
      
      completion = visionAnalysis;
    }

    const analysis = completion.choices[0]?.message?.content;
    
    if (!analysis) {
      throw new Error('Failed to get analysis from AI');
    }

    // Parse the AI response and structure it
    // This is a simplified example - in practice, you'd want to structure the AI's response more carefully
    const result: AnalysisResult = {
      normalRanges: {
        // You would populate this with actual ranges from your database or AI response
        "WBC": { min: 4.0, max: 11.0 },
        "RBC": { min: 4.2, max: 5.8 },
        // Add other ranges as needed
      },
      findings: [
        // You would parse these from the AI response
      ],
      summary: analysis,
    };

    // Delete the file after processing
    fs.unlinkSync(filePath);

    return res.status(200).json(result);

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'An error occurred during analysis'
    });
  }
} 