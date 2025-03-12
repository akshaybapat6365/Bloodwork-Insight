import Link from 'next/link';
import { FiTwitter, FiInstagram, FiFacebook, FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerNavigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Upload', href: '/upload' },
      { name: 'FAQ', href: '/faq' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src="/assets/logo.png"
                alt="Bloodwork Insight"
              />
              <span className="ml-2 text-xl font-bold text-primary-400">Bloodwork Insight</span>
            </div>
            <p className="text-gray-400 text-base">
              Making healthcare more accessible through AI-powered blood test analysis and personalized insights.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-400">
                <span className="sr-only">Twitter</span>
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400">
                <span className="sr-only">Instagram</span>
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400">
                <span className="sr-only">Facebook</span>
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400">
                <span className="sr-only">LinkedIn</span>
                <FiLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Navigation</h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.main.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-base text-gray-400 hover:text-gray-300">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-base text-gray-400 hover:text-gray-300">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Subscribe to our newsletter</h3>
                <p className="mt-4 text-base text-gray-400">
                  Get the latest health insights and updates delivered to your inbox.
                </p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    required
                    className="input"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-500 text-center">
            &copy; {currentYear} Bloodwork Insight. All rights reserved.
          </p>
          <div className="text-sm text-gray-500 text-center mt-4 p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <h4 className="text-gray-300 mb-2 text-base">Important Disclaimer</h4>
            <p>
              This application is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making any decisions about your health. The analysis and insights provided by this tool are meant for educational purposes only and should not be considered as medical advice.
            </p>
            <p className="mt-2">
              Blood test results should always be reviewed by a healthcare professional who is familiar with your medical history and can provide a proper interpretation in the context of your overall health.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 