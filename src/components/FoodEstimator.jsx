import React, { useMemo, useState } from 'react';
import { Brain, CheckCircle2, Utensils } from 'lucide-react';

function estimateCalories(text) {
  // Simple heuristic calorie estimator using common foods; privacy-first local processing
  const db = {
    chicken: 165, // per 100g
    rice: 130,
    egg: 78, // per egg
    eggs: 78,
    banana: 105,
    apple: 95,
    oatmeal: 150, // per cup cooked
    bread: 80, // per slice
    peanut: 588, // per 100g
    peanut_butter: 588,
    milk: 60, // per 100ml
    yogurt: 60,
    pasta: 157, // per cup cooked
  };

  const tokens = text.toLowerCase().replace(/[^a-z0-9\s.]/g, ' ').split(/\s+/).filter(Boolean);

  let calories = 0;
  let notes = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === 'g' || t === 'grams') continue;
    const grams = parseFloat(t);
    if (!isNaN(grams) && (tokens[i + 1] === 'g' || tokens[i + 1] === 'grams')) {
      const food = tokens[i + 2];
      const key = (food === 'peanut' && tokens[i + 3] === 'butter') ? 'peanut_butter' : food;
      if (db[key]) {
        const kcal = (db[key] / 100) * grams;
        calories += kcal;
        notes.push(`${grams}g ${food} ≈ ${Math.round(kcal)} kcal`);
        i += (key === 'peanut_butter' ? 3 : 2);
        continue;
      }
    }
    const food = t;
    if (db[food]) {
      calories += db[food];
      notes.push(`${food} ≈ ${db[food]} kcal`);
    }
  }
  return { calories: Math.round(calories), notes };
}

export default function FoodEstimator() {
  const [text, setText] = useState('2 eggs, 150 g rice, 150 g chicken');
  const [log, setLog] = useState(() => {
    const raw = localStorage.getItem('food_log');
    return raw ? JSON.parse(raw) : [];
  });

  const { calories, notes } = useMemo(() => estimateCalories(text), [text]);

  const confirmAdd = () => {
    const entry = { id: Date.now(), date: new Date().toDateString(), text, calories };
    const next = [entry, ...log];
    setLog(next);
    localStorage.setItem('food_log', JSON.stringify(next));
  };

  const todayCalories = useMemo(() => {
    const today = new Date().toDateString();
    return log.filter(e => e.date === today).reduce((a, b) => a + b.calories, 0);
  }, [log]);

  return (
    <section className="rounded-xl bg-neutral-900/70 ring-1 ring-white/5 p-5 md:p-6">
      <div className="mb-4 flex items-center gap-2 text-white">
        <Utensils className="h-5 w-5 text-cyan-400" />
        <h2 className="text-lg font-semibold">AI Food Estimator</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-400">Describe your meal</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-md bg-neutral-800/70 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-cyan-400"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300 ring-1 ring-cyan-500/30">
              <Brain className="h-4 w-4" /> Estimated: <strong className="ml-1 text-white">{calories} kcal</strong>
            </span>
            <button onClick={confirmAdd} className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500">
              <CheckCircle2 className="h-4 w-4" /> Confirm & Add
            </button>
          </div>
          {notes.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-gray-300">
              {notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-1">
          <div className="rounded-lg bg-neutral-800/60 p-3">
            <div className="text-xs text-gray-400">Today's total</div>
            <div className="mt-1 text-3xl font-bold text-white">{todayCalories} kcal</div>
            <div className="mt-3 max-h-56 overflow-y-auto space-y-2">
              {log.map(item => (
                <div key={item.id} className="rounded-md bg-neutral-900/70 p-2 text-xs text-gray-300">
                  <div className="text-gray-400">{item.date}</div>
                  <div className="mt-1 text-[11px]">{item.text}</div>
                  <div className="mt-1 font-semibold text-cyan-300">+{item.calories} kcal</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
