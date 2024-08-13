'use client';

import React, { useRef } from 'react';

import { Canvas } from '@react-three/fiber';

export function Background() {
  const ref = useRef();
  return (
    <Canvas>
      <mesh></mesh>
    </Canvas>
  );
}
