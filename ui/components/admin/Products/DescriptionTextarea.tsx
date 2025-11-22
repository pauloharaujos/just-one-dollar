'use client';

interface DescriptionTextareaProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
}

export default function DescriptionTextarea({ 
  value, 
  onChange, 
  required = true,
  rows = 5 
}: DescriptionTextareaProps) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
        Description {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id="description"
        rows={rows}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-3 text-gray-900 placeholder:text-gray-400"
        placeholder="Enter detailed product description"
      />
    </div>
  );
}

