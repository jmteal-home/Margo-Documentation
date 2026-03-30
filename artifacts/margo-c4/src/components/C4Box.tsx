interface C4BoxProps {
  title: string;
  type?: string;
  description?: string;
  technology?: string;
  color?: "blue" | "gray" | "green" | "orange" | "purple" | "teal" | "red";
  external?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap: Record<
  NonNullable<C4BoxProps["color"]>,
  { bg: string; border: string; text: string; badge: string }
> = {
  blue: {
    bg: "bg-blue-700",
    border: "border-blue-800",
    text: "text-white",
    badge: "bg-blue-600 text-blue-100",
  },
  gray: {
    bg: "bg-gray-100",
    border: "border-gray-300",
    text: "text-gray-800",
    badge: "bg-gray-200 text-gray-600",
  },
  green: {
    bg: "bg-emerald-700",
    border: "border-emerald-800",
    text: "text-white",
    badge: "bg-emerald-600 text-emerald-100",
  },
  orange: {
    bg: "bg-orange-600",
    border: "border-orange-700",
    text: "text-white",
    badge: "bg-orange-500 text-orange-100",
  },
  purple: {
    bg: "bg-purple-700",
    border: "border-purple-800",
    text: "text-white",
    badge: "bg-purple-600 text-purple-100",
  },
  teal: {
    bg: "bg-teal-700",
    border: "border-teal-800",
    text: "text-white",
    badge: "bg-teal-600 text-teal-100",
  },
  red: {
    bg: "bg-red-700",
    border: "border-red-800",
    text: "text-white",
    badge: "bg-red-600 text-red-100",
  },
};

export function C4Box({
  title,
  type,
  description,
  technology,
  color = "blue",
  external = false,
  size = "md",
  className = "",
}: C4BoxProps) {
  const c = colorMap[color];
  const sizeClass =
    size === "sm"
      ? "w-36 min-h-[90px] p-2"
      : size === "lg"
      ? "w-56 min-h-[130px] p-4"
      : "w-44 min-h-[110px] p-3";

  const baseStyle = external
    ? "bg-gray-100 border-2 border-dashed border-gray-400 text-gray-700"
    : `${c.bg} ${c.border} ${c.text} border-2`;

  return (
    <div
      className={`${sizeClass} ${baseStyle} rounded-lg flex flex-col items-center justify-center text-center shadow-sm ${className}`}
    >
      {type && (
        <div
          className={`text-xs px-2 py-0.5 rounded mb-1.5 font-medium ${
            external ? "bg-gray-200 text-gray-500" : c.badge
          }`}
        >
          {type}
        </div>
      )}
      <div className="font-bold text-sm leading-tight">{title}</div>
      {technology && (
        <div
          className={`text-xs mt-1 italic ${
            external ? "text-gray-500" : "opacity-80"
          }`}
        >
          [{technology}]
        </div>
      )}
      {description && (
        <div
          className={`text-xs mt-1.5 leading-snug ${
            external ? "text-gray-600" : "opacity-90"
          }`}
        >
          {description}
        </div>
      )}
    </div>
  );
}
