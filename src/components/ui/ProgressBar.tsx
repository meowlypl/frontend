interface ProgressBarProps {
  value: number;
  max: number;
  height?: number;
  color?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  max,
  height = 14,
  color = "#f97316",
  showLabel = true,
  animated = true,
}: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">

      {showLabel && (
        <div className="mb-2 flex justify-between text-sm font-bold text-slate-600">
          <span>{value} XP</span>
          <span>{max} XP</span>
        </div>
      )}

      <div
        className="overflow-hidden rounded-full bg-orange-100"
        style={{ height }}
      >
        <div
          className={`rounded-full ${
            animated ? "transition-all duration-700 ease-out" : ""
          }`}
          style={{
            width: `${percent}%`,
            height,
            background: color,
          }}
        />
      </div>

    </div>
  );
}