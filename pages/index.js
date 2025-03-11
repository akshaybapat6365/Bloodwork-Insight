import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import StepSection from '../components/StepSection';
import { FiFileText, FiTrendingUp, FiMessageSquare, FiShield } from 'react-icons/fi';

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
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Features That Empower You
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Take control of your health with our powerful tools and insights
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-white rounded-lg shadow-md px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Hear from people who have used our platform to understand their health
            </p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-800 font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold">{testimonial.author}</h4>
                      <p className="text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to understand your health?</span>
            <span className="block text-primary-300">Upload your results today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/upload"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50"
              >
                Get Started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/how-it-works"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 