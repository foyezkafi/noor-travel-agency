import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, ChevronUp, Bot, Sparkles } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Assalamu Alaikum! Hazrat, I am Mohammad Shafiur, your Noor Travel BD personal assistant. How can we facilitate your Haj & Umrah plans today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '🕋 Makkah Hotel Distance?', value: 'makkah hotel distance' },
    { label: '🍛 Bangladeshi Deshi Food?', value: 'deshi food details' },
    { label: '✈️ Biman Flight baggage?', value: 'baggage weight policy' },
    { label: '👶 Children discounts?', value: 'child pricing discount' }
  ];

  // Contextual reply dictionary logic
  const getContextualReply = (text: string): string => {
    const q = text.toLowerCase();
    
    if (q.includes('distance') || q.includes('hotel') || q.includes('hotel distance')) {
      return 'For VIP & Premium packages, our hotels (Pullman ZamZam, Swissôtel) are situated 50 to 150 meters from the Haram gates. For Economy packages, hotels are 600m off but backed by non-stop dedicated 24/7 complimentary shuttle services!';
    }
    if (q.includes('food') || q.includes('cook') || q.includes('deshi')) {
      return 'Alhamdulillah, yes! We have dedicated Bangladeshi cooks and kitchens in Saudi Arabia for our group. You will get traditional deshi rice, dal, Hilsha/Rui fish curries, chicken, and fresh local vegetables daily for Sehri, Iftar and regular meals!';
    }
    if (q.includes('baggage') || q.includes('flight') || q.includes('luggage') || q.includes('weight')) {
      return 'On Biman Bangladesh and Saudia direct flights, pilgrims get a standard allowance of 2 bags total of 46 / 30kg, plus 7kg cabin hand bag, and free 5 Liters of blessed Zamzam water box delivered direct at Dhaka airport!';
    }
    if (q.includes('child') || q.includes('infant') || q.includes('children') || q.includes('discount')) {
      return 'Yes! We offer up to 25% discount for children under 11 years (sharing parent bedroom configuration without extra bed) and custom rates for infants under 2 years. Contact Kakrail branch for custom pricing!';
    }
    if (q.includes('price') || q.includes('bdt') || q.includes('cost') || q.includes('package')) {
      return 'Our Umrah packages start from BDT 165,000 all-inclusive, and Hajj packages start from BDT 540,000. Registration is going on with standard flexible payment terms. No hidden charges guaranteed!';
    }
    if (q.includes('contact') || q.includes('office') || q.includes('where') || q.includes('dhaka')) {
      return 'Our Dhaka Head Office is at House 12/B, Road 4, Kakrail, Dhaka (Opposite of Kakrail Mosque). Open Saturday to Thursday, 9:00 AM to 8:00 PM. Call us at +880 1712-345678!';
    }
    if (q.includes('visa') || q.includes('e-visa')) {
      return 'We process Saudi tourist and pilgrim Umrah e-visas from Bangladesh in as fast as 24-48 hours. Passports must have at least 6 months validity.';
    }

    return "Jazakallah Khair for inquiring. I have notified our senior Haj Moallim regarding your question. In the meantime, you can leave your phone number or call us directly at +880 1712-345678 for instant clarification!";
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulated typing effect for human feel
    setTimeout(() => {
      const botReplyText = getContextualReply(textToSend);
      const botMsg: Message = {
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none" id="pilgrim-chat-widget">
      
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-4 bg-brand-green hover:bg-brand-green/95 text-white rounded-full shadow-2xl transition duration-300 transform scale-100 hover:scale-105 active:scale-95 border-2 border-brand-gold relative group cursor-pointer"
        >
          {/* Glowing pulse notifier */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold font-sans animate-pulse">1</span>
          
          <MessageSquare size={22} className="text-brand-gold animate-bounce-slow" />
          <span className="text-sm font-bold tracking-wide hidden sm:inline text-white">Ask Shafiur</span>
        </button>
      )}

      {/* Floating Chat Portal */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-white rounded-3xl overflow-hidden border border-brand-gold/35 shadow-2xl flex flex-col justify-between animate-fade-in">
          
          {/* Chat Header */}
          <div className="bg-brand-green p-4 text-white flex justify-between items-center border-b-2 border-brand-gold shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-gold/30 flex items-center justify-center border border-brand-gold">
                  <span className="text-brand-gold text-lg">🧔</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-brand-green rounded-full"></span>
              </div>
              <div>
                <h4 className="text-xs font-black text-brand-gold tracking-wide uppercase flex items-center gap-1">
                  <span>Haji Shafiur Rahman</span>
                  <Sparkles size={11} className="animate-pulse" />
                </h4>
                <p className="text-[10px] text-white/70 font-semibold">Senior Moallim & Group Leader</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 px-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Messages List (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50 bg-[radial-gradient(#e5b224_0.2px,transparent_0.2px)] bg-[size:10px_10px]">
            {messages.map((m, idx) => {
              const isBot = m.sender === 'bot';
              
              return (
                <div key={idx} className={`flex items-start gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {isBot && (
                    <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30 text-xs text-brand-darkgold mt-1 shrink-0">
                      🕌
                    </div>
                  )}
                  <div className={`max-w-[75%] p-3.5 rounded-2xl text-[11.5px] leading-relaxed shadow-xs font-sans ${
                    isBot 
                      ? 'bg-white text-gray-800 rounded-tl-xs border border-gray-100' 
                      : 'bg-brand-green text-white rounded-tr-xs'
                  }`}>
                    <p>{m.text}</p>
                    <span className={`block text-[9px] mt-1 text-right font-medium ${isBot ? 'text-gray-400' : 'text-white/60'}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30 text-xs shrink-0">
                  💬
                </div>
                <div className="bg-white text-gray-400 rounded-2xl p-3 text-xs italic tracking-wide rounded-tl-xs flex items-center gap-1 border border-gray-100">
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions suggestion pills */}
          <div className="p-2.5 bg-white border-t border-gray-100 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(p.value)}
                className="flex-shrink-0 px-2.5 py-1.5 bg-gray-50 hover:bg-brand-lightgold text-[10px] font-bold text-gray-700 hover:text-brand-green border border-gray-200 hover:border-brand-gold rounded-lg transition cursor-pointer select-none"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Text Input Panel */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Type your message (e.g. food, price)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold transition"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              className="p-2.5 bg-brand-green hover:bg-brand-green/95 text-white rounded-xl shadow-md cursor-pointer"
            >
              <Send size={14} className="text-brand-gold" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
