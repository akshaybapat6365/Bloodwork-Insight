import Layout from '../components/Layout';
import StepSection from '../components/StepSection';
import Link from 'next/link';
import { FiCheckCircle } from 'react-icons/fi';

export default function HowItWorks() {
  const benefits = [
    'Understand your blood test results in plain language',
    'Get personalized insights based on your specific values',
    'Track changes in your health markers over time',
    'Ask questions and get evidence-based answers',
    'Learn about what your results mean for your health',
    'Receive tailored recommendations for improvement',
    'Access your results and insights anytime, anywhere',
    'Share results with healthcare providers if you choose',
  ];

  return (
    <Layout title="How It Works">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How AI Bloodwork Analysis Works
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform makes it easy to understand your blood test results with AI-powered insights
            </p>
          </div>
        </div>
      </div>

      <StepSection />

      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                The Technology Behind Our Platform
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                Our AI system is built on advanced machine learning algorithms trained on millions of blood test results and medical literature. Here's how it works:
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary-500 text-white">
                      <span className="text-sm font-bold">1</span>
                    </div>
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <strong className="font-medium text-gray-900">Data Extraction</strong> - Our system extracts values from your uploaded blood test results using advanced OCR technology.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary-500 text-white">
                      <span className="text-sm font-bold">2</span>
                    </div>
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <strong className="font-medium text-gray-900">Pattern Recognition</strong> - The AI analyzes your results, identifying patterns and relationships between different markers.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary-500 text-white">
                      <span className="text-sm font-bold">3</span>
                    </div>
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <strong className="font-medium text-gray-900">Contextual Analysis</strong> - Your results are analyzed in context, considering reference ranges and medical guidelines.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary-500 text-white">
                      <span className="text-sm font-bold">4</span>
                    </div>
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <strong className="font-medium text-gray-900">Insight Generation</strong> - The system generates personalized insights and recommendations based on your specific values.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-6 w-6 rounded-md bg-primary-500 text-white">
                      <span className="text-sm font-bold">5</span>
                    </div>
                  </div>
                  <p className="ml-3 text-base text-gray-500">
                    <strong className="font-medium text-gray-900">Continuous Learning</strong> - Our AI system continuously improves as it processes more data, staying up-to-date with the latest medical research.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <div className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8 sm:p-10">
                  <h3 className="text-2xl font-extrabold text-gray-900 text-center">
                    Benefits of AI Analysis
                  </h3>
                  <div className="mt-8 space-y-4">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <FiCheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <p className="ml-3 text-base text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <Link href="/upload" className="btn btn-primary w-full text-center">
                      Try It Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to understand your health?</span>
            <span className="block text-primary-300">Upload your results today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/upload" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 