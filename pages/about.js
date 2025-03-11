import Layout from '../components/Layout';
import { FiUsers, FiLock, FiTrendingUp, FiBookOpen } from 'react-icons/fi';

export default function About() {
  const values = [
    {
      name: 'User-Centered',
      description: 'We design our platform with users in mind, focusing on making complex medical information accessible and actionable for everyone.',
      icon: FiUsers,
    },
    {
      name: 'Privacy & Security',
      description: 'We maintain the highest standards of data security and privacy, ensuring your health information remains confidential and protected.',
      icon: FiLock,
    },
    {
      name: 'Continuous Improvement',
      description: 'We\'re committed to constantly improving our AI systems and user experience based on the latest research and user feedback.',
      icon: FiTrendingUp,
    },
    {
      name: 'Evidence-Based',
      description: 'Our insights and recommendations are grounded in scientific evidence and medical best practices, updated as new research emerges.',
      icon: FiBookOpen,
    },
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      bio: 'Board-certified physician with over 15 years of experience in laboratory medicine and clinical diagnostics.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      bio: 'AI researcher and engineer with expertise in machine learning applications in healthcare and natural language processing.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Research',
      bio: 'PhD in Biomedical Informatics with a focus on AI applications in preventive medicine and health analytics.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'David Park',
      role: 'User Experience Director',
      bio: 'Experienced UX designer specializing in creating intuitive interfaces for complex health information systems.',
      image: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <Layout title="About Us">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-primary-600 tracking-wide uppercase">About Us</h1>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Making Healthcare More Accessible
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              We&apos;re on a mission to help people understand their health through AI-powered blood test analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-gray-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen"></div>
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div>
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Story</h2>
              <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Why We Built This Platform
              </h3>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                <figure>
                  <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                    <img
                      className="rounded-lg shadow-lg object-cover object-center"
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      alt="Medical laboratory"
                      width={1184}
                      height={1376}
                    />
                  </div>
                </figure>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="text-base max-w-prose mx-auto lg:max-w-none">
                <p className="text-lg text-gray-500">
                  Our journey began when our founder struggled to understand his own blood test results. Despite having access to the raw data, the meaning behind the numbers remained unclear.
                </p>
              </div>
              <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                <p>
                  We realized that millions of people face the same challenge: they receive blood test results but don&apos;t fully understand what they mean for their health. Medical jargon and complex reference ranges can make it difficult for non-medical professionals to interpret their results.
                </p>
                <p>
                  That&apos;s why we built this platform—to bridge the gap between raw medical data and actionable health insights. By combining advanced AI technology with medical expertise, we&apos;ve created a tool that translates complex blood test results into clear, personalized information that anyone can understand.
                </p>
                <p>
                  Our team of medical professionals, AI researchers, and user experience designers work together to ensure that our platform provides accurate, evidence-based insights while remaining accessible and easy to use.
                </p>
                <p>
                  We believe that understanding your health data is the first step toward making informed decisions about your wellbeing. Our mission is to empower people with the knowledge they need to take control of their health journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Values</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Principles that guide our work
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              These core values shape everything we do, from product development to customer support.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {values.map((value) => (
                <div key={value.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <value.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{value.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Our Team</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight">
              Meet the experts behind our platform
            </p>
            <p className="max-w-2xl mt-5 mx-auto text-xl text-gray-500">
              Our multidisciplinary team combines expertise in medicine, AI, and user experience design.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <div key={person.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img className="w-full h-48 object-cover" src={person.image} alt={person.name} />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
                  <p className="text-sm text-primary-600">{person.role}</p>
                  <p className="mt-3 text-base text-gray-500">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 