import React, { useState, useEffect } from 'react';
import { VehicleQuery, Condition } from '../types';
import { MAKES, MODELS_BY_MAKE, YEARS } from '../constants';
import { Search, ChevronRight } from 'lucide-react';

interface CarFormProps {
  onSubmit: (query: VehicleQuery) => void;
  isLoading: boolean;
}

export const CarForm: React.FC<CarFormProps> = ({ onSubmit, isLoading }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [make, setMake] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [condition, setCondition] = useState<Condition>(Condition.New);
  const [zipCode, setZipCode] = useState<string>("");

  // Reset model when make changes
  useEffect(() => {
    setModel("");
  }, [make]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (make && model && zipCode.length >= 5) {
      onSubmit({ year, make, model, condition, zipCode });
    }
  };

  const isFormValid = make && model && zipCode.length >= 5;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Search className="w-6 h-6 text-red-600" />
        Start Your Analysis
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Condition & Year */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Condition & Year</label>
            <div className="flex gap-2">
              <select 
                value={condition}
                onChange={(e) => setCondition(e.target.value as Condition)}
                className="block w-1/2 rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-red-500 focus:border-red-500"
              >
                <option value={Condition.New}>New</option>
                <option value={Condition.Used}>Used</option>
              </select>
              <select 
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="block w-1/2 rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-red-500 focus:border-red-500"
              >
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Make */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Make</label>
            <select 
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="block w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Make</option>
              {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Model */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Model</label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!make}
              className="block w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">{make ? "Select Model" : "Select Make First"}</option>
              {make && MODELS_BY_MAKE[make]?.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location (ZIP)</label>
            <input 
              type="text" 
              inputMode="numeric" 
              maxLength={5}
              placeholder="e.g. 90210"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
              className="block w-full rounded-lg border-gray-300 border p-2.5 text-gray-900 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={!isFormValid || isLoading}
            className={`
              flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold text-white transition-all
              ${!isFormValid || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg'}
            `}
          >
            {isLoading ? 'Analyzing...' : 'Get Deal Analysis'}
            {!isLoading && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
};