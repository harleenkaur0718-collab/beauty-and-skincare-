/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ARTICLES, Article, findArticleBySlugOrId, getArticleUrl } from './data/articles';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BlogGrid } from './components/BlogGrid';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { RoutineBuilder } from './components/RoutineBuilder';
import { SkinTypeQuiz } from './components/SkinTypeQuiz';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { HabitsDrawer } from './components/HabitsDrawer';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('glowguide_saved');
      return stored ? JSON.parse(stored) : ['blog1', 'blog2'];
    } catch {
      return ['blog1', 'blog2'];
    }
  });

  const [completedHabits, setCompletedHabits] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('glowguide_habits');
      return stored ? JSON.parse(stored) : ['habit-spf', 'habit-water'];
    } catch {
      return ['habit-spf', 'habit-water'];
    }
  });

  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isHabitsOpen, setIsHabitsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Resolves an article from current pathname or hash
  const resolveArticleFromUrl = useCallback((): Article | null => {
    // 1. Check pathname (e.g. /sunscreen or /routine)
    const rawPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    if (rawPath) {
      const found = findArticleBySlugOrId(rawPath);
      if (found) return found;
    }

    // 2. Check hash fallback (e.g. #sunscreen, #/sunscreen, #blog1)
    const rawHash = window.location.hash.replace(/^#[/]?/, '');
    if (rawHash) {
      const found = findArticleBySlugOrId(rawHash);
      if (found) return found;
    }

    // 3. Check query param (e.g. ?article=sunscreen or ?blog=sunscreen)
    const params = new URLSearchParams(window.location.search);
    const query = params.get('article') || params.get('blog') || params.get('post');
    if (query) {
      const found = findArticleBySlugOrId(query);
      if (found) return found;
    }

    return null;
  }, []);

  // Sync route on initial load and on popstate / hashchange
  useEffect(() => {
    const handleUrlSync = () => {
      const matched = resolveArticleFromUrl();
      setSelectedArticle(matched);
      if (matched) {
        document.title = `${matched.title} | GlowGuide`;
      } else {
        document.title = 'GlowGuide - Beauty & Skincare Journal';
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);

    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, [resolveArticleFromUrl]);

  // Navigate to an individual short clean URL
  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    const cleanUrl = getArticleUrl(article);
    window.history.pushState({ articleId: article.id, slug: article.slug }, '', cleanUrl);
    document.title = `${article.title} | GlowGuide`;
  };

  // Close reader and cleanly revert URL to root
  const handleCloseArticle = () => {
    setSelectedArticle(null);
    window.history.pushState({}, '', '/');
    document.title = 'GlowGuide - Beauty & Skincare Journal';
  };

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('glowguide_saved', JSON.stringify(savedArticleIds));
    } catch {
      // localStorage fallback
    }
  }, [savedArticleIds]);

  // Save habits to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('glowguide_habits', JSON.stringify(completedHabits));
    } catch {
      // localStorage fallback
    }
  }, [completedHabits]);

  const toggleBookmark = (id: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleHabit = (id: string) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleResetHabits = () => {
    setCompletedHabits([]);
  };

  const savedArticles = ARTICLES.filter((a) => savedArticleIds.includes(a.id));

  const handleOpenArticleById = (identifier: string) => {
    const found = findArticleBySlugOrId(identifier);
    if (found) {
      handleSelectArticle(found);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C1917] flex flex-col font-sans selection:bg-[#E7D6C8] selection:text-[#1C1917]">
      {/* Top 3-zone Header Navigation */}
      <Header
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsBookmarksOpen(true)}
        onOpenHabits={() => setIsHabitsOpen(true)}
        habitsCompletedCount={completedHabits.length}
        onSearchClick={() => {
          scrollToSection('blogs');
          const input = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (input) input.focus();
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('blogs')}
          onQuizClick={() => scrollToSection('skin-quiz')}
        />

        {/* 10 Blog Cards Grid with Search, Filter and Clean URLs */}
        <BlogGrid
          articles={ARTICLES}
          onSelectArticle={handleSelectArticle}
          savedArticleIds={savedArticleIds}
          onToggleBookmark={toggleBookmark}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Interactive Routine Builder */}
        <RoutineBuilder />

        {/* Skin Type Diagnostic Quiz */}
        <SkinTypeQuiz onReadArticle={handleOpenArticleById} />

        {/* About GlowGuide Section */}
        <AboutSection />

        {/* Stay Connected / Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Reader Modal for Full Articles with Clean URL permalink */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={handleCloseArticle}
          onSelectArticle={handleSelectArticle}
          allArticles={ARTICLES}
          isSaved={savedArticleIds.includes(selectedArticle.id)}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {/* Saved Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={toggleBookmark}
        onClearAll={() => setSavedArticleIds([])}
      />

      {/* Daily Habits Checklist Drawer */}
      <HabitsDrawer
        isOpen={isHabitsOpen}
        onClose={() => setIsHabitsOpen(false)}
        completedHabits={completedHabits}
        onToggleHabit={toggleHabit}
        onResetHabits={handleResetHabits}
      />
    </div>
  );
}
