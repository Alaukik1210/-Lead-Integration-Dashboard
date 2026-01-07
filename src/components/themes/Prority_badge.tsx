import React from "react";
import type { Priority } from "../../lib/Data";
import { cn } from "../../lib/util";

interface PriorityBadgeProps {
  priority: Priority;
}
const priorityConfig: Record<
  Priority,
  {
    icon: React.ReactNode;
    text: string;
    color: string;
  }
> = {
  High: {
    icon: (
      <div className="relative">
        <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
        <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></div>
      </div>
    ),
    text: "High",
    color: "text-red-600",
  },
  Medium: {
    icon: (
      <div className="relative">
        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
      </div>
    ),
    text: "Medium",
    color: "text-yellow-600",
  },
  Low: {
    icon: (
      <div className="relative">
        <div className="w-2.5 h-2.5 bg-slate-500 rounded-full"></div>
      </div>
    ),
    text: "Low",
    color: "text-slate-500",
  },
};
const Prority_badge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const config = priorityConfig[priority];
  return (
    <div>
      <span
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium",
          config.color
        )}
      >
        {config.icon}
        {config.text}
      </span>
    </div>
  );
};

export default Prority_badge;
