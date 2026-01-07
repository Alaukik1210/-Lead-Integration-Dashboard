import React from "react";
import type { Lead, Priority, WorkflowType } from "../lib/Data";
import {
  AlertCircle,
  Calendar,
  Clock,
  Phone,
  Target,
  UserCheck,
  X,
} from "lucide-react";

interface DetailDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

const DetailDrawer: React.FC<DetailDrawerProps> = ({ lead, open, onClose }) => {

  //preverting rendering as lead is null unless sselected
if (!lead || !open) return null;


  const getStatusColor = (status: Lead["current_status"]) => {
    const colors: { [key: string]: string } = {
      New: "bg-blue-50 text-blue-700 border border-blue-200",
      Contacted: "bg-cyan-50 text-cyan-700 border border-cyan-200",
      "Follow-up": "bg-amber-50 text-amber-700 border border-amber-200",
      Converted: "bg-green-50 text-green-700 border border-green-200",
      Closed: "bg-slate-50 text-slate-600 border border-slate-200",
    };
    return colors[status] || "bg-gray-50 text-gray-700 border border-gray-200";
  };

  const getPriorityColor = (priority: Priority) => {
    const colors: { [key: string]: string } = {
      High: "text-red-600 font-semibold",
      Medium: "text-yellow-600 font-medium",
      Low: "text-slate-500 font-medium",
    };
    return colors[priority] || "text-gray-600";
  };

  const getWorkflowColor = (workflow: WorkflowType) => {
    const colors: { [key: string]: string } = {
      Insurance: "bg-blue-50 text-blue-700 border border-blue-200",
      IP: "bg-rose-50 text-rose-700 border border-rose-200",
      OPD: "bg-purple-50 text-purple-700 border border-purple-200",
      "General Enquiry": "bg-slate-50 text-slate-700 border border-slate-200",
    };
    return (
      colors[workflow] || "bg-gray-50 text-gray-700 border border-gray-200"
    );
  };
  const getTimelineSteps = (status: string) => {
    const steps = [
      {
        name: "New",
        description: "Lead received and recorded in system",
        icon: "●",
      },
      {
        name: "Contacted",
        description: "Initial contact made with patient",
        icon: "○",
      },
      {
        name: "Follow-up",
        description: "Scheduled follow-up in progress",
        icon: "○",
      },
      {
        name: "Converted",
        description: "Successfully converted to appointment/admission",
        icon: "○",
      },
      { name: "Closed", description: "Lead journey completed", icon: "○" },
    ];

    const statusOrder = [
      "New",
      "Contacted",
      "Follow-up",
      "Converted",
      "Closed",
    ];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      isActive: index === currentIndex,
      isCompleted: index < currentIndex,
    }));
  };

  const timelineSteps = getTimelineSteps(lead.current_status);

  const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <div className="bg-gray-100">
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed h-screen top-0 right-0 w-full max-w-xl rounded-l-3xl bg-white shadow-lg
    transform transition-transform duration-300 flex flex-col
    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between bg-[#5919C1] items-center p-1 md:p-2 flex-shrink-0">
          
          <div className=" rounded-l-3xl py-1 md:py-2">
            <h1 className=" text-white px-4 py-2 text-2xl font-bold">
              {lead.patient_name}
            </h1>
            <div className="text-gray-300 px-4 text-sm font-semibold ">
              {lead.lead_id}
            </div>
          </div>
          <div>
            <button className="cursor-pointer" onClick={onClose}>
              <X className="text-white"/>
            </button>
          </div>
        </div>
        <div className="overflow-y-auto flex-1 scrollbar-hide">
        <div className="shadow-xl md:p-6 p-4 rounded-3xl">
          <div className="mb-4 font-bold text-gray-700  text-2xl uppercase">
            Lead Information
          </div>
          <div className="flex justify-between mb-4 ">
            <div className="font-semibold flex">
              <Phone className="w-5 h-5 text-purple-600 mx-2" />
              Phone Number
            </div>
            <div className="text-gray-500 font-medium">{lead.phone_number}</div>
          </div>
          <div className="flex justify-between mb-4 ">
            <div className="font-semibold flex">
              <Target className="w-5 h-5 text-purple-600 mx-2" />
              Lead Source
            </div>
            <div className="text-gray-500 font-medium">{lead.lead_source}</div>
          </div>
          <div className="flex justify-between mb-4 ">
            <div className="font-semibold flex">
              <UserCheck className="w-5 h-5 text-purple-600 mx-2" />
              Assigned to
            </div>
            <div className="text-gray-500 font-medium">{lead.assigned_to}</div>
          </div>
          <div className="flex justify-between mb-4 ">
            <div className="font-semibold flex">
              <AlertCircle className="w-5 h-5 text-purple-600 mx-2" />
              Priority
            </div>
            <div className="flex items-center gap-2">
              {lead.priority === "High" && (
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping opacity-75"></div>
                </div>
              )}
              <span className={`font-bold ${getPriorityColor(lead.priority)}`}>
                {lead.priority}
              </span>
            </div>
          </div>
          <div className="flex justify-between mb-4 ">
            <div className="font-semibold flex">
              {" "}
              <Calendar className="w-5 h-5 text-purple-600 mx-2" />
              Created
            </div>
            <div className="text-gray-500 font-medium">{formatDateTime(lead.created_date)}</div>
          </div>
          <div className="flex justify-between mb-4 ">
            <div className="font-semibold flex">
              {" "}
              <Clock className="w-5 h-5 text-purple-600 mx-2" />
              Updated at
            </div>
            <div className="text-gray-500 font-medium">{formatDateTime(lead.last_updated)}</div>
          </div>
        </div>

        <div className="shadow-xl bg-white rounded-xl">
          <div className="uppercase font-bold text-gray-700 text-2xl px-7 mt-6">
            Workflows and Status
          </div>
          <div className="flex items-center justify-between px-10 py-4">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">
                Workflow Type
              </p>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${getWorkflowColor(
                  lead.workflow_type
                )} shadow-sm`}
              >
                {lead.workflow_type}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium mb-2">
                Current Status
              </p>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold ${getStatusColor(
                  lead.current_status
                )} shadow-sm`}
              >
                ● {lead.current_status}
              </span>
            </div>
          </div>
        </div>

        <div className="shadow-2xl bg-white rounded-2xl ">
          <div className="uppercase font-bold text-gray-700 text-2xl px-7 mt-6">
            LEAD JOURNEY TIMELINE
          </div>
          <div className="space-y-3 px-8 py-4">
                {timelineSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                      step.isActive
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white ring-4 ring-green-100"
                        : step.isCompleted
                        ? "bg-gradient-to-br from-green-500 to-green-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.isActive ? "●" : step.isCompleted ? "✓" : "○"}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-6 ${
                        step.isCompleted ? "bg-green-300" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
                <div className="flex-1 ">
                  <h4
                    className={`font-bold ${
                      step.isActive
                        ? "text-green-700 text-lg"
                        : step.isCompleted
                        ? "text-green-700"
                        : "text-gray-400"
                    }`}
                  >
                    {step.name}
                  </h4>
                  <p
                    className={`text-sm ${
                      step.isActive || step.isCompleted
                        ? "text-gray-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                  {step.isActive && (
                    <div className="">
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-3  rounded-full">
                        {lead.last_updated}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DetailDrawer;
