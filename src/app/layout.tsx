import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'colejcummins',
  description: 'colejcummins - React / Typescript / Nodejs / Nextjs / Python / Threejs'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-950">{children}</body>
    </html>
  );
}
