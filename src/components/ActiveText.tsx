import React from 'react';

interface ActiveTextProps {
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
}

const ActiveText: React.FC<ActiveTextProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="justify-self-start focus:ring-2 ring-blue-500 dark:ring-blue-300 text-slate-950 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-300 fill-slate-950 dark:fill-slate-50 hover:fill-blue-300 outline-none rounded-sm"
  >
    {children}
  </button>
);

export default ActiveText;
