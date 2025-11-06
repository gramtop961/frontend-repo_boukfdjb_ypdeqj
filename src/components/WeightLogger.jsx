import React, { useMemo, useState } from 'react';
import { Scale, Save } from 'lucide-react';

export default function WeightLogger() {
  const [entries, setEntries] = useState(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('weights') : null;
    return raw ? JSON.parse(raw) : [];
  });
  const [weight, setWeight] = useState('');
  const [week, setWeek] = useState('');

  const addEntry = () => {
    if (!weight || !week) return;
    const next = [...entries, { week, weight: parseFloat(weight) }].sort((a, b) => a.week.localeCompare(b.week));
    setEntries(next);
    if (typeof window !== 'undefined') localStorage.setItem('weights', JSON.stringify(next));
    setWeight('');
    setWeek('');
  };

  const chart = useMemo(() => {
    if (entries.length === 0) return { points: '', min: 0, max: 0, labels: [] };
    const values = entries.map(e => e.weight);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = 8;
    const W = 600;
    const H = 220;
    const range = max - min || 1;
    const stepX = entries.length > 1 ? (W - pad * 2) / (entries.length - 1) : 0;
    const points = entries.map((e, i) => {
      const x = pad + i * stepX;
      const y = H - pad - ((e.weight - min) / range) * (H - pad * 2);
      return `${x},${y}`;
    }).join(' ');
    return { points, min, max, W, H, pad, labels: entries.map(e => e.week) };
  }, [entries]);

  return (
    <section id="track" className="rounded-xl bg-neutral-900/70 ring-1 ring-white/5 p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Scale className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-semibold">Weekly Weight</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-1 space-y-3">
          <label className="block">
            <span className="text-xs text-gray-400">Week (e.g., 2025-W45)</span>
            <input
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              placeholder="YYYY-Www"
              className="mt-1 w-full rounded-md bg-neutral-800/70 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-cyan-400"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400">Weight (kg)</span>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="72.4"
              className="mt-1 w-full rounded-md bg-neutral-800/70 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-cyan-400"
            />
          </label>
          <button
            onClick={addEntry}
            className="inline-flex items-center gap-2 rounded-md bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/30 hover:bg-cyan-500/30"
          >
            <Save className="h-4 w-4" /> Save Week
          </button>
          <p className="text-xs text-gray-400">Data is saved locally in your browser.</p>
        </div>
        <div className="md:col-span-2">
          <div className="h-64 w-full rounded-md bg-neutral-800/50 p-3">
            {entries.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-gray-400">No data yet. Add your first week.</div>
            ) : (
              <svg viewBox={`0 0 ${chart.W} ${chart.H}`} className="h-full w-full">
                <defs>
                  <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
                    <stop offset="100%" stopColor="rgba(34,211,238,0.02)" />
                  </linearGradient>
                </defs>
                <polyline fill="none" stroke="#22d3ee" strokeWidth="2" points={chart.points} />
                {(() => {
                  const [firstX] = chart.points.split(' ')[0].split(',').map(Number);
                  const [lastX] = chart.points.split(' ').slice(-1)[0].split(',').map(Number);
                  const baseY = chart.H - chart.pad;
                  return (
                    <polygon
                      fill="url(#grad)"
                      points={`${firstX},${baseY} ${chart.points} ${lastX},${baseY}`}
                    />
                  );
                })()}
                {chart.labels.map((lbl, i) => {
                  const [x, y] = chart.points.split(' ')[i].split(',').map(Number);
                  return (
                    <g key={lbl}>
                      <circle cx={x} cy={y} r="3" fill="#22d3ee" />
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
