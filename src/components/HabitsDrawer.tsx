import React from 'react';
import { X, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export interface HabitItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

export const DAILY_HABITS: HabitItem[] = [
  {
    id: 'habit-spf',
    title: 'Apply Daily Broad-Spectrum Sunscreen',
    description: 'Two full finger-lengths of SPF 30+ to face and neck every morning.',
    category: 'Protection · Blog 2',
  },
  {
    id: 'habit-cleanse',
    title: 'Evening Double Cleanse',
    description: 'Dissolve makeup and sunscreen first, then purify with gentle cleanser.',
    category: 'Cleansing · Blog 3',
  },
  {
    id: 'habit-moisture',
    title: 'Moisturize on Damp Skin',
    description: 'Lock in water within 60 seconds of washing to prevent TEWL.',
    category: 'Hydration · Blog 4',
  },
  {
    id: 'habit-water',
    title: 'Drink Sufficient Fluids',
    description: 'Keep internal tissue hydration optimal across morning and afternoon.',
    category: 'Wellness · Blog 5 & 10',
  },
  {
    id: 'habit-sleep',
    title: '7-8 Hours Restorative Sleep',
    description: 'Allow cellular repair and growth hormone collagen synthesis overnight.',
    category: 'Lifestyle · Blog 9',
  },
  {
    id: 'habit-sanitary',
    title: 'Sanitize Beauty Tools & Phone',
    description: 'Keep makeup brushes, sponge blenders, and phone screen clean.',
    category: 'Hygiene · Blog 5 & 10',
  },
];

interface HabitsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  completedHabits: string[];
  onToggleHabit: (id: string) => void;
  onResetHabits: () => void;
}

export const HabitsDrawer: React.FC<HabitsDrawerProps> = ({
  isOpen,
  onClose,
  completedHabits,
  onToggleHabit,
  onResetHabits,
}) => {
  if (!isOpen) return null;

  const count = completedHabits.length;
  const percentage = Math.round((count / DAILY_HABITS.length) * 100);

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
        <div className="p-6 border-b border-[#E8E1D9] bg-[#FDFBF7]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#A3634E] font-semibold">
                DAILY WELLNESS RITUAL
              </p>
              <h3 className="font-serif text-2xl text-[#1C1917]">Glow Habits Tracker</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-md hover:bg-[#F5EFEB] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 pt-3 border-t border-[#E8E1D9]/70">
            <div className="flex items-center justify-between text-xs text-[#78716C] mb-1.5">
              <span>Today's Consistency</span>
              <span className="font-mono font-medium text-[#1C1917]">{count} of {DAILY_HABITS.length} completed ({percentage}%)</span>
            </div>
            <div className="w-full bg-[#E8E1D9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1C1917] h-full transition-all duration-300 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Habit List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {DAILY_HABITS.map((habit) => {
            const isCompleted = completedHabits.includes(habit.id);

            return (
              <div
                key={habit.id}
                onClick={() => onToggleHabit(habit.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isCompleted
                    ? 'bg-[#F5EFEB] border-[#1C1917]/20 text-[#1C1917]'
                    : 'bg-[#FDFBF7] border-[#E8E1D9] hover:border-[#1C1917]/30'
                }`}
              >
                <button
                  type="button"
                  className={`mt-0.5 p-0.5 rounded transition-colors ${
                    isCompleted ? 'text-emerald-700' : 'text-[#A8A29E]'
                  }`}
                  aria-label="Toggle habit"
                >
                  <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'fill-emerald-100' : ''}`} />
                </button>

                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-wider text-[#A3634E] font-medium mb-0.5">
                    {habit.category}
                  </p>
                  <h4 className={`text-sm font-medium ${isCompleted ? 'line-through text-[#78716C]' : 'text-[#1C1917]'}`}>
                    {habit.title}
                  </h4>
                  <p className="mt-1 text-xs text-[#57534E] leading-relaxed">
                    {habit.description}
                  </p>
                </div>
              </div>
            );
          })}

          {percentage === 100 && (
            <div className="p-4 bg-[#F5EFEB] border border-[#A3634E]/30 rounded-lg text-center space-y-1">
              <Sparkles className="w-5 h-5 text-[#A3634E] mx-auto mb-1" />
              <p className="font-serif text-base text-[#1C1917]">Full Daily Glow Achieved!</p>
              <p className="text-xs text-[#78716C]">
                Your skin barrier is supported, protected, and restored for today.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E8E1D9] bg-[#FDFBF7] flex items-center justify-between">
          <button
            onClick={onResetHabits}
            className="inline-flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset for tomorrow</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-[#1C1917] text-white rounded-md hover:bg-[#2C2724] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
