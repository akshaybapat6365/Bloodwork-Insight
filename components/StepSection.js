import { FiUpload, FiCpu, FiBarChart2, FiMessageCircle } from 'react-icons/fi';

export default function StepSection() {
  const steps = [
    {
      id: 1,
      name: 'Upload',
      description: 'Upload your blood test results in PDF format, as an image, or enter the values manually.',
      icon: FiUpload,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'AI Analysis',
      description: 'Our AI analyzes your results, comparing them to reference ranges and identifying patterns.',
      icon: FiCpu,
      color: 'bg-purple-500',
    },
    {
      id: 3,
      name: 'Get Insights',
      description: 'Receive personalized insights, explanations, and visualizations of your health data.',
      icon: FiBarChart2,
      color: 'bg-green-500',
    },
    {
      id: 4,
      name: 'Ask Questions',
      description: 'Chat with our AI to ask questions about your results and get evidence-based answers.',
      icon: FiMessageCircle,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Get insights from your blood test results in four simple steps
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div>
                    <span className={`inline-flex p-3 rounded-lg ${step.color} text-white ring-4 ring-white`}>
                      <step.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <span className="text-gray-900">Step {step.id}: {step.name}</span>
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{step.description}</p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                    </svg>
                  </span>
                </div>
                {step.id < steps.length && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 lg:block">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 