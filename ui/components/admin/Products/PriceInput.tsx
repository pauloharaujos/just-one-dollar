'use client';

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  currency?: string;
}

export default function PriceInput({ 
  value, 
  onChange, 
  required = true,
  currency = '$' 
}: PriceInputProps) {
  return (
    <div>
      <label htmlFor="price" className="block text-sm font-semibold text-gray-900 mb-2">
        Price (USD) {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{currency}</span>
        </div>
        <input
          type="number"
          id="price"
          step="0.01"
          min="0"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-7 pr-3 rounded-lg border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 text-gray-900 placeholder:text-gray-400"
          placeholder="0.00"
        />
      </div>
    </div>
  );
}

