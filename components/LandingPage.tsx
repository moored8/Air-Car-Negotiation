import React, { useState } from 'react';
import { DollarSign, FileWarning, ChevronRight, CheckCircle2, Flame, Map, UserCircle2, Smartphone } from 'lucide-react';
import { InstallModal } from './InstallModal';

interface LandingPageProps {
  onSignup: (email: string, rememberMe: boolean) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      onSignup(email, rememberMe);
    }
  };

  const handleSkip = () => {
    onSignup('guest', false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-600 fill-red-600" />
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="text-red-600">AIR</span>
            <span className="text-black">Drive</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
           <button 
              onClick={() => setShowInstallModal(true)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-red-600 text-sm font-medium transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              <span className="hidden sm:inline">Get Mobile App</span>
              <span className="sm:hidden">App</span>
            </button>
            <div className="hidden md:block w-px h-4 bg-gray-300"></div>
            <div className="hidden md:block text-sm text-gray-500 font-medium">
              Beta Access
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-16 sm:pb-24 lg:pb-32 flex-grow">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Stop Overpaying.<br />
            <span className="text-red-600">Master the Deal.</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10">
            The professional tool for consumers to evaluate car prices, uncover hidden fees, and negotiate like an expert.
          </p>

          {/* Email Form */}
          <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-8 text-left">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors whitespace-nowrap"
                    >
                    Get Access
                    <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className="w-4 h-4 border border-gray-300 rounded bg-white peer-checked:bg-red-600 peer-checked:border-red-600 transition-colors"></div>
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">Keep me signed in</span>
                </label>
              </div>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-400">or</span>
                </div>
            </div>

            <button 
                type="button"
                onClick={handleSkip}
                className="w-full py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all flex items-center justify-center gap-2"
            >
                <UserCircle2 className="w-4 h-4" />
                Continue as Guest (Beta)
            </button>
            
            <div className="mt-4 text-center">
                <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-green-500" />
                Free for early customers. No credit card required.
                </span>
            </div>
          </div>
        </div>

        {/* Decorative background blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
           <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">National Market Data</h3>
              <p className="text-gray-600 leading-relaxed">
                See best prices around the country. We analyze thousands of listings to show you the Low, Median, and High price bands for your specific vehicle.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <FileWarning className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fee Transparency</h3>
              <p className="text-gray-600 leading-relaxed">
                Know exactly what fees are negotiable. We break down Dealer Doc Fees, add-ons, and taxes so you never pay for "junk" fees again.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Map className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Strategy</h3>
              <p className="text-gray-600 leading-relaxed">
                Get expert negotiation tips tailored to the vehicle's age and your location. Walk into the dealership with a winning game plan.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer area for landing page */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center">
                 {/* Placeholder for the User's Logo - Using Icon + Text representation */}
                 <Flame className="w-12 h-12 text-red-600 fill-red-500 mb-2" />
                 <div className="text-3xl font-extrabold tracking-tight">
                    <span className="text-red-600">AIR</span>
                    <span className="text-black">Drive</span>
                 </div>
                 <span className="text-xs text-gray-400 font-medium tracking-[0.3em] mt-1 uppercase">AI Resources</span>
            </div>
            
            <p className="text-gray-400 text-sm mt-8">
                &copy; {new Date().getFullYear()} AIR Drive. Empowering Car Buyers Everywhere.
            </p>
        </div>
      </div>

      <InstallModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
    </div>
  );
};