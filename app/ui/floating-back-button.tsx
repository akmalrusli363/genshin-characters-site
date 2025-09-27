'use client';

import { useRouter } from 'next/navigation';

export default function FloatingBackButton({backToHome}: {backToHome: boolean | undefined}) {
  const router = useRouter();

  return (
    <button
      onClick={() => (backToHome) ? router.push('/') : router.back()}
      className="fixed top-4 left-4 z-50 p-3 bg-black/50 text-white rounded-full shadow-lg hover:bg-white/20 backdrop-blur-sm transition-colors"
      aria-label="Go back" title={backToHome ? 'Back to Home' : 'Back'}
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
  );
}

