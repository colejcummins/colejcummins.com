import { default as NextLink } from 'next/link';
import React from 'react';

export default function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <NextLink
      {...(props as any)}
      target="_blank"
      className={`link-class ${props.className} focus:ring-2 ring-blue-500 dark:ring-blue-300 text-slate-950 dark:text-slate-50 hover:text-blue-500 dark:hover:text-blue-300 fill-slate-950 dark:fill-slate-50 hover:fill-blue-300 outline-none rounded-sm`}
    />
  );
}
