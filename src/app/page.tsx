import React from 'react';

import { Console } from '@/components/Console';

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div
        className="flex flex-col border rounded-lg border-slate-600 h-full w-4/5 bg-slate-900 bg-opacity-70"
        style={{ backdropFilter: 'saturate(200%) blur{20px)' }}
      >
        <div className="flex gap-2 justify-start p-2 border-b border-slate-700">
          {Array(3)
            .fill(0)
            .map((i) => (
              <div key={i} className="rounded-full h-4 w-4 border border-slate-700 " />
            ))}
        </div>
        <Console />
      </div>
    </div>
  );
}
