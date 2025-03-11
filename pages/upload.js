import { useState } from 'react';
import Layout from '../components/Layout';
import UploadForm from '../components/UploadForm';
import ResultsDashboard from '../components/ResultsDashboard';
import ChatInterface from '../components/ChatInterface';

export default function Upload() {
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
    // In a real app, you might want to save these results to a database or local storage
  };

  return (
    <Layout title="Upload & Analyze">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upload Your Blood Test Results
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Get AI-powered analysis and personalized insights in seconds
          </p>
        </div>

        {!analysisResults ? (
          <UploadForm onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <div className="space-y-12">
            <ResultsDashboard results={analysisResults} />
            
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Have Questions About Your Results?
              </h2>
              <ChatInterface bloodTestResults={analysisResults} />
            </div>
            
            <div className="text-center pt-6">
              <button
                onClick={() => setAnalysisResults(null)}
                className="btn btn-outline"
              >
                Upload Another Test
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 