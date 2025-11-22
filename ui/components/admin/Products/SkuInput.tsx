'use client';

interface SkuInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function SkuInput({ value, onChange, required = true }: SkuInputProps) {
  return (
    <div>
      <label htmlFor="sku" className="block text-sm font-semibold text-gray-900 mb-2">
        SKU {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id="sku"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900 placeholder:text-gray-400"
        placeholder="SKU-001"
      />
      <p className="mt-2 text-sm text-gray-600">
        Must be unique. Used for image filename (SKU.png)
      </p>
    </div>
  );
}

