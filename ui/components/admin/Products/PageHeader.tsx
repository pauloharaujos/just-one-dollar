'use client';

import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {children}
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}

