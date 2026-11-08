import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { POPULAR_CONVERTER_SLUGS, CONVERTERS } from '../data/converters';

interface InfoPageProps {
  navigate: (to: string) => void;
}

export const AboutPage: React.FC<InfoPageProps> = ({ navigate }) => {
  const popular = POPULAR_CONVERTER_SLUGS.map((s) =>
    CONVERTERS.find((c) => c.slug === s)!
  ).filter(Boolean);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#1F2A44]/65 dark:text-slate-400">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="hover:text-[#1F2A44] dark:hover:text-[#F2C94C] hover:underline underline-offset-4"
        >
          Home
        </a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#1F2A44] dark:text-white">About UnitSwift</span>
      </nav>

      <header className="space-y-3">
        <p className="text-xs font-semibold tracking-wider text-[#1F2A44]/65 dark:text-[#F2C94C]">
          Built by Naseeb · Pure Client-Side Utility
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] dark:text-white">
          About UnitSwift
        </h1>
        <p className="text-base text-[#1F2A44]/75 dark:text-slate-300 leading-relaxed">
          UnitSwift was created with a single objective: make everyday unit conversions feel as immediate and reliable as pulling out a physical pocket measuring tape.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
        <div className="h-2 bg-[#F2C94C] measuring-tape-ticks" aria-hidden="true" />
        <div className="p-6 sm:p-8 space-y-6 text-sm sm:text-base text-[#1F2A44]/80 dark:text-slate-300 leading-relaxed">
          <p>
            Too many online unit calculators bury simple math under slow server round-trips, cluttered cookie banners, and intrusive video popups. UnitSwift runs 100% in your browser using standard international conversion constants defined by NIST and the International System of Units (SI).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#1F2A44]/10 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-[#1F2A44] dark:text-white mb-1">
                Exact Standards
              </h2>
              <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400">
                Every converter uses exact statutory definitions—such as 1 inch = 2.54 cm, 1 pound = 0.45359237 kg, and 1 mile = 1.609344 km.
              </p>
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1F2A44] dark:text-white mb-1">
                Bookmarkable Clean URLs
              </h2>
              <p className="text-xs sm:text-sm text-[#1F2A44]/70 dark:text-slate-400">
                Each of our 50 calculators lives at its own clean URL like <code className="font-mono-tabular text-[#1F2A44] dark:text-[#F2C94C]">/kg-to-pounds</code> so you can bookmark or share any tool directly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[#1F2A44] dark:text-white">
          Jump to Popular Converters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popular.map((c) => (
            <a
              key={c.slug}
              href={`/${c.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${c.slug}`);
              }}
              className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/12 dark:border-white/10 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] transition-colors"
            >
              <span className="font-semibold text-sm text-[#1F2A44] dark:text-white">
                {c.title}
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#1F2A44]/50 dark:text-[#F2C94C]" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export const ContactPage: React.FC<InfoPageProps> = ({ navigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      setError('Please include a short message or unit request.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#1F2A44]/65 dark:text-slate-400">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          className="hover:text-[#1F2A44] dark:hover:text-[#F2C94C] hover:underline underline-offset-4"
        >
          Home
        </a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#1F2A44] dark:text-white">Contact</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] dark:text-white">
          Contact UnitSwift
        </h1>
        <p className="text-sm sm:text-base text-[#1F2A44]/75 dark:text-slate-300">
          Have feedback, spotted a calculation edge case, or want to suggest a new unit pair? Send a note to Naseeb below.
        </p>
      </header>

      <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
        <div className="h-2 bg-[#F2C94C] measuring-tape-ticks" aria-hidden="true" />
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-[#F2C94C] mx-auto" />
              <h2 className="text-xl font-bold text-[#1F2A44] dark:text-white">
                Message received, {name}!
              </h2>
              <p className="text-sm text-[#1F2A44]/75 dark:text-slate-300 max-w-md mx-auto">
                Thank you for reaching out to UnitSwift. Your feedback helps keep our converters fast and accurate.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#1F2A44]/20 dark:border-white/20 text-[#1F2A44] dark:text-white hover:bg-[#F6F8FA] dark:hover:bg-[#0F1626] transition-colors cursor-pointer"
                >
                  Send another message
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#F2C94C] text-[#1F2A44] hover:brightness-95 transition-all cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {error && (
                <div role="alert" className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs font-medium text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#1F2A44]/80 dark:text-slate-300 mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-3 text-sm bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white rounded-xl border border-[#1F2A44]/20 dark:border-white/20 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1F2A44]/80 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-sm bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white rounded-xl border border-[#1F2A44]/20 dark:border-white/20 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1F2A44]/80 dark:text-slate-300 mb-1.5">
                  Message or Unit Suggestion
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us which unit converter you would like to see next..."
                  className="w-full px-4 py-3 text-sm bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white rounded-xl border border-[#1F2A44]/20 dark:border-white/20 focus:border-[#1F2A44] dark:focus:border-[#F2C94C] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 text-sm font-bold rounded-xl bg-[#F2C94C] text-[#1F2A44] hover:brightness-95 transition-all cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
