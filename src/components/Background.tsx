'use client'

import React, {useRef, useCallback} from 'react';

export const Background = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoaded = useCallback(() => {
    if (iframeRef.current) {
      console.log(iframeRef.current?.contentWindow?.document.getElementsByTagName('canvas'))
    }
  }, [iframeRef.current]);

  return (
    <div
      className="relative flex-1 h-screen w-screen"
    >
      <iframe
        ref={iframeRef}
        className="absolute h-screen w-screen"
        loading="lazy"
        src="https://r3f-gradient.vercel.app/0.5624352122423282"
        onLoad={handleLoaded}
      />
      <div className="h-2/3 w-2/3 bg-slate-900 bg-opacity-70" style={{ backdropFilter: 'saturate(200%) blur(20px)' }} />
    </div>
 );
};