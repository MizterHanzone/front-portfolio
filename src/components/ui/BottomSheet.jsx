import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function BottomSheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', onEscape);
    }
    return () => document.removeEventListener('keydown', onEscape);
  }, [open, onClose]);

  if (!open) return null;

  const content = (
    <>
      {/* Backdrop – Flutter-style barrier */}
      <div
        className="bottomsheet-backdrop fixed inset-0 z-[100] bg-black/40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden
      />
      {/* Sheet – Flutter-style modal bottom sheet */}
      <div
        className="bottomsheet-panel fixed inset-x-0 bottom-0 z-[101] flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.12)] animate-bottomsheet-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottomsheet-title"
      >
        {/* Drag handle – like Flutter's handle */}
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <div
            className="h-1 w-12 rounded-full bg-gray-300"
            aria-hidden
          />
        </div>
        {/* Title bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-3">
          <h2 id="bottomsheet-title" className="text-lg font-semibold text-primary">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-primary hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-6 pb-8 safe-area-pb">
          {children}
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
}
