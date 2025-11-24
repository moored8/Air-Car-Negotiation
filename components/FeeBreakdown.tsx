import React from 'react';
import { Fee, FeeType } from '../types';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface FeeBreakdownProps {
  fees: Fee[];
}

export const FeeBreakdown: React.FC<FeeBreakdownProps> = ({ fees }) => {
  const negotiableFees = fees.filter(f => f.type === FeeType.Negotiable);
  const fixedFees = fees.filter(f => f.type === FeeType.NonNegotiable);

  const formatRange = (low: number, high: number) => {
    if (low === high) return `$${low}`;
    return `$${low} - $${high}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-orange-600" />
        Fee Breakdown
      </h3>

      <div className="space-y-6">
        {/* Non-Negotiable Section */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4" /> Non-Negotiable (Must Pay)
          </h4>
          <div className="space-y-3">
            {fixedFees.map((fee, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{fee.name}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{fee.description}</p>
                </div>
                <span className="text-gray-700 font-semibold mt-2 sm:mt-0 whitespace-nowrap">
                  {formatRange(fee.amountLow, fee.amountHigh)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Negotiable Section */}
        <div>
          <h4 className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Negotiable (Fight These)
          </h4>
          <div className="space-y-3">
            {negotiableFees.map((fee, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-green-50 rounded-lg border border-green-100">
                <div>
                  <span className="font-medium text-gray-900">{fee.name}</span>
                  <p className="text-xs text-gray-600 mt-0.5">{fee.description}</p>
                </div>
                <div className="mt-2 sm:mt-0 text-right">
                   <span className="block text-green-800 font-bold whitespace-nowrap">{formatRange(fee.amountLow, fee.amountHigh)}</span>
                   <span className="text-[10px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full uppercase font-bold">Ask to remove</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};