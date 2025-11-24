import React from 'react';
import { PriceBands } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { DollarSign, Info } from 'lucide-react';

interface PriceAnalysisProps {
  pricing: PriceBands;
}

export const PriceAnalysis: React.FC<PriceAnalysisProps> = ({ pricing }) => {
  const data = [
    { name: 'Great Price', value: pricing.low, color: '#22c55e' }, // green-500
    { name: 'Fair Market', value: pricing.median, color: '#64748b' }, // slate-500 (Neutral, replacing blue)
    { name: 'High Price', value: pricing.high, color: '#ef4444' }, // red-500
  ];

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          Market Price Analysis
        </h3>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <Info className="w-4 h-4" />
          <span>Based on mock market data</span>
        </div>
      </div>

      {/* Key Numbers Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="p-3 bg-green-50 rounded-lg border border-green-100">
          <span className="block text-xs font-semibold text-green-700 uppercase tracking-wider">Great Price</span>
          <span className="block text-lg md:text-xl font-bold text-green-800">{formatCurrency(pricing.low)}</span>
          <span className="text-xs text-green-600">Target this range</span>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
          <span className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Fair Market</span>
          <span className="block text-lg md:text-xl font-bold text-slate-800">{formatCurrency(pricing.median)}</span>
          <span className="text-xs text-slate-600">Most common</span>
        </div>
        <div className="p-3 bg-red-50 rounded-lg border border-red-100">
          <span className="block text-xs font-semibold text-red-700 uppercase tracking-wider">High Price</span>
          <span className="block text-lg md:text-xl font-bold text-red-800">{formatCurrency(pricing.high)}</span>
          <span className="text-xs text-red-600">Walk away</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="horizontal" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis 
              tickFormatter={(value) => `$${value / 1000}k`} 
              axisLine={false} 
              tickLine={false}
              domain={[Math.round(pricing.low * 0.8), 'auto']}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Estimated Price']}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            {pricing.msrp && (
                <ReferenceLine y={pricing.msrp} stroke="#666" strokeDasharray="3 3" label="MSRP" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {pricing.msrp && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 flex justify-between items-center">
            <span>MSRP: <strong>{formatCurrency(pricing.msrp)}</strong></span>
            {pricing.invoice && <span>Invoice: <strong>{formatCurrency(pricing.invoice)}</strong></span>}
        </div>
      )}
    </div>
  );
};