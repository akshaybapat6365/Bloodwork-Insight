import { useState } from 'react';
import Layout from '../components/Layout';
import { FiMail, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // In a real app, you would send this to your API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formState),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit form');
      // }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setSubmitSuccess(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout title="Contact Us">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                    <FiMail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-medium text-gray-900">Email Support</h3>
                    <p className="mt-3 text-base text-gray-500">
                      For general inquiries and support requests, email us at:
                    </p>
                    <p className="mt-2 text-base text-primary-600">
                      support@aibloodwork.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                    <FiMessageSquare className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-medium text-gray-900">Live Chat</h3>
                    <p className="mt-3 text-base text-gray-500">
                      Chat with our support team during business hours:
                    </p>
                    <p className="mt-2 text-base text-gray-600">
                      Monday - Friday: 9am - 5pm EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mx-auto">
                    <FiHelpCircle className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-medium text-gray-900">Help Center</h3>
                    <p className="mt-3 text-base text-gray-500">
                      Browse our knowledge base for answers to common questions:
                    </p>
                    <p className="mt-2">
                      <a href="#" className="text-base text-primary-600 hover:text-primary-500">
                        Visit Help Center
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white py-12 px-4 sm:px-6 lg:px-8 lg:py-16 rounded-lg shadow-lg">
            <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  Send us a message
                </h2>
                <p className="mt-3 text-lg text-gray-500">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <div className="mt-9">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiMail className="h-6 w-6 text-gray-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3 text-base text-gray-500">
                      <p>support@aibloodwork.com</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                {submitSuccess ? (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Thank you for contacting us! We&apos;ll get back to you as soon as possible.</p>
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={() => setSubmitSuccess(false)}
                          >
                            Send another message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          value={formState.message}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>
                    {submitError && (
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">
                              <p>{submitError}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`btn btn-primary w-full ${
                          isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 