'use client';

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="mb-6 rounded-md bg-red-50 p-4">
      <div className="text-sm text-red-800">{message}</div>
    </div>
  );
}

