import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = 'AI Bloodwork Analysis' }) {
  return (
    <>
      <Head>
        <title>{title} | AI Bloodwork Analysis</title>
        <meta name="description" content="AI-powered blood test analysis and health insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
} 