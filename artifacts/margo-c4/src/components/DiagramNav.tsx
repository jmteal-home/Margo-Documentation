import type { DiagramId } from "../App";

interface NavDiagram {
  id: DiagramId;
  label: string;
  description: string;
  badge?: string;
}

interface Props {
  diagrams: NavDiagram[];
  active: DiagramId;
  onSelect: (id: DiagramId) => void;
}

const badgeColors: Record<string, string> = {
  C4: "bg-blue-100 text-blue-700",
  Concept: "bg-teal-100 text-teal-700",
  Sequence: "bg-violet-100 text-violet-700",
};

export function DiagramNav({ diagrams, active, onSelect }: Props) {
  return (
    <nav className="w-64 flex-shrink-0 bg-white border-r border-border overflow-y-auto">
      <div className="p-4">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1">
          Diagrams
        </p>
        <ul className="space-y-1">
          {diagrams.map((d) => {
            const isActive = active === d.id;
            return (
              <li key={d.id}>
                <button
                  onClick={() => onSelect(d.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[hsl(222,72%,30%)] text-white shadow-sm"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold leading-snug flex-1">{d.label}</span>
                    {d.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : (badgeColors[d.badge] ?? "bg-gray-100 text-gray-600")
                        }`}
                      >
                        {d.badge}
                      </span>
                    )}
                  </div>
                  <div className={`text-xs mt-0.5 leading-snug ${isActive ? "text-blue-200" : "text-muted-foreground"}`}>
                    {d.description}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Footer links */}
        <div className="mt-6 pt-4 border-t border-border space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1 mb-2">
            Resources
          </p>
          {[
            { label: "Spec Overview", url: "https://docs.margo.org/spec/overview/" },
            { label: "GitHub Specification", url: "https://github.com/margo/specification" },
            { label: "API Reference (OpenAPI)", url: "https://github.com/margo/specification/tree/main/spec" },
            { label: "C4 Model", url: "https://c4model.com/" },
          ].map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground px-1 py-0.5 transition-colors"
            >
              <span className="text-gray-400">↗</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
