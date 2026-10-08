import React from 'react';
import { Article } from '../data/articles';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l border-[#E8E1D9] animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E8E1D9] bg-[#FDFBF7] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#A3634E] font-semibold">
              <Bookmark className="w-3.5 h-3.5" />
              <span>SAVED READING LIST</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1C1917] mt-0.5">
              Saved Articles ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-md hover:bg-[#F5EFEB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Articles List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 text-[#78716C] space-y-3">
              <Bookmark className="w-8 h-8 mx-auto text-[#A8A29E] stroke-1" />
              <p className="font-serif text-lg text-[#1C1917]">Your reading list is empty</p>
              <p className="text-xs max-w-xs mx-auto">
                Click the bookmark icon on any article card to save tips, routines, and guides for offline reference.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 rounded-lg border border-[#E8E1D9] bg-[#FDFBF7] hover:border-[#1C1917]/30 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#78716C] mb-1">
                    <span className="text-[#A3634E] font-semibold">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="font-serif text-base text-[#1C1917] leading-snug line-clamp-2">
                    {article.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E8E1D9]/60">
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="inline-flex items-center gap-1 text-xs text-[#A8A29E] hover:text-rose-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectArticle(article);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#1C1917] hover:text-[#A3634E] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-[#E8E1D9] bg-[#FDFBF7] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-[#78716C] hover:text-rose-700 transition-colors"
            >
              Clear all bookmarks
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium bg-[#1C1917] text-white rounded-md hover:bg-[#2C2724] transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
