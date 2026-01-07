import React,{  useMemo, useState } from "react";
import Status_badge from "./themes/Status_badge";
import Prority_badge from "./themes/Prority_badge";
import Workflow_badge from "./themes/Workflow_badge";
import type { Lead } from "../lib/Data";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import DetailDrawer from "./DetailDrawer";

interface TableProps {
  leads: Lead[];
}
const itemsPerPage = 8;

const Table: React.FC<TableProps> = ({ leads }) => {
  const [currentPage, setCurrentPage] = useState(1);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead)
    setDrawerOpen(true)
  }

  const sortedLeads = useMemo(() => [...leads].sort(
    (a, b) =>
      new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  ), [leads]);

  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage)

  const safeCurrentPage = Math.min(
  Math.max(currentPage, 1),
  totalPages || 1
)

  const startIndex = (safeCurrentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedLeads = sortedLeads.slice(startIndex, endIndex)
  
const getVisiblePages = () => {
  const pages = []
  const start = Math.max(1, safeCurrentPage - 2)
  const end = Math.min(totalPages, safeCurrentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
}



    const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
}

  const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}
  return (
    <div>
      <div className="overflow-hidden rounded-lg border-gray-500 shadow-xl bg-white">
        <div className="overflow-x-auto">
          <table className="w-full  text-sm">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Lead ID
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Patient Name
                </th>
                <th className="hidden md:table-cell px-4 py-3 font-semibold text-gray-600">
                  Phone
                </th>
                <th className="hidden lg:table-cell px-4 py-3 font-semibold text-gray-600">
                  Source
                </th>
                <th className="hidden sm:table-cell px-4 py-3 font-semibold text-gray-600">
                  Workflow
                </th>
                <th className="px-4 py-3 font-semibold text-gray-600">
                  Status
                </th>
                <th className="hidden xl:table-cell px-4 py-3 font-semibold text-gray-600">
                  Priority
                </th>
                <th className="hidden lg:table-cell px-4 py-3 font-semibold text-gray-600">
                  Assigned To
                </th>
                <th className="hidden md:table-cell px-4 py-3 font-semibold text-gray-600">
                  Created
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {paginatedLeads.map((lead, index) => (
                <tr key={`${lead.lead_id}-${startIndex + index}`}>
                  <td className="px-4 py-3 font-medium">{lead.lead_id}</td>
                  <td className="px-4 py-3 font-medium">{lead.patient_name}</td>
                  <td className="hidden md:table-cell px-4 py-3">
                    {lead.phone_number}
                  </td>
                  <td className="hidden lg:table-cell px-4 py-3">
                    {lead.lead_source}
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3">
                    <Workflow_badge workflow={lead.workflow_type} />
                  </td>
                  <td className="px-4 py-3">
                    <Status_badge status={lead.current_status} />
                  </td>
                  <td className="hidden xl:table-cell px-4 py-3">
                    <Prority_badge priority={lead.priority} />
                  </td>
                  <td className="hidden lg:table-cell px-4 py-3">
                    {lead.assigned_to}
                  </td>
                  <td className="hidden md:table-cell px-4 py-3">
                    {formatDate(lead.created_date)}
                  </td>
                  <td  className="px-4 py-3 flex gap-2 " >
                    <button onClick={() => handleViewLead(lead)} className="flex cursor-pointer items-center gap-1 text-[#5919C1] font-semibold cursor-pointer">

                    <Eye className="h-4 mt-1"/> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedLeads.length)} of {sortedLeads.length} leads
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={safeCurrentPage === 1}
              
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed  flex items-center gap-2 font-semibold  cursor-pointer shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-9 px-2 py-1 text-sm rounded cursor-pointer ${safeCurrentPage === page ? 'bg-[#5919C1] text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={safeCurrentPage === totalPages}
              className="px-3 text-xs py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed  flex items-center gap-2  cursor-pointer font-semibold shadow-sm hover:shadow-md"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <DetailDrawer
  lead={selectedLead}
  open={drawerOpen}
  onClose={() => setDrawerOpen(false)}
/>

      </div>
    </div>
  );
};



export default Table;
