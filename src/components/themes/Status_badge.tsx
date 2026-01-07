import { cn } from "../../lib/util";
import type { LeadStatus } from "../../lib/Data";

interface StatusBadgeProps {
  status: LeadStatus;
  size?: "sm" | "md";
}
const statusConfig: Record<LeadStatus, { bg: string; text: string; dot: string }> = {
  New: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  Contacted: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    dot: "bg-cyan-500",
  },
  "Follow-up": {  
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Converted: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Closed: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
  },
}
const Status_badge: React.FC<StatusBadgeProps> = ({ status, size = "sm" }) => {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.bg,
        config.text,
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
      )}
    >
      <span className={cn("rounded-full", config.dot, size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2")} />
      {status}
    </span>
  )
};

export default Status_badge;
