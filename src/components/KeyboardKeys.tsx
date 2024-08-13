import React from 'react';

export function KeyboardKeys({ keys }: { keys: string[] }) {
  return (
    <div className="flex items-center">
      {keys.map((key) => (
        <kbd
          key={key}
          className="rounded-sm px-2 text-center font-mono text-slate-300 bg-slate-700 shadow-[inset_0_-0.0625rem_0_rgb(148 163 184)]"
        >
          {key}
        </kbd>
      ))}
    </div>
  );
}
