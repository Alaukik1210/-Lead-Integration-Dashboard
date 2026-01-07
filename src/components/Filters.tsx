import { useEffect, useRef, useState } from "react";
import type { LeadStatus, WorkflowType } from "../lib/Data";

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  workflowFilter: WorkflowType | "all";
  onWorkflowChange: (value: WorkflowType | "all") => void;
  statusFilter: LeadStatus | "all";
  onStatusChange: (value: LeadStatus | "all") => void;
}

const workflowOptions: { label: string; value: WorkflowType | "all" }[] = [
  { label: "All workflows", value: "all" },
  { label: "OPD", value: "OPD" },
  { label: "IP", value: "IP" },
  { label: "Insurance", value: "Insurance" },
  { label: "General Enquiry", value: "General Enquiry" },
];
const statusOptions:{label:string;value :LeadStatus | "all"} []=[
  {label:"All status",value:"all"},
  {label:"New",value:"New"},
  {label:"Contacted", value:"Contacted"},
  {label:"Follow-up", value:"Follow-up"},
  {label:"Converted", value:"Converted"},
  {label:"Closed", value:"Closed"},
]

const Filters: React.FC<FiltersProps> = ({
  searchQuery,
  onSearchChange,
  workflowFilter,
  onWorkflowChange,
  statusFilter,
  onStatusChange,
}) => {
  const [openWorkflow, setOpenWorkflow] = useState<boolean>(false);
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const workflowRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (workflowRef.current && !workflowRef.current?.contains(e.target as Node)) {
        setOpenWorkflow(false);
      }
      if (statusRef.current && !statusRef.current?.contains(e.target as Node)) {
        setOpenStatus(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const selectedWorkflow =
    workflowOptions.find((option) => option.value === workflowFilter)?.label ||"All workflows";
  const selectedStatus =  
    statusOptions.find((option)=>option.value===statusFilter)?.label || "All status";


  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div>
        
        <input
          type="text"
          placeholder="ID or Name or Phone"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>
      <div className="relative w-full sm:w-40" ref={workflowRef}>
        <button
          onClick={() => setOpenWorkflow(!openWorkflow)}
          className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <span className={workflowFilter === "all" ? "text-gray-500" : ""}>
            {selectedWorkflow}
          </span>

          <svg
            className={`h-4 w-4 transition-transform ${
              openWorkflow ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.7a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {openWorkflow && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
            <ul className="py-1 text-sm">
              {workflowOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onWorkflowChange(option.value);
                    setOpenWorkflow(false);
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    workflowFilter === option.value
                      ? "bg-gray-200 font-medium"
                      : ""
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative w-full sm:w-40" ref={statusRef}>
        <button
          onClick={() => setOpenStatus(!openStatus)}
          className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <span className={statusFilter === "all" ? "text-gray-500" : ""}>
            {selectedStatus}
          </span>

          <svg
            className={`h-4 w-4 transition-transform ${
              openStatus ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.7a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {openStatus && (
          <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
            <ul className="py-1 text-sm">
              {statusOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onStatusChange(option.value);
                    setOpenStatus(false);
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    statusFilter === option.value
                      ? "bg-gray-200 font-medium"
                      : ""
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
