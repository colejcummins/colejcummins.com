import React from 'react';

interface ActiveTextProps {
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly link?: string;
  readonly download?: boolean;
}

const ActiveText: React.FC<ActiveTextProps> = ({ onClick, children, className, link, download }) => {
  const joinedClassName = `${className} justify-self-start focus:ring-2 ring-offset-3 ring-blue-600 dark:ring-blue-300 text-slate-950 dark:text-slate-50 hover:text-blue-600 dark:hover:text-blue-300 outline-none rounded-sm`;

  return link || download ? (
    <a className={joinedClassName} href={link} rel="noreferrer" target="_blank" download={download}>
      {children}
    </a>
  ) : (
    <button className={joinedClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default ActiveText;
