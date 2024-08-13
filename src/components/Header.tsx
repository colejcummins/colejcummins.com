import { MarkGithubIcon } from '@primer/octicons-react';

import Link from '@/components/Link';

export function Header() {
  return (
    <div className="flex justify-between items-center p-6">
      <Link href="/">
        <div className="text-l font-mono font-semibold">colejcummins</div>
      </Link>
      <Link href="https://github.com/colejcummins">
        <MarkGithubIcon size="medium" fill="inherit" />
      </Link>
    </div>
  );
}
