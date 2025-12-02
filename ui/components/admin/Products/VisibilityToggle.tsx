'use client';

interface VisibilityToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function VisibilityToggle({ checked, onChange }: VisibilityToggleProps) {
  return (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
      <input
        id="visible"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor="visible" className="ml-3 block text-sm font-medium text-gray-900">
        Make this product visible on the storefront
      </label>
    </div>
  );
}

