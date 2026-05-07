import React from 'react';

interface TextLinkProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly href: string;
  readonly download?: boolean;
}

export const TextLink = ({ children, className, href, download }: TextLinkProps) => {
  return (
    <a
      className={`${className} justify-self-start focus:ring-2 ring-offset-3 ring-accent text-foreground hover:bg-foreground hover:text-background outline-none cursor-pointer`}
      href={href}
      rel="noreferrer"
      target="_blank"
      download={download}
    >
      {children}
    </a>
  );
};
