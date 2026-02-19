
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/gemini';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your RoyalKeys Assistant. Looking for a specific software key or game recommendation?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getGeminiResponse(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response || 'I am sorry, something went wrong.' }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-amber-500 rounded-full shadow-2xl flex items-center justify-center text-[#04051a] text-2xl hover:scale-110 transition-transform active:scale-95"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-48px)] h-[500px] bg-[#0a0c2e] border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-amber-500 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-[#04051a]">
              <i className="fas fa-crown"></i>
            </div>
            <div>
              <h4 className="font-bold text-[#04051a]">Royal Assistant</h4>
              <p className="text-[#04051a]/70 text-xs">Powered by Gemini AI</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-amber-500 text-[#04051a] rounded-tr-none' : 'bg-[#1a1c3e] text-white rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1a1c3e] p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="w-full bg-[#1a1c3e] border border-gray-700 rounded-full py-2 px-4 pr-10 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-400"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
