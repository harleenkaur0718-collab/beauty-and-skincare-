import React, { useState } from 'react';
import { Bookmark, Search, CheckSquare, Menu, X } from 'lucide-react';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenHabits: () => void;
  habitsCompletedCount: number;
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenHabits,
  habitsCompletedCount,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E1D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center">
            <a 
              href="#home" 
              className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1C1917] hover:opacity-90 transition-opacity"
            >
              GlowGuide
            </a>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-[#78716C]">
            <a
              href="#home"
              className="hover:text-[#1C1917] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#1C1917] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Home
            </a>
            <a
              href="#blogs"
              className="hover:text-[#1C1917] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#1C1917] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Articles
            </a>
            <a
              href="#routine-builder"
              className="hover:text-[#1C1917] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#1C1917] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Routine Builder
            </a>
            <a
              href="#skin-quiz"
              className="hover:text-[#1C1917] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#1C1917] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Skin Type Quiz
            </a>
            <a
              href="#about"
              className="hover:text-[#1C1917] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#1C1917] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-[#1C1917] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#1C1917] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onSearchClick}
              aria-label="Search articles"
              className="p-2.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5EFEB] rounded-full transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenHabits}
              aria-label="Daily skin habits checklist"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1C1917] bg-[#F5EFEB] hover:bg-[#EAE2D8] border border-[#E8E1D9] rounded-md transition-colors whitespace-nowrap"
            >
              <CheckSquare className="w-3.5 h-3.5 text-[#78716C]" />
              <span>Habits</span>
              <span className="text-[#78716C]">({habitsCompletedCount}/6)</span>
            </button>

            <button
              onClick={onOpenSaved}
              aria-label="View saved articles"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-md transition-colors whitespace-nowrap"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="text-xs bg-white/20 px-1.5 py-0.2 rounded-full tabular-nums">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#78716C] hover:text-[#1C1917] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E1D9] bg-[#FDFBF7]">
            <nav className="flex flex-col gap-3 px-2 text-sm text-[#1C1917]">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-[#F5EFEB] rounded"
              >
                Home
              </a>
              <a
                href="#blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-[#F5EFEB] rounded"
              >
                Articles
              </a>
              <a
                href="#routine-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-[#F5EFEB] rounded"
              >
                Routine Builder
              </a>
              <a
                href="#skin-quiz"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-[#F5EFEB] rounded"
              >
                Skin Type Quiz
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-[#F5EFEB] rounded"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-2 hover:bg-[#F5EFEB] rounded"
              >
                Contact
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHabits();
                }}
                className="text-left py-1.5 px-2 text-xs text-[#78716C] hover:bg-[#F5EFEB] rounded flex items-center justify-between"
              >
                <span>Daily Glow Habits</span>
                <span className="font-semibold">{habitsCompletedCount}/6 Done</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
