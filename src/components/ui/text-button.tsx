import React from 'react';

interface TextButtonProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly onClick?: () => void;
}

export const TextButton = ({ children, className, onClick }: TextButtonProps) => {
  return (
    <button
      className={`${className} justify-self-start focus:ring-2 ring-offset-3 ring-accent text-foreground hover:bg-foreground hover:text-background outline-none cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
