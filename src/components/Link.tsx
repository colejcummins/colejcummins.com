import {default as NextLink, LinkProps} from 'next/link';
import React from 'react';

export default function Link(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <NextLink {...props as any} className={`${props.className} focus:ring-2 ring-blue-400 text-slate-50 hover:!text-blue-400 fill-slate-50 hover:fill-blue-400 outline-none rounded-sm`} />
  )
}