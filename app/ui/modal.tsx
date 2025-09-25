'use client';

import { ComponentRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function Modal({
  children,
  href,
}: { children: React.ReactNode; href?: string }) {
  const router = useRouter();
  const dialogRef = useRef<ComponentRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Only close if backdrop (the dialog element itself) is clicked
    if (e.target === e.currentTarget) {
      onDismiss();
    }
  };

  return (
    <dialog ref={dialogRef} className="bg-black/50 w-[100vw] h-[100vh] max-h-full max-w-full place-content-center justify-center items-center p-0" onClose={onDismiss} onClick={handleDialogClick}>
      <div className="relative bg-black/80 text-white width-full place-self-center rounded-lg shadow-lg w-[90vw] max-w-lg backdrop-blur-sm border border-white/20 flex flex-col" style={{maxWidth: "100%"}}>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        <button onClick={onDismiss} className="absolute top-2 right-2 px-4 py-2 text-2xl rounded-full hover:bg-white/20 transition-colors" aria-label="Close modal">
          &#x2715;
        </button>
      </div>
    </dialog>
  );
}