# AI Bloodwork Analysis App

A modern web application that uses AI to analyze and interpret blood test results, providing personalized insights and recommendations.

## Features

- Upload blood test results (PDF, image, or manual entry)
- AI-powered analysis of lab results
- Personalized health insights and recommendations
- Historical tracking of results
- Interactive chat interface for health-related questions
- Educational resources about blood test markers

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/my-ai-bloodwork-app.git
cd my-ai-bloodwork-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your API keys:
```
OPENAI_API_KEY=your_openai_api_key
# Add any other required API keys
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Deployment

This application can be easily deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fmy-ai-bloodwork-app)

## Technology Stack

- Next.js - React framework
- Tailwind CSS - Styling
- OpenAI API - AI analysis
- Chart.js - Data visualization
- React Dropzone - File uploads

## License

This project is licensed under the MIT License - see the LICENSE file for details. 