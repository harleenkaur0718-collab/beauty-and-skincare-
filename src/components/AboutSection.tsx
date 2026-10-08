import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Feather } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-[#E8E1D9] bg-[#FDFBF7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        
        {/* Section Header with exact label and heading from prompt */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#A3634E] mb-2">
            ABOUT GLOWGUIDE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight">
            Beauty Made Simple
          </h2>
          <p className="mt-6 text-base sm:text-xl text-[#57534E] font-serif italic leading-relaxed">
            "GlowGuide is a beauty and skincare blog created to make skincare information simple, practical and easy to understand. Our goal is to help readers build realistic beauty routines without unnecessary complexity."
          </p>
        </div>

        {/* Curatorial Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-10 border-t border-[#E8E1D9]">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#A3634E] mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1917]">Barrier-First Philosophy</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              We prioritize intercellular lipid health and the natural acid mantle over harsh resurfacing or excessive active ingredient combinations.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#1C1917] mx-auto sm:mx-0">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1917]">Essentialist Formulations</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Every recommended product and ritual earns its place on your counter. No gratuitous 12-step shelfies that overwhelm your skin or your schedule.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EFEB] flex items-center justify-center text-[#A3634E] mx-auto sm:mx-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1917]">Transparent & Grounded</h3>
            <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed">
              No sponsored miracle jargon or exaggerated claims. Just honest, practical dermatological education for women and men of every skin tone.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
