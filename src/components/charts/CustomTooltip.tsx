
import React from 'react';
import { formatCurrency } from '@/utils/formatters';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  theme: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${theme === 'dark' ? 'bg-stone-800 text-white' : 'bg-white text-stone-800'} p-3 rounded-lg shadow-lg border ${theme === 'dark' ? 'border-stone-700' : 'border-stone-200'}`}>
        <p className="font-medium">{`Data: ${label}`}</p>
        <p className="text-amber-500 font-medium">{`${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
