import React from 'react';
import { NegotiationTip } from '../types';
import { Lightbulb } from 'lucide-react';

interface NegotiationTipsProps {
  tips: NegotiationTip[];
}

export const NegotiationTips: React.FC<NegotiationTipsProps> = ({ tips }) => {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        Pro Negotiation Strategy
      </h3>
      
      <div className="space-y-4">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-white/10 rounded-lg p-4 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-red-600 px-2 py-0.5 rounded text-white">
                {tip.category}
              </span>
              <h4 className="font-semibold text-white">{tip.title}</h4>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              {tip.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};