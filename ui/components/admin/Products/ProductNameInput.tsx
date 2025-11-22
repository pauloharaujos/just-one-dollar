'use client';

interface ProductNameInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function ProductNameInput({ value, onChange, required = true }: ProductNameInputProps) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
        Product Name {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id="name"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900 placeholder:text-gray-400"
        placeholder="Enter product name"
      />
    </div>
  );
}

