
import React from 'react';
import { InfoPageType } from '../types';

interface FooterProps {
  onLinkClick: (type: InfoPageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  return (
    <footer className="bg-[#020314] pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <h4 className="font-bold text-gray-100 mb-6 uppercase text-sm tracking-wider">About Royal CD Keys</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><button onClick={() => onLinkClick('contact')} className="hover:text-amber-500 transition-colors text-left">Contact us</button></li>
            <li><button onClick={() => onLinkClick('terms')} className="hover:text-amber-500 transition-colors text-left">Terms & Conditions</button></li>
            <li><button onClick={() => onLinkClick('privacy')} className="hover:text-amber-500 transition-colors text-left">Privacy Policy</button></li>
            <li><button onClick={() => onLinkClick('refunds')} className="hover:text-amber-500 transition-colors text-left">Returns & Refunds</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-100 mb-6 uppercase text-sm tracking-wider">Help</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><button onClick={() => onLinkClick('ticket')} className="hover:text-amber-500 transition-colors text-left">Create a ticket</button></li>
            <li><button onClick={() => onLinkClick('faq')} className="hover:text-amber-500 transition-colors text-left">FAQ</button></li>
            <li><button onClick={() => onLinkClick('activation')} className="hover:text-amber-500 transition-colors text-left">How to activate your product key?</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-100 mb-6 uppercase text-sm tracking-wider">Follow us!</h4>
          <div className="flex gap-4 text-gray-400 text-lg">
            <i className="fab fa-instagram hover:text-amber-500 cursor-pointer"></i>
            <i className="fab fa-youtube hover:text-amber-500 cursor-pointer"></i>
            <i className="fab fa-tiktok hover:text-amber-500 cursor-pointer"></i>
            <i className="fab fa-x-twitter hover:text-amber-500 cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-8 border-t border-gray-900 flex flex-wrap justify-between items-center gap-4 text-xs text-gray-500">
        <p>Copyright RoyalCDKeys.com © 2024, all rights reserved</p>
        <button 
          onClick={() => onLinkClick('faq')}
          className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600/30 transition-all"
        >
          <i className="fas fa-question-circle"></i>
          Aide
        </button>
      </div>
    </footer>
  );
};

export default Footer;
