import React from 'react'
import type { WorkflowType } from '../../lib/Data'
import { cn } from '../../lib/util'

interface workflowBadgeProps {
    workflow:WorkflowType
}
const workflowConfig: Record<
  WorkflowType,
  {
    bg: string
    text: string
    border: string
  }
> = {
  OPD: {
    bg: "bg-purple-50 rounded-full border px-2   border-purple-200",
    text: "text-purple-700",
    border: "border-purple-200",
  },
  IP: {
    bg: "bg-rose-50 rounded-full border px-2   border-rose-200",
    text: "text-rose-700",
    border: "border-rose-200",
  },
  Insurance: {
    bg: "bg-blue-50 rounded-full border px-2   border-blue-200",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "General Enquiry": {
    bg: "bg-slate-50 rounded-full border px-2   border-slate-200",
    text: "text-slate-700",
    border: "border-slate-200",
  },
}
const Workflow_badge : React.FC<workflowBadgeProps> = ({ workflow }) => {
    const config = workflowConfig[workflow]
  return (
    <div>
      <span className={cn("inline-flex items-center gap-1 text-sm font-medium ",config.text, config.bg, config.border)}>
        {workflow}
      </span>
    </div>
  )
}

export default Workflow_badge
