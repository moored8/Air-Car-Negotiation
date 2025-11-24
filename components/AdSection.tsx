import React from 'react';
import { VehicleQuery, PriceBands } from '../types';
import { ExternalLink, MapPin, BadgeCheck, Car } from 'lucide-react';

interface AdSectionProps {
  query?: VehicleQuery;
  pricing?: PriceBands;
}

export const AdSection: React.FC<AdSectionProps> = ({ query, pricing }) => {
  // Fallback if no query provided (shouldn't happen in flow, but good for safety)
  if (!query || !pricing) return null;

  const { year, make, model, zipCode } = query;

  // Generate 3 mock listings that align with the analysis
  const ads = [
    {
      id: 1,
      dealer: `${make} of ${zipCode || 'City'}`,
      title: `${year} ${make} ${model}`,
      trim: "Base / SR5",
      price: pricing.low + 450, // Slightly above absolute low
      mileage: query.condition === 'New' ? '5 miles' : '42,000 miles',
      distance: "3.2 mi away",
      tag: "Great Price",
      tagColor: "bg-green-100 text-green-800",
      imageColor: "bg-gray-200"
    },
    {
      id: 2,
      dealer: `AutoNation ${make}`,
      title: `${year} ${make} ${model}`,
      trim: "Premium Pkg",
      price: pricing.median - 200, // Right around market average
      mileage: query.condition === 'New' ? '12 miles' : '36,500 miles',
      distance: "8.5 mi away",
      tag: "Verified",
      tagColor: "bg-blue-100 text-blue-800",
      imageColor: "bg-slate-200"
    },
    {
      id: 3,
      dealer: `CarMax ${zipCode ? zipCode.slice(0,3) : 'Metro'}`,
      title: `${year} ${make} ${model}`,
      trim: "Limited / Touring",
      price: pricing.high - 800, // Higher end trim
      mileage: query.condition === 'New' ? '3 miles' : '12,000 miles',
      distance: "15 mi away",
      tag: "Certified Pre-Owned", // Mocking CPO for used, or just Premium for new
      tagColor: "bg-purple-100 text-purple-800",
      imageColor: "bg-zinc-200"
    }
  ];

  const formatPrice = (p: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  // Helper to generate a real search URL for the prototype
  const getSearchUrl = (adTitle: string) => {
    const searchQuery = `${adTitle} for sale near me ${zipCode || ''}`;
    return `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-red-600" />
          Found 3 Listings Near You
        </h3>
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Sponsored Results</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <a 
            key={ad.id} 
            href={getSearchUrl(ad.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all group cursor-pointer overflow-hidden flex flex-col block"
          >
             {/* Mock Image Area */}
             <div className={`h-40 w-full ${ad.imageColor} flex items-center justify-center relative group-hover:opacity-95 transition-opacity`}>
                <Car className="w-16 h-16 text-gray-400/50" />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  {ad.mileage}
                </div>
                <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded ${ad.tagColor}`}>
                  {ad.tag}
                </div>
             </div>

             <div className="p-4 flex flex-col flex-grow">
                <div className="mb-1">
                   <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">{ad.title}</h4>
                   <p className="text-sm text-gray-500">{ad.trim}</p>
                </div>
                
                <div className="mt-3 mb-4">
                  <span className="text-2xl font-extrabold text-gray-900">{formatPrice(ad.price)}</span>
                </div>

                <div className="mt-auto space-y-3">
                   <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium text-gray-700 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {ad.dealer}
                      </span>
                      <span>{ad.distance}</span>
                   </div>
                   
                   <div className="w-full py-2.5 bg-red-600 text-white rounded-lg font-semibold text-sm group-hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      Check Availability <ExternalLink className="w-3 h-3" />
                   </div>
                </div>
             </div>
          </a>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-6">
        * Listings are simulated for prototype demonstration. Links open a Google Search for this vehicle.
      </p>
    </div>
  );
};