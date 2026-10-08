import React, { useState } from 'react';
import { Sun, Moon, Check, Copy, CheckCircle2, RotateCcw } from 'lucide-react';

type SkinType = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';
type SkinGoal = 'barrier' | 'glow' | 'clarifying' | 'calming';

interface RoutineStep {
  step: number;
  category: string;
  name: string;
  instruction: string;
  ingredients: string;
}

export const RoutineBuilder: React.FC = () => {
  const [skinType, setSkinType] = useState<SkinType>('combination');
  const [goal, setGoal] = useState<SkinGoal>('barrier');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Dynamic Routine Generation
  const getRoutine = (type: SkinType, g: SkinGoal): { am: RoutineStep[]; pm: RoutineStep[] } => {
    // AM Steps
    const amCleanse: Record<SkinType, RoutineStep> = {
      normal: {
        step: 1,
        category: 'Cleanse',
        name: 'Gentle Hydrating Cleanser',
        instruction: 'Wash with lukewarm water to remove overnight natural secretions.',
        ingredients: 'Glycerin, Amino Acid Surfactants',
      },
      dry: {
        step: 1,
        category: 'Cleanse',
        name: 'Milky Conditioning Cleanse',
        instruction: 'Use a lotion-style cleanser or simple lukewarm water splash.',
        ingredients: 'Squalane, Ceramides, Oat Flour',
      },
      oily: {
        step: 1,
        category: 'Cleanse',
        name: 'Purifying Gel Cleanser',
        instruction: 'Lather for 45 seconds targeting nose, forehead, and chin.',
        ingredients: 'Low-dose Salicylic Acid, Zinc PCA',
      },
      combination: {
        step: 1,
        category: 'Cleanse',
        name: 'Balanced Gel-to-Foam Cleanse',
        instruction: 'Gently massage without over-stripping cheeks.',
        ingredients: 'Green Tea Extract, Glycerin',
      },
      sensitive: {
        step: 1,
        category: 'Cleanse',
        name: 'Hypoallergenic Soothing Milk',
        instruction: 'Non-foaming rinse with minimal friction.',
        ingredients: 'Colloidal Oatmeal, Allantoin',
      },
    };

    const amSerum: Record<SkinGoal, RoutineStep> = {
      barrier: {
        step: 2,
        category: 'Treat',
        name: 'Multi-Hyaluronic & Peptide Serum',
        instruction: 'Press 3-4 drops into damp skin for immediate cellular hydration.',
        ingredients: 'Multi-weight Hyaluronic Acid, Tripeptides',
      },
      glow: {
        step: 2,
        category: 'Treat',
        name: 'Antioxidant Vitamin C 10% Complex',
        instruction: 'Smooth gently over face and neck to neutralize free radicals.',
        ingredients: 'L-Ascorbic Acid or Ascorbyl Glucoside, Ferulic Acid',
      },
      clarifying: {
        step: 2,
        category: 'Treat',
        name: 'Niacinamide 5% Pore Balancing Fluid',
        instruction: 'Regulates surface sebum and strengthens vascular walls.',
        ingredients: 'Niacinamide (Vitamin B3), Zinc PCA',
      },
      calming: {
        step: 2,
        category: 'Treat',
        name: 'Centella Asiatica (Cica) Recovery Serum',
        instruction: 'Dabs directly onto sensitive red patches to soothe inflammation.',
        ingredients: 'Madecassoside, Panthenol (B5)',
      },
    };

    const amMoisturizer: Record<SkinType, RoutineStep> = {
      normal: {
        step: 3,
        category: 'Moisturize',
        name: 'Silk Barrier Cream',
        instruction: 'Lightweight lotion preserving water retention through the afternoon.',
        ingredients: 'Ceramide NP, Squalane',
      },
      dry: {
        step: 3,
        category: 'Moisturize',
        name: 'Rich Replenishing Emulsion',
        instruction: 'Warm between fingers and press firmly into parched areas.',
        ingredients: 'Shea Butter, Ceramides 1, 3, 6-II',
      },
      oily: {
        step: 3,
        category: 'Moisturize',
        name: 'Oil-Free Water Gel',
        instruction: 'Ultra-light hydration that absorbs instantly with zero shine.',
        ingredients: 'Sodium Hyaluronate, Birch Sap',
      },
      combination: {
        step: 3,
        category: 'Moisturize',
        name: 'Dual-Zone Hydration Gel-Cream',
        instruction: 'Light on T-zone, more generous on cheekbones.',
        ingredients: 'Ceramides, Jojoba Esters',
      },
      sensitive: {
        step: 3,
        category: 'Moisturize',
        name: 'Barrier Defense Balm',
        instruction: 'Zero essential oils, fragrance, or irritants.',
        ingredients: 'Panthenol 5%, Madecassoside',
      },
    };

    const amSunscreen: RoutineStep = {
      step: 4,
      category: 'Protect',
      name: 'Broad Spectrum SPF 50+ Invisible Shield',
      instruction: 'Apply two full finger-lengths generously. Reapply when outdoors.',
      ingredients: 'Zinc Oxide or Modern Chemical Filters, Tocopherol',
    };

    // PM Steps
    const pmCleanse: RoutineStep = {
      step: 1,
      category: 'Cleanse',
      name: 'Gentle Double Cleanse Ritual',
      instruction: 'First dissolve SPF/makeup with oil or balm; follow with gentle water-based wash.',
      ingredients: 'Caprylic Triglyceride, Jojoba Seed Oil, Mild Surfactants',
    };

    const pmTreat: Record<SkinGoal, RoutineStep> = {
      barrier: {
        step: 2,
        category: 'Repair',
        name: 'Barrier Lipid Restorative Serum',
        instruction: 'Feeds the lipid matrix with natural biomimetic components.',
        ingredients: 'Ceramides, Cholesterol, Free Fatty Acids (3:1:1 ratio)',
      },
      glow: {
        step: 2,
        category: 'Renew',
        name: 'Gentle Overnight Resurfacing Fluid',
        instruction: 'Lactic Acid (AHA) or Low-Dose Retinoid 2-3 nights per week.',
        ingredients: 'Lactic Acid 5%, Licorice Root Extract',
      },
      clarifying: {
        step: 2,
        category: 'Clarify',
        name: 'Salicylic Acid (BHA 2%) Overnight Liquid',
        instruction: 'Penetrates oil-lined pores to clear congestion without abrasion.',
        ingredients: 'Salicylic Acid 2%, Green Tea',
      },
      calming: {
        step: 2,
        category: 'Soothe',
        name: 'Intensive Calming Overnight Concentrate',
        instruction: 'Relieves environmental redness and re-balances surface microbiome.',
        ingredients: 'Bifida Ferment Lysate, Colloidal Oat, Ectoin',
      },
    };

    const pmMoisturize: RoutineStep = {
      step: 3,
      category: 'Nourish',
      name: 'Overnight Barrier Renewal Cream',
      instruction: 'Seals active ingredients and prevents transepidermal water loss while sleeping.',
      ingredients: 'Phytosterols, Ceramides, Hyaluronic Acid',
    };

    const pmSpecial: RoutineStep = {
      step: 4,
      category: 'Rest',
      name: 'Restorative Sleep & Hydration',
      instruction: 'Allow skin 7-8 hours of uninterrupted rest in a cool, ventilated room.',
      ingredients: 'Cellular recovery & Circadian skin repair',
    };

    return {
      am: [amCleanse[type], amSerum[g], amMoisturizer[type], amSunscreen],
      pm: [pmCleanse, pmTreat[g], pmMoisturize, pmSpecial],
    };
  };

  const routine = getRoutine(skinType, goal);

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepKey) ? prev.filter((k) => k !== stepKey) : [...prev, stepKey]
    );
  };

  const handleCopyRoutine = () => {
    const text = `GlowGuide Personalized Routine (${skinType.toUpperCase()} Skin · Focus: ${goal.toUpperCase()})\n\n` +
      `--- MORNING (AM) ---\n` +
      routine.am.map((s) => `${s.step}. [${s.category}] ${s.name}: ${s.instruction}`).join('\n') +
      `\n\n--- EVENING (PM) ---\n` +
      routine.pm.map((s) => `${s.step}. [${s.category}] ${s.name}: ${s.instruction}`).join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="routine-builder" className="py-16 md:py-24 border-b border-[#E8E1D9] bg-[#F5EFEB]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#A3634E] mb-2">
            INTERACTIVE BUILDER · BLOG 1 & 10 COMPANION
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight">
            Design Your Personalized Daily Routine
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#78716C] leading-relaxed">
            Select your skin profile and primary focus below. We will formulate an intentional, 4-step morning and evening ritual based on proven dermatological steps.
          </p>
        </div>

        {/* Controls: Skin Type & Primary Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 p-6 sm:p-8 bg-[#FDFBF7] rounded-xl border border-[#E8E1D9]">
          
          {/* 1. Skin Type Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
              1. Your Skin Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['normal', 'dry', 'oily', 'combination', 'sensitive'] as SkinType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSkinType(type)}
                  className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors capitalize ${
                    skinType === type
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'bg-[#FDFBF7] text-[#57534E] border-[#E8E1D9] hover:bg-[#F5EFEB]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Primary Goal Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-3">
              2. Primary Focus
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'barrier', label: 'Barrier & Hydration' },
                { id: 'glow', label: 'Radiance & Glow' },
                { id: 'clarifying', label: 'Pore Clarifying' },
                { id: 'calming', label: 'Soothing & Redness' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setGoal(item.id as SkinGoal)}
                  className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                    goal === item.id
                      ? 'bg-[#1C1917] text-white border-[#1C1917]'
                      : 'bg-[#FDFBF7] text-[#57534E] border-[#E8E1D9] hover:bg-[#F5EFEB]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Action utility bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8E1D9] text-xs text-[#78716C]">
          <span className="font-serif italic text-sm text-[#1C1917]">
            Showing customized AM & PM regimen for {skinType} skin ({goal} focus)
          </span>

          <div className="flex items-center gap-2">
            {completedSteps.length > 0 && (
              <button
                onClick={() => setCompletedSteps([])}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs text-[#78716C] hover:text-[#1C1917] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset checks</span>
              </button>
            )}

            <button
              onClick={handleCopyRoutine}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E8E1D9] bg-[#FDFBF7] hover:bg-[#F5EFEB] text-[#1C1917] text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Routine'}</span>
            </button>
          </div>
        </div>

        {/* Routine Display Columns (AM and PM) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
          
          {/* AM Morning Ritual */}
          <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-xl border border-[#E8E1D9]">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8E1D9]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#F5EFEB] rounded-full text-[#A3634E]">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1C1917]">Morning Routine</h3>
                  <p className="text-xs text-[#78716C]">Focus: Protection & Environmental Defense</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[#E8E1D9]/70 pt-2">
              {routine.am.map((step) => {
                const stepKey = `am-${step.step}`;
                const isDone = completedSteps.includes(stepKey);

                return (
                  <div key={stepKey} className="py-5 flex items-start gap-4 group">
                    <button
                      type="button"
                      onClick={() => toggleStep(stepKey)}
                      className={`mt-1 p-1 rounded transition-colors ${
                        isDone ? 'text-emerald-600' : 'text-[#A8A29E] hover:text-[#1C1917]'
                      }`}
                      aria-label={`Mark step ${step.step} complete`}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${isDone ? 'fill-emerald-100' : ''}`} />
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#78716C] mb-1">
                        <span className="font-mono text-[#A3634E] font-semibold">0{step.step}</span>
                        <span>·</span>
                        <span className="uppercase tracking-wider font-medium">{step.category}</span>
                      </div>
                      <h4 className={`font-serif text-lg text-[#1C1917] ${isDone ? 'line-through opacity-70' : ''}`}>
                        {step.name}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                        {step.instruction}
                      </p>
                      <p className="mt-2 text-xs text-[#78716C] font-mono">
                        Key actives: {step.ingredients}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PM Evening Ritual */}
          <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-xl border border-[#E8E1D9]">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8E1D9]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#F5EFEB] rounded-full text-[#1C1917]">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#1C1917]">Evening Routine</h3>
                  <p className="text-xs text-[#78716C]">Focus: Cellular Recovery & Barrier Sealing</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[#E8E1D9]/70 pt-2">
              {routine.pm.map((step) => {
                const stepKey = `pm-${step.step}`;
                const isDone = completedSteps.includes(stepKey);

                return (
                  <div key={stepKey} className="py-5 flex items-start gap-4 group">
                    <button
                      type="button"
                      onClick={() => toggleStep(stepKey)}
                      className={`mt-1 p-1 rounded transition-colors ${
                        isDone ? 'text-emerald-600' : 'text-[#A8A29E] hover:text-[#1C1917]'
                      }`}
                      aria-label={`Mark step ${step.step} complete`}
                    >
                      <CheckCircle2 className={`w-5 h-5 ${isDone ? 'fill-emerald-100' : ''}`} />
                    </button>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-[#78716C] mb-1">
                        <span className="font-mono text-[#A3634E] font-semibold">0{step.step}</span>
                        <span>·</span>
                        <span className="uppercase tracking-wider font-medium">{step.category}</span>
                      </div>
                      <h4 className={`font-serif text-lg text-[#1C1917] ${isDone ? 'line-through opacity-70' : ''}`}>
                        {step.name}
                      </h4>
                      <p className="mt-1 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                        {step.instruction}
                      </p>
                      <p className="mt-2 text-xs text-[#78716C] font-mono">
                        Key actives: {step.ingredients}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
