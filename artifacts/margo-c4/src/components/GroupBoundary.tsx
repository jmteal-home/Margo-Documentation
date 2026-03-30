interface GroupBoundaryProps {
  title: string;
  children: React.ReactNode;
  dashed?: boolean;
  color?: string;
  borderColor?: string;
  className?: string;
}

export function GroupBoundary({
  title,
  children,
  dashed = false,
  color = "bg-transparent",
  borderColor = "border-blue-300",
  className = "",
}: GroupBoundaryProps) {
  return (
    <div
      className={`relative border-2 ${dashed ? "border-dashed" : "border-solid"} ${borderColor} ${color} rounded-xl p-5 pt-7 ${className}`}
    >
      {/* Label badge */}
      <div className={`absolute -top-3 left-4 px-3 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border-2 ${borderColor} bg-white text-gray-700`}>
        {title}
      </div>
      {children}
    </div>
  );
}
