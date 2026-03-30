interface DiagramFrameProps {
  title: string;
  level: string;
  description: string;
  children: React.ReactNode;
  legend?: { color: string; label: string }[];
}

export function DiagramFrame({
  title,
  level,
  description,
  children,
  legend,
}: DiagramFrameProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
            {level}
          </span>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-sm overflow-auto">
        <div className="p-6 min-w-[700px]">{children}</div>
      </div>

      {legend && legend.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded ${item.color}`}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-100 border-2 border-dashed border-gray-400" />
            <span className="text-muted-foreground">External / Out of Scope</span>
          </div>
        </div>
      )}
    </div>
  );
}
