import React, { useState, useMemo } from 'react';
import { Article } from '../data/articles';
import { Bookmark, ArrowRight, Search, SlidersHorizontal, BookOpen } from 'lucide-react';

interface BlogGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  savedArticleIds: string[];
  onToggleBookmark: (articleId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CATEGORIES = [
  'ALL',
  'SKINCARE',
  'SUN PROTECTION',
  'CLEANSING',
  'HYDRATION',
  'SELF CARE',
  'MAKEUP',
  'SKIN TYPES',
  'LIFESTYLE',
  'BEAUTY TIPS',
];

export const BlogGrid: React.FC<BlogGridProps> = ({
  articles,
  onSelectArticle,
  savedArticleIds,
  onToggleBookmark,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        article.category.toUpperCase() === selectedCategory.toUpperCase();

      const matchesSearch =
        searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.deck.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <section id="blogs" className="py-16 md:py-24 border-b border-[#E8E1D9] bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8E1D9]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#A3634E] mb-2">
              OUR LATEST ARTICLES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight">
              Beauty & Skincare Journal
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#78716C] leading-relaxed">
              Explore evidence-based guides, mindful everyday habits, and routine breakdowns tailored to build genuine barrier resilience.
            </p>
          </div>

          {/* Search Bar Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716C]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, sunscreen, serum..."
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm bg-[#F5EFEB] border border-[#E8E1D9] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917] placeholder-[#A8A29E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#78716C] hover:text-[#1C1917]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filters (Segmented Filter Controls - Buttons with handlers) */}
        <div className="py-6 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-[#E8E1D9]/60">
          <span className="text-xs font-medium text-[#78716C] flex items-center gap-1.5 mr-2 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-[#F5EFEB] text-[#57534E] hover:text-[#1C1917] hover:bg-[#EAE2D8]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Article Counter / Active Filter Notice */}
        <div className="pt-4 pb-6 flex items-center justify-between text-xs text-[#78716C]">
          <span>
            Showing <strong className="text-[#1C1917] tabular-nums">{filteredArticles.length}</strong> of{' '}
            <span className="tabular-nums">{articles.length}</span> articles
            {selectedCategory !== 'ALL' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(selectedCategory !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="text-xs text-[#A3634E] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Grid of Blog Cards */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center bg-[#F5EFEB]/50 rounded-lg border border-dashed border-[#E8E1D9] my-6">
            <BookOpen className="w-8 h-8 mx-auto text-[#A8A29E] mb-3" />
            <h3 className="font-serif text-lg text-[#1C1917]">No articles matched your criteria</h3>
            <p className="text-xs text-[#78716C] mt-1">
              Try searching for different keywords such as "serum", "cleanse", or "sunscreen".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-[#1C1917] text-white rounded-md hover:bg-[#2C2724]"
            >
              Show all 10 articles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredArticles.map((article) => {
              const isSaved = savedArticleIds.includes(article.id);

              return (
                <article
                  key={article.id}
                  id={article.id}
                  className="group flex flex-col bg-[#FDFBF7] border border-[#E8E1D9] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#1C1917]/40 hover:shadow-sm"
                >
                  {/* Card Visual / Photography */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EFEB]">
                    <img
                      src={article.image}
                      alt={article.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Bookmark quick toggle button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(article.id);
                      }}
                      aria-label={isSaved ? 'Remove from saved' : 'Save article'}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
                        isSaved
                          ? 'bg-[#1C1917] text-white'
                          : 'bg-white/80 text-[#57534E] hover:text-[#1C1917] hover:bg-white'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Card Content & Zero-Pill Unboxed Metadata */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Quiet unboxed text metadata with typographic separator */}
                      <div className="flex items-center justify-between text-xs font-medium text-[#78716C] tracking-wider uppercase mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[#A3634E] font-semibold">{article.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.readTime}</span>
                        </div>
                        <span className="font-mono text-[11px] text-[#A8A29E] lowercase tracking-normal">
                          /{article.slug}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917] leading-snug tracking-tight group-hover:text-[#A3634E] transition-colors">
                        <a
                          href={`/${article.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelectArticle(article);
                          }}
                          className="text-left w-full block focus:outline-none"
                        >
                          {article.title}
                        </a>
                      </h3>

                      {/* Excerpt */}
                      <p className="mt-3 text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-3">
                        {article.deck}
                      </p>
                    </div>

                    {/* Footer read action */}
                    <div className="mt-6 pt-4 border-t border-[#E8E1D9]/70 flex items-center justify-between">
                      <span className="text-xs text-[#A8A29E] font-serif italic">
                        {article.author}
                      </span>

                      <a
                        href={`/${article.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectArticle(article);
                        }}
                        className="inline-flex items-center text-xs font-medium text-[#1C1917] hover:text-[#A3634E] transition-colors group/btn"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
