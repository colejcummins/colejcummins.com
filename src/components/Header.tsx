import Link from 'next/link';
import {MarkGithubIcon} from '@primer/octicons-react';

export function Header() {
  return (
    <div className="flex justify-between items-center p-6 bg-slate-950">
      <Link href="/">
        <div className="text-l text-slate-50 hover:text-blue-400 font-mono font-semibold">
          colejcummins
        </div>
      </Link>
      <Link href="https://github.com/colejcummins" className="fill-slate-50 hover:fill-blue-400">
        <MarkGithubIcon size="medium" fill="inherit"/>
      </Link>
    </div>
  )
}