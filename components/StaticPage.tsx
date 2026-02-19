
import React from 'react';
import { InfoPageType } from '../types';

interface StaticPageProps {
  type: InfoPageType;
  onNavigateHome: () => void;
}

const StaticPage: React.FC<StaticPageProps> = ({ type, onNavigateHome }) => {
  const renderContent = () => {
    switch (type) {
      case 'contact':
      case 'ticket':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Contact Support</h1>
            <p className="text-gray-400">Need help with your order? Our support team is available 24/7.</p>
            <form className="max-w-xl space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold mb-2">Your Email</label>
                <input type="email" className="w-full bg-[#0a0c2e] border border-gray-700 rounded-lg p-3 focus:border-amber-500 outline-none" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Subject</label>
                <input type="text" className="w-full bg-[#0a0c2e] border border-gray-700 rounded-lg p-3 focus:border-amber-500 outline-none" placeholder="Order Issue, Key Activation, etc." />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea className="w-full bg-[#0a0c2e] border border-gray-700 rounded-lg p-3 h-32 focus:border-amber-500 outline-none" placeholder="Describe your issue in detail..."></textarea>
              </div>
              <button className="bg-amber-500 text-[#04051a] font-bold py-3 px-8 rounded-lg hover:bg-amber-400 transition-colors uppercase tracking-widest">
                Submit Ticket
              </button>
            </form>
          </div>
        );
      case 'terms':
        return (
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <section>
                <h3 className="text-white font-bold text-xl mb-2">1. Acceptance of Terms</h3>
                <p>By accessing RoyalKeys, you agree to be bound by these Terms and Conditions and all applicable laws and regulations.</p>
              </section>
              <section>
                <h3 className="text-white font-bold text-xl mb-2">2. License Delivery</h3>
                <p>Digital keys are delivered via email immediately after payment verification. We are not responsible for keys sent to incorrect email addresses provided by the user.</p>
              </section>
              <section>
                <h3 className="text-white font-bold text-xl mb-2">3. Usage Restrictions</h3>
                <p>Keys are for personal or specified commercial use only. Reselling or unauthorized distribution of our digital products is strictly prohibited.</p>
              </section>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>At RoyalKeys, your privacy is our top priority. We collect only the information necessary to process your orders and provide support.</p>
              <h3 className="text-white font-bold text-xl mb-2">Information We Collect</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Email address for digital delivery.</li>
                <li>Payment details processed securely via our partners.</li>
                <li>Device information for security and anti-fraud purposes.</li>
              </ul>
            </div>
          </div>
        );
      case 'refunds':
        return (
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-8">Returns & Refunds</h1>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>Due to the digital nature of our products, refunds are only issued under specific conditions:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The digital key is proven to be invalid or already used upon delivery.</li>
                <li>The product is out of stock and we cannot fulfill the order within 24 hours.</li>
                <li>Double payments made by mistake.</li>
              </ul>
              <p className="bg-red-500/10 border-l-4 border-red-500 p-4 text-red-200">
                Note: No refunds will be issued once a digital key has been revealed or activated.
              </p>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
            <div className="space-y-4">
              {[
                { q: "How long does delivery take?", a: "Most keys are delivered instantly. During peak times, it may take up to 10 minutes." },
                { q: "Are the keys genuine?", a: "Yes, all our keys are sourced directly from authorized distributors and are 100% genuine." },
                { q: "What if my key doesn't work?", a: "Please contact our 24/7 support immediately with a screenshot of the error." },
                { q: "Can I use the key in any country?", a: "Check the 'Region' tag on the product page before purchasing. Some keys are region-locked." }
              ].map((faq, i) => (
                <div key={i} className="bg-[#0a0c2e] border border-gray-800 p-6 rounded-xl">
                  <h3 className="text-white font-bold mb-2 text-lg">{faq.q}</h3>
                  <p className="text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'activation':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">How to Activate Your Key</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0a0c2e] border border-gray-800 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-amber-500 text-[#04051a] rounded-full flex items-center justify-center font-bold mb-4">1</div>
                <h3 className="text-white font-bold text-xl mb-4">Windows / Office</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-400">
                  <li>Go to Settings > System > Activation</li>
                  <li>Click 'Change Product Key'</li>
                  <li>Enter the code sent to your email</li>
                  <li>Follow the prompts to finish activation</li>
                </ol>
              </div>
              <div className="bg-[#0a0c2e] border border-gray-800 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-amber-500 text-[#04051a] rounded-full flex items-center justify-center font-bold mb-4">2</div>
                <h3 className="text-white font-bold text-xl mb-4">Steam / Gaming</h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-400">
                  <li>Launch the Steam client</li>
                  <li>Click 'Games' at the top</li>
                  <li>Choose 'Activate a Product on Steam'</li>
                  <li>Enter your key and click 'Activate'</li>
                </ol>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
      <button 
        onClick={onNavigateHome}
        className="text-gray-400 hover:text-amber-500 transition-colors mb-8 flex items-center gap-2"
      >
        <i className="fas fa-arrow-left"></i>
        Back to Home
      </button>
      <div className="bg-[#04051a] rounded-2xl shadow-xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default StaticPage;
