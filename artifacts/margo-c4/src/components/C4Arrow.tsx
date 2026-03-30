interface C4ArrowProps {
  label?: string;
  technology?: string;
  direction?: "right" | "left" | "down" | "up";
  className?: string;
  bidirectional?: boolean;
}

export function C4Arrow({
  label,
  technology,
  direction = "right",
  className = "",
  bidirectional = false,
}: C4ArrowProps) {
  const isVertical = direction === "down" || direction === "up";

  if (isVertical) {
    return (
      <div
        className={`flex flex-col items-center justify-center my-1 ${className}`}
      >
        {direction === "up" && (
          <div className="text-gray-400 text-lg leading-none">▲</div>
        )}
        {bidirectional && direction === "down" && (
          <div className="text-gray-400 text-lg leading-none">▲</div>
        )}
        <div className="w-0.5 bg-gray-400 min-h-[32px] flex-1" />
        {label && (
          <div className="text-xs text-gray-600 font-medium text-center px-1 py-0.5 bg-white border border-gray-200 rounded my-1 max-w-[120px]">
            {label}
            {technology && (
              <span className="block text-gray-400 italic">[{technology}]</span>
            )}
          </div>
        )}
        <div className="w-0.5 bg-gray-400 min-h-[32px] flex-1" />
        {direction === "down" && (
          <div className="text-gray-400 text-lg leading-none">▼</div>
        )}
        {bidirectional && direction === "up" && (
          <div className="text-gray-400 text-lg leading-none">▼</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-row items-center justify-center mx-1 ${className}`}
    >
      {direction === "left" && (
        <div className="text-gray-400 text-lg leading-none">◀</div>
      )}
      {bidirectional && direction === "right" && (
        <div className="text-gray-400 text-lg leading-none">◀</div>
      )}
      <div className="h-0.5 bg-gray-400 min-w-[24px] flex-1" />
      {label && (
        <div className="text-xs text-gray-600 font-medium text-center px-1 py-0.5 bg-white border border-gray-200 rounded mx-1 whitespace-nowrap">
          {label}
          {technology && (
            <span className="block text-gray-400 italic">[{technology}]</span>
          )}
        </div>
      )}
      <div className="h-0.5 bg-gray-400 min-w-[24px] flex-1" />
      {direction === "right" && (
        <div className="text-gray-400 text-lg leading-none">▶</div>
      )}
      {bidirectional && direction === "left" && (
        <div className="text-gray-400 text-lg leading-none">▶</div>
      )}
    </div>
  );
}
