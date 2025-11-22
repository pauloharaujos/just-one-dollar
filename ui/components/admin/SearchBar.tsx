'use client';

import { ReactNode } from 'react';

interface SearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
  children?: ReactNode;
}

export default function SearchBar({
  searchValue,
  onSearchChange,
  onSearchSubmit,
  placeholder = 'Search...',
  children,
}: SearchBarProps) {
  return (
    <form onSubmit={onSearchSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
        />
        {children}
        <button
          type="submit"
          className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
        >
          Search
        </button>
      </div>
    </form>
  );
}

