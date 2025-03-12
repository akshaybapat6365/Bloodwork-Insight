import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import StepSection from '../components/StepSection';
import Link from 'next/link';
import { FiFileText, FiTrendingUp, FiMessageSquare, FiShield, FiUpload } from 'react-icons/fi';

export default function Home() {
  const features = [
    {
      name: 'Easy Upload',
      description: 'Upload your blood test results in PDF format, as an image, or enter values manually.',
      icon: FiFileText,
    },
    {
      name: 'AI-Powered Analysis',
      description: 'Get personalized insights and explanations of your blood test results using advanced AI.',
      icon: FiTrendingUp,
    },
    {
      name: 'Interactive Chat',
      description: 'Ask questions about your results and get evidence-based answers from our AI assistant.',
      icon: FiMessageSquare,
    },
    {
      name: 'Privacy & Security',
      description: 'Your health data is encrypted and secure. We never share your information with third parties.',
      icon: FiShield,
    },
  ];

  const testimonials = [
    {
      content: "This app has been a game-changer for understanding my lab results. The AI explanations are clear and helpful, and I love being able to ask follow-up questions.",
      author: "Sarah J.",
      role: "Healthcare Professional",
    },
    {
      content: "I've always been confused by my blood test results, but this app makes everything so much clearer. The insights are personalized and easy to understand.",
      author: "Michael T.",
      role: "Regular User",
    },
    {
      content: "As someone who monitors several health conditions, this tool has been invaluable. It helps me track changes over time and understand what they mean.",
      author: "Elena R.",
      role: "Patient Advocate",
    },
  ];

  return (
    <Layout title="Home">
      <HeroSection />
      
      <StepSection />
      
      {/* Features Section */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Features That Empower You
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
              Take control of your health with our powerful tools and insights
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6 hover-lift">
                  <div className="flow-root bg-gray-800 rounded-lg border border-gray-700 px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gray-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
              Hear from people who have used our platform to understand their health
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card-dark p-6 hover-lift">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-300 font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-white">{testimonial.author}</h4>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to understand your health?</span>
            <span className="block text-primary-300">Upload your results today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/upload"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-primary-400 hover:bg-primary-500 hover-lift"
              >
                <FiUpload className="mr-2" />
                Upload Your Report
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 