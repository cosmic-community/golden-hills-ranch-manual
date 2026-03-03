import { getMetafieldValue } from '@/types';
import type { SelectDropdownValue } from '@/types';

interface InventoryBadgeProps {
  status: SelectDropdownValue;
}

export default function InventoryBadge({ status }: InventoryBadgeProps) {
  const key = status?.key || '';
  const displayValue = getMetafieldValue(status);

  const badgeStyles: Record<string, string> = {
    in_stock: 'bg-sage-100 text-sage-800 border-sage-200',
    low_stock: 'bg-amber-50 text-amber-800 border-amber-200',
    out_of_stock: 'bg-red-50 text-red-800 border-red-200',
  };

  const dotStyles: Record<string, string> = {
    in_stock: 'bg-sage-500',
    low_stock: 'bg-amber-500',
    out_of_stock: 'bg-red-500',
  };

  const style = badgeStyles[key] || badgeStyles['in_stock'] || '';
  const dot = dotStyles[key] || dotStyles['in_stock'] || '';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${style}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {displayValue || 'In Stock'}
    </span>
  );
}