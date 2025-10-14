'use client';

export default function CustomCursor({ cursorPosition, isHovering }) {
  return (
    <div
      className="fixed w-8 h-8 pointer-events-none z-50 transition-transform duration-100 ease-out"
      style={{
        left: cursorPosition.x - 16,
        top: cursorPosition.y - 16,
        transform: isHovering ? 'scale(1.5)' : 'scale(1)',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="#a855f7" strokeWidth="2" fill="none" />
        <circle cx="16" cy="16" r="8" fill="#7c3aed" />
      </svg>
    </div>
  );
}