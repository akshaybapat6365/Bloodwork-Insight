import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'How does the AI analyze my blood test results?',
      answer: 'Our AI system uses advanced machine learning algorithms trained on millions of blood test results and medical literature. It identifies patterns in your results, compares them to reference ranges, and generates personalized insights based on the latest medical research. The system continues to learn and improve over time.',
    },
    {
      question: 'Is my health data secure and private?',
      answer: 'Yes, we take data security and privacy very seriously. All your health data is encrypted both in transit and at rest. We comply with HIPAA regulations and other relevant privacy laws. Your data is never sold to third parties, and you can request deletion of your data at any time.',
    },
    {
      question: 'Can this replace my doctor?',
      answer: 'No, our AI analysis is not a substitute for professional medical advice, diagnosis, or treatment. It\'s designed to help you better understand your blood test results and provide educational information. Always consult with your healthcare provider for medical concerns and before making any changes to your health regimen.',
    },
    {
      question: 'What types of blood tests can be analyzed?',
      answer: 'Our system can analyze most common blood tests, including complete blood count (CBC), comprehensive metabolic panel (CMP), lipid panel (cholesterol), hemoglobin A1C, thyroid function tests, vitamin levels, and more. We\'re continuously expanding our capabilities to cover additional test types.',
    },
    {
      question: 'How accurate is the AI analysis?',
      answer: 'Our AI system has been validated against expert medical interpretations with a high degree of accuracy. However, it\'s important to note that AI analysis is a tool to aid understanding, not a diagnostic system. The accuracy depends on the quality of the uploaded data and the specific tests being analyzed.',
    },
    {
      question: 'What file formats are supported for uploading test results?',
      answer: 'We support PDF files, images (JPG, PNG), and direct manual entry of test values. For PDFs and images, our system uses optical character recognition (OCR) to extract the test values. For best results, ensure the uploaded files are clear and contain all relevant information.',
    },
    {
      question: 'How often should I get blood tests done?',
      answer: 'The frequency of blood tests depends on your age, health status, risk factors, and any medical conditions you may have. Generally, healthy adults should get routine blood work during their annual physical exam. However, your healthcare provider may recommend more frequent testing based on your individual health needs.',
    },
    {
      question: 'Can I track changes in my blood test results over time?',
      answer: 'Yes, our platform allows you to upload and store multiple blood test results over time. You can track trends and changes in your health markers, which can be valuable for monitoring the effectiveness of lifestyle changes or treatments.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-6">
                <dt className="text-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="text-left w-full flex justify-between items-start text-gray-400"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      {openIndex === index ? (
                        <FiChevronUp className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <FiChevronDown className="h-6 w-6" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </dt>
                <dd
                  className={`mt-2 pr-12 ${
                    openIndex === index ? 'block' : 'hidden'
                  }`}
                >
                  <p className="text-base text-gray-500">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 