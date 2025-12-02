'use client';

import { useRouter } from 'next/navigation';

interface FormActionsProps {
  onCancel?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  isUploading?: boolean;
  disabled?: boolean;
  submittingLabel?: string;
}

export default function FormActions({
  onCancel,
  onSubmit,
  submitLabel = 'Create Product',
  cancelLabel = 'Cancel',
  isSubmitting = false,
  isUploading = false,
  disabled = false,
  submittingLabel,
}: FormActionsProps) {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const isDisabled = disabled || isSubmitting || isUploading;
  const defaultSubmittingLabel = submitLabel.includes('Create') ? 'Creating Product...' : 'Saving Changes...';
  const displaySubmittingLabel = submittingLabel || defaultSubmittingLabel;

  return (
    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={handleCancel}
        className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={isDisabled}
        className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading
          ? 'Uploading Image...'
          : isSubmitting
            ? displaySubmittingLabel
            : submitLabel}
      </button>
    </div>
  );
}

