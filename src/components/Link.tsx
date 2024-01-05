import {default as NextLink, LinkProps} from 'next/link';

export default function Link(props: LinkProps) {
  return (
    <NextLink {...props} className="ring-2 ring-blue-400 outline-none rounded-sm" />
  )
}