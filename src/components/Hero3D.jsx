import React from 'react';
import Spline from '@splinetool/react-spline';
import { Brain, Flame } from 'lucide-react';

export default function Hero3D() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,255,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,0,0,0.12),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,149,255,0.12),transparent_40%)]" />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-cyan-300">
            <Brain className="h-4 w-4" />
            <span className="text-xs tracking-wide">AI-powered • Privacy-first</span>
          </div>
          <h1 className="font-bold leading-tight text-white" style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
            Train with Discipline. Track with Intelligence.
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-300">
            A modern gym tracker that learns from your progress. Log weights, analyze photos, and estimate calories with a clean, motivating dark interface.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#track" className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-500">
              <Flame className="h-4 w-4" /> Start Tracking
            </a>
            <span className="text-xs text-gray-400">Black • Red • Neon Blue aesthetic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
