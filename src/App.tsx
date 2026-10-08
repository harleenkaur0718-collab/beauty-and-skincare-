/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ARTICLES, Article } from './data/articles';
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

  // Handle URL hash on initial load or change (e.g. #blog1, #blog2...)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('blog')) {
        const found = ARTICLES.find((a) => a.id === hash);
        if (found) {
          setSelectedArticle(found);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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

  const handleOpenArticleById = (articleId: string) => {
    const found = ARTICLES.find((a) => a.id === articleId);
    if (found) {
      setSelectedArticle(found);
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

        {/* 10 Blog Cards Grid with Search and Filter */}
        <BlogGrid
          articles={ARTICLES}
          onSelectArticle={(article) => {
            setSelectedArticle(article);
            window.location.hash = article.id;
          }}
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

      {/* Reader Modal for Full Articles */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={() => {
            setSelectedArticle(null);
            // reset hash without jump
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }}
          onSelectArticle={(article) => {
            setSelectedArticle(article);
            window.location.hash = article.id;
          }}
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
        onSelectArticle={(article) => {
          setSelectedArticle(article);
          window.location.hash = article.id;
        }}
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
