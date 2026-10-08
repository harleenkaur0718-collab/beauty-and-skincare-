import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Topic Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[#E8E1D9] bg-[#F5EFEB]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#A3634E] mb-2">
            EDITORIAL INQUIRIES & TOPIC REQUESTS
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight">
            Stay Connected
          </h2>
          <p className="mt-3 text-base text-[#57534E] leading-relaxed">
            Have a beauty or skincare topic you would like us to cover? Get in touch with us.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#FDFBF7] rounded-full border border-[#E8E1D9] text-xs sm:text-sm text-[#1C1917]">
            <Mail className="w-4 h-4 text-[#A3634E]" />
            <span>Email: <a href="mailto:hello@glowguide.com" className="font-medium hover:underline">hello@glowguide.com</a></span>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-[#FDFBF7] p-6 sm:p-10 rounded-xl border border-[#E8E1D9] shadow-xs max-w-2xl mx-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1917]">Message Received</h3>
              <p className="text-sm text-[#57534E] max-w-md mx-auto">
                Thank you for reaching out to GlowGuide. Our editorial team reviews every reader inquiry and topic suggestion for upcoming issues.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs font-medium text-[#1C1917] bg-[#F5EFEB] hover:bg-[#EAE2D8] border border-[#E8E1D9] rounded-md transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Clara Hansen"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border border-[#E8E1D9] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="clara@example.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border border-[#E8E1D9] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-1.5">
                  Subject or Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border border-[#E8E1D9] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917]"
                >
                  <option value="Topic Suggestion">Topic Suggestion (Article Idea)</option>
                  <option value="Routine Question">Question About a Skincare Routine</option>
                  <option value="Product Ingredient Inquiry">Product or Ingredient Inquiry</option>
                  <option value="Collaboration">Editorial or Dermatologist Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share the beauty question, skin challenge, or topic you'd love us to explore in an upcoming guide..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#FDFBF7] border border-[#E8E1D9] rounded-md focus:outline-none focus:border-[#1C1917] text-[#1C1917] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-medium text-white bg-[#1C1917] hover:bg-[#2C2724] rounded-md transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Editorial Desk</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
