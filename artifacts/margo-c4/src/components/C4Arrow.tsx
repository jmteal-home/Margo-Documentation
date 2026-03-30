interface C4ArrowProps {
  label?: string;
  technology?: string;
  direction?: "right" | "left" | "down" | "up";
  bidirectional?: boolean;
  length?: number;
  className?: string;
  dashed?: boolean;
}

export function C4Arrow({
  label,
  technology,
  direction = "right",
  bidirectional = false,
  length,
  className = "",
  dashed = false,
}: C4ArrowProps) {
  const isVertical = direction === "down" || direction === "up";
  const lineClass = dashed ? "border-dashed" : "";

  if (isVertical) {
    const h = length ?? 56;
    return (
      <div className={`flex flex-col items-center ${className}`} style={{ height: `${h}px` }}>
        {/* Top arrowhead for up or bidirectional-down */}
        {(direction === "up" || bidirectional) && (
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-gray-400 flex-shrink-0" />
        )}
        <div className={`flex flex-col items-center flex-1 ${label || technology ? "justify-center" : ""}`}>
          <div className={`w-px flex-1 border-l border-gray-400 ${lineClass}`} />
          {(label || technology) && (
            <div className="bg-white border border-gray-200 rounded px-2 py-0.5 text-center my-1 shadow-sm flex-shrink-0 max-w-[160px]">
              {label && <div className="text-[10px] font-medium text-gray-600 leading-tight">{label}</div>}
              {technology && <div className="text-[9px] text-gray-400 italic leading-tight">[{technology}]</div>}
            </div>
          )}
          <div className={`w-px flex-1 border-l border-gray-400 ${lineClass}`} />
        </div>
        {/* Bottom arrowhead for down or bidirectional-up */}
        {(direction === "down" || bidirectional) && (
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-gray-400 flex-shrink-0" />
        )}
      </div>
    );
  }

  // Horizontal
  const w = length ?? 80;
  return (
    <div className={`flex flex-row items-center ${className}`} style={{ width: `${w}px` }}>
      {/* Left arrowhead for left or bidirectional-right */}
      {(direction === "left" || bidirectional) && (
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px] border-r-gray-400 flex-shrink-0" />
      )}
      <div className={`flex flex-row items-center flex-1 ${label || technology ? "justify-center" : ""}`}>
        <div className={`h-px flex-1 border-t border-gray-400 ${lineClass}`} />
        {(label || technology) && (
          <div className="bg-white border border-gray-200 rounded px-2 py-0.5 text-center mx-1 shadow-sm flex-shrink-0 max-w-[140px]">
            {label && <div className="text-[10px] font-medium text-gray-600 leading-tight">{label}</div>}
            {technology && <div className="text-[9px] text-gray-400 italic leading-tight">[{technology}]</div>}
          </div>
        )}
        <div className={`h-px flex-1 border-t border-gray-400 ${lineClass}`} />
      </div>
      {/* Right arrowhead for right or bidirectional-left */}
      {(direction === "right" || bidirectional) && (
        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-gray-400 flex-shrink-0" />
      )}
    </div>
  );
}
