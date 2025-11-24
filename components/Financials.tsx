import React from 'react';
import { Incentive, InterestRate } from '../types';
import { Percent, Tag } from 'lucide-react';

interface FinancialsProps {
  rates: InterestRate[];
  incentives: Incentive[];
}

export const Financials: React.FC<FinancialsProps> = ({ rates, incentives }) => {
  return (
    <div className="space-y-6">
      {/* Interest Rates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Percent className="w-5 h-5 text-red-600" />
          Estimated APR Rates
        </h3>
        <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Score</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. APR</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rates.map((rate, idx) => (
                        <tr key={idx}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{rate.scoreTier}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{rate.aprLow}% - {rate.aprHigh}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <p className="text-xs text-gray-400 mt-3 italic">* Sample rates based on region and vehicle type. Real rates vary by lender.</p>
      </div>

      {/* Incentives */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-purple-600" />
          Available Incentives
        </h3>
        {incentives.length > 0 ? (
            <div className="space-y-3">
                {incentives.map((item, idx) => (
                    <div key={idx} className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-purple-900">{item.title}</h4>
                                <p className="text-sm text-purple-800 mt-1">{item.description}</p>
                            </div>
                            {item.amount && (
                                <span className="bg-purple-200 text-purple-900 text-xs font-bold px-2 py-1 rounded">
                                    ${item.amount}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-500 italic text-sm">No specific manufacturer incentives found for this vehicle configuration.</p>
        )}
      </div>
    </div>
  );
};