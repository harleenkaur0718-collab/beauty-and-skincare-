import React, { useState } from 'react';
import { ArrowUp, Mail, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FDFBF7] border-t border-[#E8E1D9] text-[#1C1917] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & Brand banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-[#E8E1D9]">
          
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917]">
              GlowGuide
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#A3634E] font-medium">
              Beauty • Skincare • Self Care
            </p>
            <p className="text-sm text-[#57534E] max-w-sm leading-relaxed">
              An evidence-based beauty journal committed to demystifying formulations and empowering realistic daily habits.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#F5EFEB] p-6 sm:p-8 rounded-xl border border-[#E8E1D9]">
            <h4 className="font-serif text-xl sm:text-2xl text-[#1C1917]">
              Receive The Weekly Glow
            </h4>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1 mb-4 leading-relaxed">
              Curated Sunday readings on barrier preservation, ingredient breakdowns, and seasonal routine adjustments.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded-md border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You're subscribed! Welcome to the GlowGuide community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9.5 pr-3 py-2 text-xs sm:text-sm bg-[#FDFBF7] border border-[#E8E1D9] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-medium bg-[#1C1917] text-white rounded-md hover:bg-[#2C2724] transition-colors whitespace-nowrap"
                >
                  Join Letter
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Links & Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#78716C]">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#home" className="hover:text-[#1C1917] transition-colors">Home</a>
            <a href="#blogs" className="hover:text-[#1C1917] transition-colors">Articles</a>
            <a href="#routine-builder" className="hover:text-[#1C1917] transition-colors">Routine Builder</a>
            <a href="#skin-quiz" className="hover:text-[#1C1917] transition-colors">Skin Quiz</a>
            <a href="#about" className="hover:text-[#1C1917] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#1C1917] transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <p>© 2026 GlowGuide. All Rights Reserved.</p>
            <button
              onClick={scrollToTop}
              title="Return to top"
              className="p-1.5 rounded-full hover:bg-[#F5EFEB] text-[#78716C] hover:text-[#1C1917] transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
