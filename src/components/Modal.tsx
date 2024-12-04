'use client';

import React from 'react';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  title: string;
  children: React.JSX.Element;
}

export const Modal = ({ isOpen, close, title, children }: ModalProps) => {
  return isOpen ? (
    <div
      className="rounded-lg md:p-[1px] w-full text-sm md:w-4/5 lg:text-base h-full md:h-[800px] from-blue-300 to-slate-200 dark:from-slate-400 from-5% dark:via-slate-600 via-20% dark:to-slate-900 to-70%"
      style={{
        backgroundImage: `linear-gradient(45deg, var(--tw-gradient-stops))`
      }}
    >
      <div
        className="flex flex-col h-full rounded-[calc(0.5rem-1px)] from-white to-slate-50 dark:from-slate-950 from-1% dark:via-slate-950 via-10% dark:to-black to-80%"
        style={{
          backgroundImage: `linear-gradient(45deg, var(--tw-gradient-stops))`
        }}
      >
        <div className="flex p-2 items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            <button
              className="rounded-full h-4 w-4 border-slate-200 bg-transparent dark:border-slate-800 hover:bg-red-600 focus:bg-red-600"
              onClick={close}
            />
          </div>
          <div className="font-mono text-slate-300 dark:text-slate-800">{title}</div>
          <div className="w-[64px]" />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};
