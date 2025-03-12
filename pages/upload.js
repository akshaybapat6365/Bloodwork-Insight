import { useState } from 'react';
import Layout from '../components/Layout';
import UploadForm from '../components/UploadForm';
import ResultsDashboard from '../components/ResultsDashboard';
import ChatInterface from '../components/ChatInterface';
import { FiUpload, FiFileText, FiActivity, FiMessageSquare } from 'react-icons/fi';

export default function Upload() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
    setActiveTab('results');
    // In a real app, you might want to save these results to a database or local storage
  };

  const resetAnalysis = () => {
    setAnalysisResults(null);
    setActiveTab('upload');
  };

  return (
    <Layout title="Upload & Analyze">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Upload Your Blood Test Results
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Get AI-powered analysis and personalized insights in seconds
          </p>
        </div>

        {/* Tabs navigation */}
        <div className="mb-8 border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => !analysisResults && setActiveTab('upload')}
              className={`${
                activeTab === 'upload'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                analysisResults ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={analysisResults}
            >
              <FiUpload className="inline-block mr-2" />
              Upload
            </button>
            
            <button
              onClick={() => analysisResults && setActiveTab('results')}
              className={`${
                activeTab === 'results'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                !analysisResults ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!analysisResults}
            >
              <FiActivity className="inline-block mr-2" />
              Results
            </button>
            
            <button
              onClick={() => analysisResults && setActiveTab('chat')}
              className={`${
                activeTab === 'chat'
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                !analysisResults ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!analysisResults}
            >
              <FiMessageSquare className="inline-block mr-2" />
              Ask Questions
            </button>
          </nav>
        </div>

        {/* Tab content */}
        <div className="animate-fadeIn">
          {activeTab === 'upload' && (
            <div className="card-dark p-8">
              <UploadForm onAnalysisComplete={handleAnalysisComplete} />
            </div>
          )}
          
          {activeTab === 'results' && analysisResults && (
            <div className="space-y-8">
              <ResultsDashboard results={analysisResults} />
              
              <div className="text-center pt-6">
                <button
                  onClick={resetAnalysis}
                  className="btn btn-outline mr-4"
                >
                  Upload Another Test
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="btn btn-primary"
                >
                  Ask Questions About Results
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'chat' && analysisResults && (
            <div className="space-y-8">
              <div className="card-dark p-6 mb-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FiMessageSquare className="mr-2" />
                  Ask Questions About Your Results
                </h2>
                <ChatInterface bloodTestResults={analysisResults} />
              </div>
              
              <div className="text-center pt-6">
                <button
                  onClick={() => setActiveTab('results')}
                  className="btn btn-outline mr-4"
                >
                  Back to Results
                </button>
                <button
                  onClick={resetAnalysis}
                  className="btn btn-outline"
                >
                  Upload Another Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 