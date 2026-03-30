interface C4BoxProps {
  title: string;
  subtitle?: string;
  description?: string;
  technology?: string;
  variant?: "person" | "system" | "container" | "component" | "database" | "external";
  color?: "blue" | "slate" | "emerald" | "orange" | "violet" | "teal" | "rose" | "amber";
  width?: number;
}

const colorStyles: Record<
  NonNullable<C4BoxProps["color"]>,
  { header: string; border: string; dot: string }
> = {
  blue:    { header: "bg-blue-700",    border: "border-blue-700",   dot: "bg-blue-400" },
  slate:   { header: "bg-slate-600",   border: "border-slate-600",  dot: "bg-slate-400" },
  emerald: { header: "bg-emerald-700", border: "border-emerald-700",dot: "bg-emerald-400" },
  orange:  { header: "bg-orange-600",  border: "border-orange-600", dot: "bg-orange-400" },
  violet:  { header: "bg-violet-700",  border: "border-violet-700", dot: "bg-violet-400" },
  teal:    { header: "bg-teal-700",    border: "border-teal-700",   dot: "bg-teal-400" },
  rose:    { header: "bg-rose-700",    border: "border-rose-700",   dot: "bg-rose-400" },
  amber:   { header: "bg-amber-600",   border: "border-amber-600",  dot: "bg-amber-400" },
};

const variantIcons: Record<NonNullable<C4BoxProps["variant"]>, string> = {
  person:    "👤",
  system:    "⬡",
  container: "▭",
  component: "◫",
  database:  "⛁",
  external:  "○",
};

export function C4Box({
  title,
  subtitle,
  description,
  technology,
  variant = "system",
  color = "blue",
  width = 180,
}: C4BoxProps) {
  const isExternal = variant === "external";

  if (isExternal) {
    return (
      <div
        className="flex flex-col rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 overflow-hidden shadow-sm"
        style={{ width: `${width}px` }}
      >
        <div className="px-3 pt-3 pb-2 flex flex-col items-center gap-1 flex-1">
          <span className="text-lg text-gray-400">{variantIcons[variant]}</span>
          {subtitle && (
            <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 text-center">
              {subtitle}
            </div>
          )}
          <div className="font-bold text-sm text-gray-700 text-center leading-snug">{title}</div>
          {technology && (
            <div className="text-[10px] text-gray-400 italic text-center">[{technology}]</div>
          )}
          {description && (
            <div className="text-[11px] text-gray-500 text-center leading-snug mt-1">{description}</div>
          )}
        </div>
      </div>
    );
  }

  const c = colorStyles[color];

  return (
    <div
      className={`flex flex-col rounded-lg border-2 ${c.border} bg-white overflow-hidden shadow-sm`}
      style={{ width: `${width}px` }}
    >
      {/* Colored header band */}
      <div className={`${c.header} px-3 py-2 flex items-center gap-1.5`}>
        <span className="text-white text-sm opacity-90">{variantIcons[variant]}</span>
        {subtitle && (
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white opacity-90">
            {subtitle}
          </span>
        )}
      </div>
      {/* Body */}
      <div className="px-3 pt-2 pb-3 flex flex-col gap-1 bg-white flex-1">
        <div className="font-bold text-sm text-gray-900 leading-snug">{title}</div>
        {technology && (
          <div className="text-[10px] text-gray-500 italic">[{technology}]</div>
        )}
        {description && (
          <div className="text-[11px] text-gray-600 leading-snug mt-0.5">{description}</div>
        )}
      </div>
    </div>
  );
}
