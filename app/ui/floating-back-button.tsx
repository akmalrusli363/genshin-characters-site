'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const pageLinks = [
  { label: 'Characters', href: '/' },
  { label: 'Namecards', href: '/namecards' },
];

export default function FloatingBackButton({backToHome}: {backToHome: boolean | undefined}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex items-start justify-between">
      <button
        type="button"
        onClick={() => (backToHome) ? router.push('/') : router.back()}
        className="p-3 bg-black/50 text-white rounded-full shadow-lg hover:bg-white/20 backdrop-blur-sm transition-colors"
        aria-label="Go back"
        title={backToHome ? 'Back to Home' : 'Back'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-3 bg-black/50 text-white rounded-full shadow-lg hover:bg-white/20 backdrop-blur-sm transition-colors"
          aria-label="Open pages menu"
          title="Open pages menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 flex min-w-[9rem] flex-col rounded-2xl border border-white/10 bg-black/70 p-2 shadow-lg backdrop-blur-sm">
            {pageLinks.map((link) => (
              <a
                key={link.href}
                type="button"
                href={link.href}
                className="rounded-xl px-3 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-white/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

