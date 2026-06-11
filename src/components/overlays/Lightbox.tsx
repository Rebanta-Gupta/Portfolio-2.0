import { useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProjectImage } from '../../types';

interface LightboxProps {
  images: ProjectImage[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onPrevious, onNext }: LightboxProps) {
  const image = images[currentIndex];
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape')      onClose();
    if (e.key === 'ArrowLeft')   onPrevious();
    if (e.key === 'ArrowRight')  onNext();
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      prev?.focus();
    };
  }, [handleKey]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[5000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 w-[90%] max-w-2xl">
        {/* Counter */}
        <span
          className="absolute -top-10 left-0 font-mono text-xs px-3 py-1.5 rounded-full"
          style={{ background: 'var(--sky-dim)', color: 'var(--sky)', border: '1px solid var(--border-glow)' }}
        >
          {currentIndex + 1} / {images.length}
        </span>

        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors"
          style={{ border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          aria-label="Close"
        >
          <X size={14} />
        </button>

        {/* Prev/Next */}
        <button
          onClick={onPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
          style={{ background: 'rgba(7,9,15,0.75)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
          style={{ background: 'rgba(7,9,15,0.75)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>

        <img
          src={image.src}
          alt={image.alt}
          className="block w-full rounded-2xl object-contain max-h-[65vh]"
        />

        <div
          className="mt-4 rounded-xl px-5 py-4 text-sm leading-7 text-center"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
        >
          {image.description}
        </div>
      </div>
    </div>
  );
}