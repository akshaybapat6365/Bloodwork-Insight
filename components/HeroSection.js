import Link from 'next/link';
import { FiUpload, FiArrowRight } from 'react-icons/fi';

export default function HeroSection() {
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-900 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Understand Your Bloodwork with</span>{' '}
                <span className="block text-primary-400 xl:inline">AI-Powered Insights</span>
              </h1>
              <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Upload your blood test results and get personalized analysis, explanations, and recommendations in seconds. Make informed decisions about your health with AI assistance.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/upload" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-primary-400 hover:bg-primary-500 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out hover-lift">
                    <FiUpload className="mr-2" />
                    Upload Your Report
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/how-it-works" className="w-full flex items-center justify-center px-8 py-3 border border-gray-700 text-base font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
                    How It Works
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-gray-800 to-gray-900 relative">
          <img
            className="h-full w-full object-cover absolute mix-blend-overlay opacity-50"
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Medical laboratory"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/30 mix-blend-multiply"></div>
        </div>
      </div>
    </div>
  );
} 