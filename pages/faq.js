import Layout from '../components/Layout';
import FAQSection from '../components/FAQSection';
import Link from 'next/link';

export default function FAQ() {
  return (
    <Layout title="FAQ">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Find answers to common questions about our AI blood test analysis platform
            </p>
          </div>
        </div>
      </div>

      <FAQSection />

      <div className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Still have questions?
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              If you couldn't find the answer to your question, please feel free to contact our support team.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="btn btn-primary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 