import React from 'react';
import { X, Share, MoreVertical, PlusSquare, Smartphone, Menu } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="bg-red-600 p-6 text-white flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Smartphone className="w-6 h-6" />
              Install AIR Drive
            </h3>
            <p className="text-red-100 text-sm mt-1">Add to your home screen for the best experience.</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* iOS Instructions */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">iPhone / iPad</span>
            </h4>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="font-bold text-red-600">1.</span>
                <span>Tap the <strong className="text-gray-900">Share</strong> button in Safari.</span>
                <Share className="w-5 h-5 text-blue-500" />
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-red-600">2.</span>
                <span>Scroll down and tap <strong className="text-gray-900">Add to Home Screen</strong>.</span>
                <PlusSquare className="w-5 h-5 text-gray-500" />
              </li>
            </ol>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Android Instructions */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">Android</span>
            </h4>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <span className="font-bold text-red-600">1.</span>
                <span>Tap the <strong className="text-gray-900">Menu</strong> (3 dots) in Chrome.</span>
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-red-600">2.</span>
                <span>Select <strong className="text-gray-900">Install App</strong> or <strong className="text-gray-900">Add to Home screen</strong>.</span>
                <Smartphone className="w-5 h-5 text-gray-500" />
              </li>
            </ol>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};