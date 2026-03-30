import type { DiagramId } from "../App";

interface Props {
  diagrams: { id: DiagramId; label: string; description: string }[];
  active: DiagramId;
  onSelect: (id: DiagramId) => void;
}

export function DiagramNav({ diagrams, active, onSelect }: Props) {
  return (
    <nav className="lg:w-64 lg:min-h-full bg-white border-b lg:border-b-0 lg:border-r border-border">
      <div className="p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Diagrams
        </p>
        <ul className="space-y-1">
          {diagrams.map((d) => (
            <li key={d.id}>
              <button
                onClick={() => onSelect(d.id)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                  active === d.id
                    ? "bg-[hsl(220,70%,35%)] text-white"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                <div className="text-sm font-medium">{d.label}</div>
                <div
                  className={`text-xs mt-0.5 ${
                    active === d.id ? "text-blue-200" : "text-muted-foreground"
                  }`}
                >
                  {d.description}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
