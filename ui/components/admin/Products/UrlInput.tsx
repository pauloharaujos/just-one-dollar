'use client';

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function UrlInput({ value, onChange, required = true }: UrlInputProps) {
  return (
    <div>
      <label htmlFor="url" className="block text-sm font-semibold text-gray-900 mb-2">
        URL Slug {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id="url"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900 placeholder:text-gray-400"
        placeholder="product-url-slug"
      />
      <p className="mt-2 text-sm text-gray-600">
        URL-friendly version of the name
      </p>
    </div>
  );
}

