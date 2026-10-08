import React, { useState, useEffect } from 'react';
import { Article } from '../data/articles';
import {
  X,
  Bookmark,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Sparkles,
  Type
} from 'lucide-react';

interface ArticleReaderModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
  isSaved: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  allArticles,
  isSaved,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Track scroll progress inside the reader
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(Math.min(100, Math.max(0, progress)));
  };

  if (!article) return null;

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-center items-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#FDFBF7] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-[#E8E1D9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Reading Progress Bar */}
        <div className="w-full bg-[#E8E1D9] h-1">
          <div
            className="bg-[#A3634E] h-1 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E1D9] bg-[#FDFBF7]/90 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#78716C]">
            <span className="text-[#A3634E] font-semibold">{article.category}</span>
            <span>·</span>
            <span>ARTICLE {article.number} OF {allArticles.length}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Font size toggle */}
            <button
              onClick={() => setLargeText(!largeText)}
              title="Toggle reading text size"
              className={`p-2 rounded-md border border-[#E8E1D9] transition-colors ${
                largeText ? 'bg-[#1C1917] text-white' : 'bg-[#F5EFEB] text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Type className="w-4 h-4" />
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              title={isSaved ? 'Saved in reading list' : 'Save article'}
              className={`p-2 rounded-md border border-[#E8E1D9] transition-colors ${
                isSaved ? 'bg-[#1C1917] text-white' : 'bg-[#F5EFEB] text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              title="Copy link"
              className="p-2 rounded-md border border-[#E8E1D9] bg-[#F5EFEB] text-[#78716C] hover:text-[#1C1917] transition-colors relative"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close reader"
              className="p-2 rounded-md border border-[#E8E1D9] bg-[#F5EFEB] text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE2D8] transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div
          onScroll={handleScroll}
          className="overflow-y-auto px-6 sm:px-10 lg:px-16 py-8 sm:py-12 space-y-10 focus:outline-none"
        >
          {/* Article Header */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#78716C]">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span>·</span>
              <span className="font-serif italic">{article.author}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight leading-[1.12]">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] font-normal leading-relaxed">
              {article.deck}
            </p>
          </div>

          {/* Article Hero Media */}
          <div className="max-w-3xl mx-auto rounded-lg overflow-hidden border border-[#E8E1D9]">
            <img
              src={article.image}
              alt={article.alt}
              className="w-full max-h-[420px] object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-[#F5EFEB] border-t border-[#E8E1D9] text-xs text-[#78716C] font-serif italic text-center">
              Figure {article.number} · {article.alt}
            </div>
          </div>

          {/* Key Takeaways Callout */}
          <div className="max-w-2xl mx-auto p-5 sm:p-6 bg-[#F5EFEB] rounded-lg border border-[#E8E1D9]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A3634E] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Key Takeaways</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#1C1917] leading-relaxed">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#A3634E] font-serif font-bold text-base leading-none mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Sections */}
          <div className={`max-w-2xl mx-auto space-y-8 ${largeText ? 'text-lg' : 'text-base'}`}>
            {article.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] pt-4 border-t border-[#E8E1D9]/60">
                    {section.heading}
                  </h2>
                )}

                {section.subheading && (
                  <h3 className="font-serif text-xl text-[#292524] italic">
                    {section.subheading}
                  </h3>
                )}

                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className={`text-[#292524] leading-relaxed ${
                      sIdx === 0 && pIdx === 0 ? 'drop-cap' : ''
                    }`}
                  >
                    {p}
                  </p>
                ))}

                {/* Lists rendering if present */}
                {section.listItems && (
                  <div className="my-6 space-y-3 bg-[#FDFBF7] p-5 sm:p-6 rounded-lg border border-[#E8E1D9]">
                    {section.listType === 'ordered' ? (
                      <ol className="space-y-3.5">
                        {section.listItems.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3.5 text-sm sm:text-base">
                            <span className="font-serif font-semibold text-[#A3634E] text-base tabular-nums shrink-0 mt-0.5">
                              0{itemIdx + 1}.
                            </span>
                            <div className="space-y-0.5">
                              {item.title && (
                                <strong className="text-[#1C1917] font-medium block">
                                  {item.title}
                                </strong>
                              )}
                              <span className="text-[#57534E]">{item.text}</span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="space-y-3.5">
                        {section.listItems.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3 text-sm sm:text-base">
                            <span className="text-[#A3634E] text-lg leading-none shrink-0 mt-1">
                              —
                            </span>
                            <div className="space-y-0.5">
                              {item.title && (
                                <strong className="text-[#1C1917] font-medium block">
                                  {item.title}
                                </strong>
                              )}
                              <span className="text-[#57534E]">{item.text}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </section>
            ))}

            {/* Editorial Pull Quote */}
            {article.quote && (
              <blockquote className="my-8 py-6 px-6 border-l-2 border-[#A3634E] bg-[#F5EFEB]/50 rounded-r-lg">
                <p className="font-serif italic text-xl sm:text-2xl text-[#1C1917] leading-snug">
                  "{article.quote}"
                </p>
                <cite className="block mt-2 text-xs uppercase tracking-wider text-[#78716C] not-italic">
                  — GlowGuide Curatorial Recommendation
                </cite>
              </blockquote>
            )}
          </div>

          {/* Reader Footer Navigation */}
          <div className="max-w-2xl mx-auto pt-8 border-t border-[#E8E1D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevArticle ? (
              <button
                onClick={() => onSelectArticle(prevArticle)}
                className="w-full sm:w-auto text-left group p-3 rounded-lg border border-[#E8E1D9] hover:bg-[#F5EFEB] transition-colors"
              >
                <div className="flex items-center text-xs text-[#78716C] mb-1">
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                  <span>Previous Article</span>
                </div>
                <p className="font-serif text-sm text-[#1C1917] group-hover:text-[#A3634E] transition-colors line-clamp-1">
                  {prevArticle.title}
                </p>
              </button>
            ) : (
              <div />
            )}

            {nextArticle ? (
              <button
                onClick={() => onSelectArticle(nextArticle)}
                className="w-full sm:w-auto text-right group p-3 rounded-lg border border-[#E8E1D9] hover:bg-[#F5EFEB] transition-colors ml-auto"
              >
                <div className="flex items-center justify-end text-xs text-[#78716C] mb-1">
                  <span>Next Article</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
                <p className="font-serif text-sm text-[#1C1917] group-hover:text-[#A3634E] transition-colors line-clamp-1">
                  {nextArticle.title}
                </p>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
