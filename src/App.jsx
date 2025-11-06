import React from 'react';
import Hero3D from './components/Hero3D';
import WeightLogger from './components/WeightLogger';
import PhotoAnalyzer from './components/PhotoAnalyzer';
import FoodEstimator from './components/FoodEstimator';

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero3D />

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 gap-6">
          <WeightLogger />
          <PhotoAnalyzer />
          <FoodEstimator />
        </div>
        <footer className="pt-6 text-center text-xs text-gray-500">
          Built for disciplined training • Black / Red / Neon Blue • Privacy-first (local storage)
        </footer>
      </main>
    </div>
  );
}

export default App;
