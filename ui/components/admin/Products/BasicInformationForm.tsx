'use client';

import ProductNameInput from './ProductNameInput';
import SkuInput from './SkuInput';
import UrlInput from './UrlInput';
import DescriptionTextarea from './DescriptionTextarea';
import PriceInput from './PriceInput';

interface BasicInformationFormProps {
  name: string;
  sku: string;
  url: string;
  description: string;
  price: string;
  onNameChange: (value: string) => void;
  onSkuChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriceChange: (value: string) => void;
}

export default function BasicInformationForm({
  name,
  sku,
  url,
  description,
  price,
  onNameChange,
  onSkuChange,
  onUrlChange,
  onDescriptionChange,
  onPriceChange,
}: BasicInformationFormProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <ProductNameInput value={name} onChange={onNameChange} />
      <SkuInput value={sku} onChange={onSkuChange} />
      <UrlInput value={url} onChange={onUrlChange} />
      <DescriptionTextarea value={description} onChange={onDescriptionChange} />
      <PriceInput value={price} onChange={onPriceChange} />
    </div>
  );
}

