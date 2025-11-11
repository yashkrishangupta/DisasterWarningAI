export default function RiskIndicator({ level, percentage, label }) {
  const getRiskColor = () => {
    if (percentage <= 25) return 'text-risk-low';
    if (percentage <= 50) return 'text-risk-medium';
    if (percentage <= 75) return 'text-risk-high';
    return 'text-risk-critical';
  };

  const getRiskBg = () => {
    if (percentage <= 25) return 'bg-risk-low';
    if (percentage <= 50) return 'bg-risk-medium';
    if (percentage <= 75) return 'bg-risk-high';
    return 'bg-risk-critical';
  };

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2" data-testid="risk-indicator">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="54"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="64"
            cy="64"
            r="54"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className={getRiskColor()}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-semibold ${getRiskColor()}`} data-testid="text-percentage">
            {percentage}%
          </span>
        </div>
      </div>
      {label && (
        <span className="text-sm text-muted-foreground text-center" data-testid="text-label">
          {label}
        </span>
      )}
    </div>
  );
}
