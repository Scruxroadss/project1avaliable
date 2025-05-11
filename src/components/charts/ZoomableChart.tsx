
import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  ReferenceArea,
  Cell
} from 'recharts';
import { Button } from "@/components/ui/button";
import { ZoomIn } from 'lucide-react';
import CustomTooltip from './CustomTooltip';
import CustomCandlestickChart from './CustomCandlestickChart';

interface ZoomableChartProps {
  data: any[];
  type: string;
  height?: number;
  isDark: boolean;
}

const ZoomableChart: React.FC<ZoomableChartProps> = ({ data, type, height = 300, isDark }) => {
  const [leftIndex, setLeftIndex] = useState<number | null>(null);
  const [rightIndex, setRightIndex] = useState<number | null>(null);
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null);
  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    setDisplayData(data);
  }, [data]);

  const zoom = () => {
    if (refAreaLeft === refAreaRight || !refAreaRight) {
      setRefAreaLeft(null);
      setRefAreaRight(null);
      return;
    }

    // Ensure leftIndex and rightIndex are set
    if (leftIndex !== null && rightIndex !== null) {
      const dataFromIndex = Math.min(leftIndex, rightIndex);
      const dataToIndex = Math.max(leftIndex, rightIndex);

      setDisplayData(data.slice(dataFromIndex, dataToIndex + 1));
    }

    setRefAreaLeft(null);
    setRefAreaRight(null);
  };

  const handleMouseDown = (e: any) => {
    if (!e) return;
    
    const { activeLabel } = e;
    setRefAreaLeft(activeLabel);
    const index = data.findIndex(item => item.date === activeLabel);
    if (index !== -1) setLeftIndex(index);
  };

  const handleMouseMove = (e: any) => {
    if (!e || !refAreaLeft) return;
    
    const { activeLabel } = e;
    setRefAreaRight(activeLabel);
    const index = data.findIndex(item => item.date === activeLabel);
    if (index !== -1) setRightIndex(index);
  };
  
  const resetZoom = () => {
    setDisplayData(data);
    setRefAreaLeft(null);
    setRefAreaRight(null);
    setLeftIndex(null);
    setRightIndex(null);
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={displayData}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={zoom}
      >
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F9802D" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#F9802D" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke={isDark ? '#525252' : '#e5e5e5'} 
        />
        <XAxis 
          dataKey="date" 
          stroke={isDark ? '#a8a29e' : '#78716c'}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis 
          stroke={isDark ? '#a8a29e' : '#78716c'}
          tickFormatter={(value) => `R$${value}`} 
          domain={['auto', 'auto']}
        />
        <RechartsTooltip
          content={<CustomTooltip theme={isDark ? 'dark' : 'light'} />}
          wrapperStyle={{ zIndex: 1000 }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="#F9802D"
          fillOpacity={1}
          fill="url(#colorPrice)"
          strokeWidth={2}
          dot={{ fill: '#F9802D', r: 4 }}
          activeDot={{ r: 6, fill: '#F9802D', stroke: isDark ? 'white' : 'black', strokeWidth: 1 }}
          animationDuration={500}
          isAnimationActive={true}
        />
        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            x1={String(refAreaLeft)}
            x2={String(refAreaRight)}
            strokeOpacity={0.3}
            fill={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={displayData}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#525252' : '#e5e5e5'} />
        <XAxis dataKey="date" stroke={isDark ? '#a8a29e' : '#78716c'} />
        <YAxis stroke={isDark ? '#a8a29e' : '#78716c'} tickFormatter={(value) => `R$${value}`} />
        <RechartsTooltip
          content={<CustomTooltip theme={isDark ? 'dark' : 'light'} />}
          wrapperStyle={{ zIndex: 1000 }}
        />
        <Bar 
          dataKey="price" 
          fill="#F9802D" 
          radius={[4, 4, 0, 0]}
          animationDuration={500}
        >
          {displayData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={index === displayData.length - 1 ? '#F9802D' : '#FFB57A'}
            />
          ))}
        </Bar>
        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            x1={String(refAreaLeft)}
            x2={String(refAreaRight)}
            strokeOpacity={0.3}
            fill={isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          />
        ) : null}
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className="relative">
      {type === 'line' && renderLineChart()}
      {type === 'bar' && renderBarChart()}
      {type === 'candle' && <CustomCandlestickChart data={displayData} height={height} />}
      
      {displayData.length < data.length && (
        <Button 
          variant="outline" 
          size="sm"
          className="absolute top-2 right-2 opacity-80 hover:opacity-100 z-10"
          onClick={resetZoom}
        >
          <ZoomIn className="h-4 w-4 mr-1" />
          Resetar Zoom
        </Button>
      )}
    </div>
  );
};

export default ZoomableChart;
