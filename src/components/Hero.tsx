import React from 'react';
import { Sparkles, ArrowDown, Compass } from 'lucide-react';
import heroImg from '../assets/images/glow_skincare_hero_1791430383043.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onQuizClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onQuizClick }) => {
  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Sub-kicker & Date ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#E8E1D9] text-xs uppercase tracking-widest text-[#78716C]">
          <span>BEAUTY • SKINCARE • SELF CARE</span>
          <span className="hidden sm:inline">AUTUMN 2026 JOURNAL · VOL. 04</span>
          <span>EVIDENCE-BASED BEAUTY</span>
        </div>

        {/* Hero Grid: Typography Left, High-Res Editorial Photography Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-10">
          
          {/* Left Column: Headline and Prose */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#A3634E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mindful, Barrier-First Guidance</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1917] font-normal tracking-tight leading-[1.08] text-balance">
              Your Guide to Healthy, Glowing Skin
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl font-normal">
              Discover simple skincare routines, beauty tips and everyday habits that can help you take better care of your skin without unnecessary complexity.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#blogs"
                onClick={(e) => {
                  e.preventDefault();
                  onExploreClick();
                }}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-md transition-colors shadow-sm"
              >
                <span>Explore Articles</span>
                <ArrowDown className="w-4 h-4 ml-2" />
              </a>

              <a
                href="#skin-quiz"
                onClick={(e) => {
                  e.preventDefault();
                  onQuizClick();
                }}
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-[#1C1917] bg-[#F5EFEB] hover:bg-[#EAE2D8] border border-[#E8E1D9] rounded-md transition-colors"
              >
                <Compass className="w-4 h-4 mr-2 text-[#78716C]" />
                <span>Take Skin Type Quiz</span>
              </a>
            </div>

            {/* Editorial curatorial note */}
            <div className="pt-6 border-t border-[#E8E1D9]/70 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-serif text-[#1C1917]">10</p>
                <p className="text-xs text-[#78716C] mt-0.5 uppercase tracking-wider">Curated Articles</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif text-[#1C1917]">AM & PM</p>
                <p className="text-xs text-[#78716C] mt-0.5 uppercase tracking-wider">Routine Steps</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-serif text-[#1C1917]">0%</p>
                <p className="text-xs text-[#78716C] mt-0.5 uppercase tracking-wider">Gimmicks / Jargon</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Framing */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-[#E8E1D9] shadow-sm bg-[#F5EFEB]">
              <img
                src={heroImg}
                alt="Minimalist luxury skincare serum on travertine stone in gentle morning light"
                className="w-full h-[380px] sm:h-[440px] object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                <p className="text-xs tracking-wider uppercase opacity-80">Featured Visual</p>
                <p className="font-serif text-sm sm:text-base font-light italic text-white/95 mt-0.5">
                  "Gentle consistency will always outshine an aggressive 12-step regime."
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
