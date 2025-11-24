import React, { useState, useEffect } from 'react';
import { Flame, ShieldCheck, Smartphone } from 'lucide-react';
import { VehicleQuery, DealAnalysisResult } from './types';
import { fetchPricingData } from './services/pricingService';
import { getFeeBreakdown } from './services/feeService';
import { getInterestRates, getIncentives } from './services/financeService';
import { generateNegotiationTips } from './services/adviceService';
import { CarForm } from './components/CarForm';
import { PriceAnalysis } from './components/PriceAnalysis';
import { FeeBreakdown } from './components/FeeBreakdown';
import { Financials } from './components/Financials';
import { NegotiationTips } from './components/NegotiationTips';
import { LandingPage } from './components/LandingPage';
import { AdSection } from './components/AdSection';
import { InstallModal } from './components/InstallModal';

const STORAGE_KEY = 'air_drive_access_granted';

const App: React.FC = () => {
  // State to gate the app behind the landing page
  // Check localStorage on initial load to see if user opted to be remembered
  const [hasAccess, setHasAccess] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DealAnalysisResult | null>(null);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  const handleSignup = (email: string, rememberMe: boolean) => {
    // In a real app, you would POST this email to your backend
    if (email !== 'guest') {
        console.log("User signed up:", email);
    } else {
        console.log("Guest access requested");
    }
    
    if (rememberMe && email !== 'guest') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
    
    setHasAccess(true);
  };

  const handleAnalysis = async (query: VehicleQuery) => {
    setIsLoading(true);
    setResult(null);

    try {
      // Run all service calls in parallel
      // In a real app, these would be actual API endpoints
      const pricing = await fetchPricingData(query);
      const fees = getFeeBreakdown(query);
      const rates = getInterestRates(query);
      const incentives = getIncentives(query);
      const tips = generateNegotiationTips(query, pricing);

      const analysisResult: DealAnalysisResult = {
        query,
        pricing,
        fees,
        rates,
        incentives,
        tips
      };

      setResult(analysisResult);
    } catch (error) {
      console.error("Failed to analyze deal", error);
      alert("Something went wrong while fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render Landing Page if user hasn't signed up yet
  if (!hasAccess) {
    return <LandingPage onSignup={handleSignup} />;
  }

  // Render Main Application
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-600 fill-red-600" />
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight text-red-600">AIR</span>
              <span className="text-xl font-extrabold tracking-tight text-black">Drive</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowInstallModal(true)}
              className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 text-sm font-medium px-3 py-1.5 transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Get Mobile App</span>
              <span className="sm:hidden">App</span>
            </button>

            <div className="hidden md:flex items-center gap-1 text-green-700 bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Consumer First</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Don't overpay for your next car.
          </h2>
          <p className="text-lg text-gray-600">
            Get real market values, uncover hidden fees, and generate a personalized negotiation strategy in seconds.
          </p>
        </div>

        {/* Input Section */}
        <CarForm onSubmit={handleAnalysis} isLoading={isLoading} />

        {/* Results Section */}
        {result && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-200 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Analysis for {result.query.year} {result.query.make} {result.query.model}
                </h2>
                <p className="text-gray-500">
                  {result.query.condition} vehicle in ZIP {result.query.zipCode}
                </p>
              </div>
              <button 
                onClick={() => window.print()}
                className="text-sm text-red-600 hover:text-red-800 font-medium underline"
              >
                Print / Save Report
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Price & Fees (2 cols wide) */}
              <div className="lg:col-span-2 space-y-8">
                <PriceAnalysis pricing={result.pricing} />
                <FeeBreakdown fees={result.fees} />
              </div>

              {/* Right Column: Tips & Finance (1 col wide) */}
              <div className="space-y-8">
                <NegotiationTips tips={result.tips} />
                <Financials rates={result.rates} incentives={result.incentives} />
              </div>
            </div>

            {/* Ads Section - Now Dynamic */}
            <AdSection query={result.query} pricing={result.pricing} />
          </div>
        )}
      </main>
      
      <footer className="border-t border-gray-200 mt-12 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} AIR Drive. All data mocked for prototype purposes.</p>
        </div>
      </footer>

      <InstallModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
    </div>
  );
};

export default App;