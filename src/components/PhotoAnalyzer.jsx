import React, { useEffect, useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';

export default function PhotoAnalyzer() {
  const [files, setFiles] = useState(() => {
    const raw = localStorage.getItem('photos');
    return raw ? JSON.parse(raw) : [];
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('photos', JSON.stringify(files));
  }, [files]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result;
      setPreview(url);
    };
    reader.readAsDataURL(file);
  };

  const analyze = async () => {
    if (!preview) return;
    setLoading(true);
    // Mock AI insights locally for privacy; a real app would call the backend.
    await new Promise((r) => setTimeout(r, 1200));
    const fakeInsights = {
      date: new Date().toISOString(),
      url: preview,
      summary: Math.random() > 0.5 ? 'Visible lean mass increase around shoulders and chest.' : 'Slight reduction in waist circumference; definition improving.',
      score: Math.round(70 + Math.random() * 20),
    };
    setFiles([fakeInsights, ...files]);
    setPreview(null);
    setLoading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <section className="rounded-xl bg-neutral-900/70 ring-1 ring-white/5 p-5 md:p-6">
      <div className="mb-4 flex items-center gap-2 text-white">
        <Camera className="h-5 w-5 text-red-500" />
        <h2 className="text-lg font-semibold">Progress Photos</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="block text-xs text-gray-400">Upload a progress photo</label>
          <input ref={inputRef} type="file" accept="image/*" onChange={onFile} className="mt-2 w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-red-600 file:px-3 file:py-2 file:text-white hover:file:bg-red-500" />
          {preview && (
            <div className="mt-4">
              <img src={preview} alt="preview" className="h-56 w-full rounded-lg object-cover" />
              <button onClick={analyze} disabled={loading} className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Analyze Photo
              </button>
            </div>
          )}
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-300">Timeline & Insights</h3>
          <div className="grid grid-cols-2 gap-3">
            {files.map((p, idx) => (
              <figure key={idx} className="overflow-hidden rounded-md bg-neutral-800/60 p-2">
                <img src={p.url} alt="progress" className="h-28 w-full rounded object-cover" />
                <figcaption className="mt-2 text-xs text-gray-300">
                  <div className="font-medium text-cyan-300">Score: {p.score}</div>
                  <div className="text-gray-400">{new Date(p.date).toLocaleDateString()}</div>
                  <div className="mt-1 text-[11px] text-gray-400">{p.summary}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
