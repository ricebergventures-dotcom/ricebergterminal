export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-2 mb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: 'var(--color-text-3)' }}>
        {String(children).toUpperCase()}
      </span>
    </div>
  );
}
