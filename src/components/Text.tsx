'use client';

import React from 'react';

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Text({ children, className = '' }: TextProps) {
  return (
    <p className={`text-gray-600 dark:text-gray-300 ${className}`}>{children}</p>
  );
}