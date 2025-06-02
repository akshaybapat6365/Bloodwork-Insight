import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import pdf from 'pdf-parse';
import { createWorker } from 'tesseract.js';

// Configure multer for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    // Accept only PDF and image files
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and images (JPEG, PNG) are allowed.'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  // Note: fs.mkdirSync might not be suitable for all serverless environments.
  fs.mkdirSync(uploadDir);
}

// Helper to handle multer upload
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await runMiddleware(req, res, upload.single('file'));

    const file = (req as any).file; // TODO: type this properly
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let extractedText = '';

    try {
      if (file.mimetype === 'application/pdf') {
        const dataBuffer = fs.readFileSync(file.path);
        const data = await pdf(dataBuffer);
        extractedText = data.text;
      } else if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(file.path);
        extractedText = text;
        await worker.terminate();
      } else {
        fs.unlinkSync(file.path); // Clean up unsupported file
        return res.status(400).json({ error: 'Unsupported file type for text extraction. Only PDF, JPEG, and PNG are supported.' });
      }

      // Clean up the uploaded file
      fs.unlinkSync(file.path);

      return res.status(200).json({
        message: 'File processed successfully',
        filename: file.originalname, // Using originalname for user reference
        extractedText,
      });

    } catch (extractionError) {
      console.error('Text extraction error:', extractionError);
      // Clean up the uploaded file in case of extraction error
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return res.status(500).json({
        error: extractionError instanceof Error ? extractionError.message : 'An error occurred during text extraction'
      });
    }

  } catch (uploadError) {
    console.error('Upload error:', uploadError);
    // Note: file might not exist here if upload.single('file') itself failed.
    // If it does, multer usually handles cleanup of the file.
    return res.status(500).json({
      error: uploadError instanceof Error ? uploadError.message : 'An error occurred during upload'
    });
  }
} 