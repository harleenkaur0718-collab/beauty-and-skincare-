import React, { useState } from 'react';
import { Compass, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';

interface QuizResult {
  type: string;
  tagline: string;
  description: string;
  focusIngredients: string[];
  avoidIngredients: string[];
  articleId: string;
}

const RESULTS: Record<string, QuizResult> = {
  dry: {
    type: 'Dry Skin',
    tagline: 'Deficient in natural sebum lipids and moisture retention.',
    description: 'Your skin barrier requires nourishing ceramides, rich fatty acids, and humectants to seal in hydration and prevent microscopic micro-tears.',
    focusIngredients: ['Ceramides NP/AP/EOP', 'Squalane', 'Hyaluronic Acid', 'Shea Butter', 'Colloidal Oat'],
    avoidIngredients: ['Denatured Alcohol', 'Harsh sulfates (SLS)', 'High-strength physical scrubs'],
    articleId: 'blog4',
  },
  oily: {
    type: 'Oily Skin',
    tagline: 'Hyperactive sebaceous glands producing excess daytime shine.',
    description: 'Your goal is regulating excess sebum without stripping the protective moisture barrier, which can trigger reactive rebound oiliness.',
    focusIngredients: ['Salicylic Acid (BHA)', 'Niacinamide (Vitamin B3)', 'Zinc PCA', 'Lightweight Water Gels'],
    avoidIngredients: ['Heavy mineral oils', 'Thick pore-clogging waxes', 'Aggressive alcohol toners'],
    articleId: 'blog3',
  },
  combination: {
    type: 'Combination Skin',
    tagline: 'Sebum-rich T-zone paired with normal to dry cheek contours.',
    description: 'You benefit most from zone-targeted hydration: gentle balancing cleansers and lightweight layers that hydrate cheeks without suffocating your forehead and nose.',
    focusIngredients: ['Hyaluronic Acid', 'Green Tea Extract', 'Niacinamide', 'Ceramide Gel Creams'],
    avoidIngredients: ['Heavy comodogenic oils on T-zone', 'Overly drying astringents'],
    articleId: 'blog7',
  },
  sensitive: {
    type: 'Sensitive Skin',
    tagline: 'Hyper-reactive skin barrier susceptible to environmental and topical irritation.',
    description: 'Minimalism is paramount. Stick to fragrance-free, hypoallergenic formulations with proven anti-inflammatory botanicals and barrier lipids.',
    focusIngredients: ['Centella Asiatica (Cica)', 'Panthenol (Pro-Vitamin B5)', 'Madecassoside', 'Thermal Spring Water'],
    avoidIngredients: ['Synthetic Fragrance', 'Essential Oils', 'High-concentration chemical peels'],
    articleId: 'blog7',
  },
  normal: {
    type: 'Normal / Balanced Skin',
    tagline: 'Harmonious balance of moisture and sebum with resilient barrier health.',
    description: 'Your objective is defense and preventative longevity: gentle daily cleansing, antioxidant protection, and consistent broad-spectrum SPF.',
    focusIngredients: ['Vitamin C', 'Peptides', 'Broad Spectrum SPF 50', 'Lightweight Squalane'],
    avoidIngredients: ['Overly aggressive exfoliating habits that disrupt equilibrium'],
    articleId: 'blog1',
  },
};

export const SkinTypeQuiz: React.FC<{ onReadArticle: (articleId: string) => void }> = ({
  onReadArticle,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      prompt: 'How does your skin feel 30 minutes after washing with a gentle cleanser and zero products applied?',
      options: [
        { label: 'Tight, rough, or slightly itchy with noticeable tautness', type: 'dry' },
        { label: 'Comfortable, soft, neither noticeably greasy nor tight', type: 'normal' },
        { label: 'Noticeable shine and slickness across the entire face', type: 'oily' },
        { label: 'Shiny along forehead, nose, and chin, but cheeks feel comfortable or dry', type: 'combination' },
        { label: 'Warm, flushed, prickly, or shows red blotches', type: 'sensitive' },
      ],
    },
    {
      id: 2,
      prompt: 'By 2:00 PM in the middle of a typical workday, what is your skin appearance?',
      options: [
        { label: 'Dull, parched, with makeup settling into dry fine lines', type: 'dry' },
        { label: 'Even and natural with minimal shine', type: 'normal' },
        { label: 'Very greasy; I feel like blotting or powdering my face', type: 'oily' },
        { label: 'Forehead and nose are shiny, but the rest of my face is matte', type: 'combination' },
        { label: 'Reactive or easily flushed by ambient indoor heating/cooling', type: 'sensitive' },
      ],
    },
    {
      id: 3,
      prompt: 'When you test a new active skincare serum or undergo seasonal weather shifts:',
      options: [
        { label: 'My skin quickly becomes dry, flaky, and craves moisture', type: 'dry' },
        { label: 'I rarely encounter irritation or sudden flaring', type: 'normal' },
        { label: 'My pores congest or break out with small whiteheads', type: 'oily' },
        { label: 'My T-zone gets congested while my cheeks stay dry', type: 'combination' },
        { label: 'I often experience stinging, tingling, or red blotches', type: 'sensitive' },
      ],
    },
  ];

  const handleSelectOption = (type: string) => {
    const updated = { ...answers, [currentQuestion]: type };
    setAnswers(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const getComputedResult = (): QuizResult => {
    const counts: Record<string, number> = {};
    Object.values(answers).forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    let topType = 'combination';
    let maxCount = -1;
    Object.entries(counts).forEach(([t, cnt]) => {
      if (cnt > maxCount) {
        maxCount = cnt;
        topType = t;
      }
    });

    return RESULTS[topType] || RESULTS.combination;
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsCompleted(false);
  };

  const computedResult = isCompleted ? getComputedResult() : null;

  return (
    <section id="skin-quiz" className="py-16 md:py-24 border-b border-[#E8E1D9] bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#A3634E] mb-2">
            INTERACTIVE DIAGNOSTIC · ARTICLE 7 COMPANION
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight">
            Discover Your Skin Type
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#78716C] leading-relaxed">
            Answer 3 quick observational questions based on dermatological bare-face testing to uncover your skin's foundational profile.
          </p>
        </div>

        {/* Quiz Body */}
        {!isCompleted ? (
          <div className="bg-[#F5EFEB]/50 rounded-xl p-6 sm:p-10 border border-[#E8E1D9]">
            {/* Step Progress */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#E8E1D9] text-xs text-[#78716C]">
              <span className="font-medium uppercase tracking-wider text-[#1C1917]">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-1.5">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentQuestion
                        ? 'w-6 bg-[#1C1917]'
                        : idx < currentQuestion
                        ? 'w-3 bg-[#A3634E]'
                        : 'w-3 bg-[#E8E1D9]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Prompt */}
            <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] leading-snug mb-6">
              {questions[currentQuestion].prompt}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option.type)}
                  className="w-full text-left p-4 sm:p-5 rounded-lg border border-[#E8E1D9] bg-[#FDFBF7] hover:bg-[#EAE2D8] hover:border-[#1C1917]/40 transition-all group flex items-start gap-4"
                >
                  <span className="font-mono text-xs text-[#78716C] group-hover:text-[#1C1917] mt-0.5 shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="text-sm sm:text-base text-[#292524] group-hover:text-[#1C1917] leading-relaxed">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Back button if past question 0 */}
            {currentQuestion > 0 && (
              <div className="mt-6 pt-4 border-t border-[#E8E1D9]/70">
                <button
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                  className="text-xs text-[#78716C] hover:text-[#1C1917]"
                >
                  ← Previous question
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Diagnostic Result Card */
          computedResult && (
            <div className="bg-[#FDFBF7] rounded-xl p-8 sm:p-12 border border-[#E8E1D9] shadow-sm space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E1D9]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A3634E] mb-1">
                    <Compass className="w-4 h-4" />
                    <span>Your Diagnostic Result</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917]">
                    {computedResult.type}
                  </h3>
                  <p className="text-sm font-serif italic text-[#78716C] mt-1">
                    {computedResult.tagline}
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#78716C] hover:text-[#1C1917] border border-[#E8E1D9] rounded-md hover:bg-[#F5EFEB] transition-colors self-start sm:self-center"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              <p className="text-base text-[#57534E] leading-relaxed">
                {computedResult.description}
              </p>

              {/* Ingredients Guidance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#F5EFEB] rounded-lg border border-[#E8E1D9]">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">
                    Ingredients to Favor
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#292524]">
                    {computedResult.focusIngredients.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2">
                    Ingredients to Approach with Care
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#292524]">
                    {computedResult.avoidIngredients.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-amber-700 font-bold">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onReadArticle(computedResult.articleId)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium bg-[#1C1917] text-white rounded-md hover:bg-[#2C2724] transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Recommended Article Guide</span>
                </button>

                <a
                  href="#routine-builder"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1C1917] bg-[#F5EFEB] hover:bg-[#EAE2D8] border border-[#E8E1D9] rounded-md transition-colors"
                >
                  <span>Build Routine for {computedResult.type}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )
        )}

      </div>
    </section>
  );
};
