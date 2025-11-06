import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyNote() {
  return (
    <section className="rounded-xl bg-neutral-900/70 ring-1 ring-white/5 p-5 md:p-6">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-cyan-500/20 p-2 ring-1 ring-cyan-500/30">
          <Shield className="h-4 w-4 text-cyan-300" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Privacy-focused storage</h3>
          <p className="mt-1 text-sm leading-relaxed text-gray-300">
            Your weight entries, photos, and food logs are stored locally in your browser for this demo. No data leaves your device. Connect to a secure backend later for cloud sync.
          </p>
        </div>
      </div>
    </section>
  );
}
