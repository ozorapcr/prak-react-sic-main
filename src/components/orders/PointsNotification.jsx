import React, { useState, useEffect } from 'react';

export default function PointsNotification({ points, totalPoints, tier, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div className="bg-white rounded-lg shadow-2xl p-6 border-l-4 border-green-500 animate-slide-in">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              🎉
            </div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">Selamat!</h3>
            <p className="text-sm text-gray-600">
              Anda mendapatkan <span className="font-bold text-green-600">{points} poin</span> 
            </p>
            <p className="text-sm text-gray-500">
              Total poin sekarang: <span className="font-bold">{totalPoints}</span>
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {tier}
              </span>
            </div>
            <button 
              onClick={() => { setVisible(false); if (onClose) onClose(); }}
              className="mt-3 text-sm text-gray-400 hover:text-gray-600"
            >
              Tutup ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}