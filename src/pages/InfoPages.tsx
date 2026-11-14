import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Mail, Copy, Check } from 'lucide-react';
import { CONVERTERS } from '../data/converters';

interface InfoPageProps {
  navigate: (to: string) => void;
}

export const AboutPage: React.FC<InfoPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs font-medium text-[#1F2A44]/70 dark:text-slate-400"
      >
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
        <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="font-semibold text-[#1F2A44] dark:text-white">About</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] dark:text-white">
          About UnitSwift
        </h1>
      </header>

      <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
        <div className="h-2 bg-[#F2C94C] measuring-tape-ticks" aria-hidden="true" />
        <div className="p-6 sm:p-8 text-base text-[#1F2A44]/85 dark:text-slate-200 leading-relaxed">
          <p>
            UnitSwift is a free unit converter with 105 converters across weight, length, temperature, volume, speed, area, local units, and data. Built by Naseeb, it runs directly in your browser with no sign-up required and no tracking of personal data.
          </p>
        </div>
      </div>
    </div>
  );
};

const CONTACT_EMAIL = 'unitswift.help@gmail.com';

export const ContactPage: React.FC<InfoPageProps> = ({ navigate }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = CONTACT_EMAIL;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch {
        // Ignore fallback copy errors
      }
    }

    setEmailCopied(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setEmailCopied(false);
      copyTimerRef.current = null;
    }, 2000);
  };

  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs font-medium text-[#1F2A44]/70 dark:text-slate-400"
      >
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
        <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="font-semibold text-[#1F2A44] dark:text-white">Contact</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] dark:text-white">
          Contact
        </h1>
      </header>

      <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
        <div className="h-2 bg-[#F2C94C] measuring-tape-ticks" aria-hidden="true" />
        <div className="p-6 sm:p-8 space-y-4 text-base text-[#1F2A44]/85 dark:text-slate-200 leading-relaxed">
          <p>Found a wrong value or want a new converter? Write to us.</p>
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 font-bold text-[#1F2A44] dark:text-[#F2C94C] underline decoration-[#F2C94C] decoration-2 underline-offset-4 hover:opacity-85 transition-opacity"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{CONTACT_EMAIL}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F6F8FA] dark:bg-[#0F1626] text-[#1F2A44] dark:text-white border border-[#1F2A44]/15 dark:border-white/15 hover:border-[#1F2A44] dark:hover:border-[#F2C94C] transition-colors cursor-pointer"
            >
              {emailCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#F2C94C]" aria-hidden="true" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PrivacyPolicyPage: React.FC<InfoPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs font-medium text-[#1F2A44]/70 dark:text-slate-400"
      >
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
        <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span className="font-semibold text-[#1F2A44] dark:text-white">Privacy Policy</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1F2A44] dark:text-white">
          Privacy Policy
        </h1>
      </header>

      <div className="rounded-2xl bg-white dark:bg-[#151F33] border border-[#1F2A44]/15 dark:border-white/15 overflow-hidden">
        <div className="h-2 bg-[#F2C94C] measuring-tape-ticks" aria-hidden="true" />
        <div className="p-6 sm:p-8 space-y-4 text-base text-[#1F2A44]/85 dark:text-slate-200 leading-relaxed">
          <p>
            UnitSwift does not collect, store, or share any personal data. You can use all {CONVERTERS.length} unit converters without creating an account or providing any personal information.
          </p>
          <p>
            All unit conversions and calculations happen directly in your browser on your device, and the numbers you enter are never sent to a server.
          </p>
          <p>
            If third-party services such as analytics or ads are added in the future, those services may use cookies or similar technologies to measure site traffic or display relevant advertisements.
          </p>
        </div>
      </div>
    </div>
  );
};
