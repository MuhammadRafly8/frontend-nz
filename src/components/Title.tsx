'use client';

import React from 'react';

export default function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{children}</h3>
  );
}