'use client';

import { useState } from 'react';
import { RefreshCw, ExternalLink, Maximize2 } from 'lucide-react';

interface AppEmbedProps {
  title: string;
  url: string;
  accentColor: string;
}

export function AppEmbed({ title, url, accentColor }: AppEmbedProps) {
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 flex-shrink-0 rounded-t-lg"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderBottom: 'none' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
          <span className="font-mono text-xs" style={{ color: 'var(--color-text-2)' }}>{url}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setLoading(true); setKey(k => k + 1); }}
            className="transition-opacity hover:opacity-60"
            title="Reload"
          >
            <RefreshCw size={13} style={{ color: 'var(--color-text-3)' }} />
          </button>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="transition-opacity hover:opacity-60"
            title="Open in new tab">
            <ExternalLink size={13} style={{ color: 'var(--color-text-3)' }} />
          </a>
        </div>
      </div>

      {/* iframe */}
      <div className="relative flex-1 rounded-b-lg overflow-hidden"
        style={{ border: '1px solid var(--color-border)' }}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
            style={{ background: 'var(--color-surface)' }}>
            <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: `${accentColor} transparent transparent transparent` }} />
            <p className="font-mono text-xs" style={{ color: 'var(--color-text-3)' }}>Loading {title}…</p>
          </div>
        )}
        <iframe
          key={key}
          src={url}
          className="w-full h-full"
          style={{ border: 'none' }}
          onLoad={() => setLoading(false)}
          title={title}
        />
      </div>
    </div>
  );
}
