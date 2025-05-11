
import React from 'react';
import { 
  ComposedChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine
} from 'recharts';
import { useTheme } from "@/components/theme-provider";

interface CustomCandlestickChartProps {
  data: any[];
  height?: number;
}

const CustomCandlestickChart: React.FC<CustomCandlestickChartProps> = ({ data, height = 300 }) => {
  const { theme } = useTheme();
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#525252' : '#e5e5e5'} />
        <XAxis 
          dataKey="date" 
          stroke={theme === 'dark' ? '#a8a29e' : '#78716c'}
        />
        <YAxis 
          stroke={theme === 'dark' ? '#a8a29e' : '#78716c'}
          tickFormatter={(value) => `R$${value}`}
        />
        <RechartsTooltip 
          contentStyle={{
            backgroundColor: theme === 'dark' ? '#292524' : 'white',
            borderColor: theme === 'dark' ? '#525252' : '#e5e5e5',
            color: theme === 'dark' ? 'white' : 'black'
          }}
          labelFormatter={(value) => `Data: ${value}`}
          formatter={(value: any, name: any) => {
            if (name === "high") return [`Máxima: ${formatCurrency(value)}`];
            if (name === "low") return [`Mínima: ${formatCurrency(value)}`];
            if (name === "open") return [`Abertura: ${formatCurrency(value)}`];
            if (name === "close") return [`Fechamento: ${formatCurrency(value)}`];
            return [formatCurrency(value), name];
          }}
        />
        {data.map((entry, index) => (
          <React.Fragment key={`candle-${index}`}>
            {/* Vertical line from high to low */}
            <ReferenceLine 
              segment={[
                { x: entry.date, y: entry.low },
                { x: entry.date, y: entry.high }
              ]} 
              stroke={entry.close >= entry.open ? "#16a34a" : "#dc2626"}
              strokeWidth={1}
              ifOverflow="visible"
            />
            {/* Rectangle for open to close */}
            <ReferenceArea
              x1={String(parseFloat(index.toString()) - 0.25)}
              x2={String(parseFloat(index.toString()) + 0.25)}
              y1={entry.open}
              y2={entry.close}
              fill={entry.close >= entry.open ? "#16a34a" : "#dc2626"}
              fillOpacity={0.8}
              ifOverflow="visible"
            />
          </React.Fragment>
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

import { formatCurrency } from '@/utils/formatters';
export default CustomCandlestickChart;
