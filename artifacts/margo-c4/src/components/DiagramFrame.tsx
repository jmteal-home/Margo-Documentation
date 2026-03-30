interface LegendItem {
  color: string;
  label: string;
  dashed?: boolean;
}

interface Reference {
  label: string;
  url: string;
}

interface DiagramFrameProps {
  title: string;
  level: string;
  levelColor?: string;
  description: string;
  children: React.ReactNode;
  legend?: LegendItem[];
  references?: Reference[];
  minWidth?: number;
}

export function DiagramFrame({
  title,
  level,
  levelColor = "bg-blue-100 text-blue-800",
  description,
  children,
  legend,
  references,
  minWidth = 900,
}: DiagramFrameProps) {
  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${levelColor}`}>
            {level}
          </span>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">{description}</p>
      </div>

      {/* Legend */}
      {legend && legend.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className={`w-5 h-5 rounded flex-shrink-0 ${
                  item.dashed
                    ? "border-2 border-dashed border-gray-400 bg-gray-100"
                    : item.color
                }`}
              />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border-2 border-dashed border-gray-400 bg-gray-50 flex-shrink-0" />
            <span className="text-xs text-muted-foreground">External / Out of Margo Scope</span>
          </div>
        </div>
      )}

      {/* Diagram canvas — scrollable in both directions */}
      <div className="diagram-scroll border border-border rounded-xl shadow-sm bg-white">
        <div style={{ minWidth: `${minWidth}px` }} className="p-6">
          {children}
        </div>
      </div>

      {/* References */}
      {references && references.length > 0 && (
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Specification References
          </p>
          <ul className="space-y-1">
            {references.map((ref) => (
              <li key={ref.url} className="flex items-start gap-2">
                <span className="text-muted-foreground text-xs mt-0.5">↗</span>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-700 hover:text-blue-900 hover:underline underline-offset-2 transition-colors"
                >
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
