import { useMemo, useState } from "react";
import Cards from "./Cards";
import { sampleLeads } from "../lib/Data";
import type { LeadStatus, WorkflowType } from "../lib/Data";
import Filters from "./Filters";
import Table from "./Table";
import { BarChart, CircleCheck, Plus, Target } from "lucide-react";
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [workflowFilter, setWorkflowFilter] = useState<WorkflowType | "all">(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [cardFilter, setCardFilter] = useState<LeadStatus | "all">("all");
  const leads = sampleLeads;
  const counts = useMemo(
    () => ({
      total: leads.length,
      new: leads.filter((l) => l.current_status === "New").length,
      contacted: leads.filter((l) => l.current_status === "Contacted").length,
      converted: leads.filter((l) => l.current_status === "Converted").length,
      followUp: leads.filter((l) => l.current_status === "Follow-up").length,
      closed: leads.filter((l) => l.current_status === "Closed").length,
    }),
    [leads]
  );
  
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        searchQuery === "" ||
        lead.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone_number.includes(searchQuery) ||
        lead.lead_id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesWorkflow =
        workflowFilter === "all" || lead.workflow_type === workflowFilter;

      const matchesStatus =
        statusFilter === "all" || lead.current_status === statusFilter;

      const matchesCardFilter =
        cardFilter === "all" || lead.current_status === cardFilter;

      return (
        matchesSearch && matchesWorkflow && matchesStatus && matchesCardFilter
      );
    });
  }, [searchQuery, workflowFilter, statusFilter, cardFilter]);

  const handleCardClick = (status: LeadStatus | "all") => {
    setCardFilter((prev) => (prev === status ? "all" : status));
  };
  return (
    <div>
      <main className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <Cards
              title="Total leads"
              count={counts.total}
              icon={
                <BarChart className="h-8 w-8 text-blue-600"/>
              }
              variant="total"
              isActive={cardFilter === "all"}
              onClick={() => handleCardClick("all")}
            />
            <Cards
              title="New leads"
              count={
                counts.new
              }
              icon={
               <Plus className="h-8 w-8 text-yellow-500"/>
              }
              variant="New"
              isActive={cardFilter === "New"}
              onClick={() => handleCardClick("New")}
            />
            <Cards
              title="Converted"
              count={
                counts.converted
              }
              icon={
                <Target className="h-8 w-8 "/>
              }
              variant="Converted"
              isActive={cardFilter === "Converted"}
              onClick={() => handleCardClick("Converted")}
            />

            <Cards
              title="Closed"
              count={counts.closed}
              icon={
                <CircleCheck className="h-8 w-8 text-red-500"/>
              }
              variant="Closed"
              isActive={cardFilter === "Closed"}
              onClick={() => handleCardClick("Closed")}
            />
          </div>
        </section>
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold">Lead List</h2>
            <Filters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              workflowFilter={workflowFilter}
              onWorkflowChange={setWorkflowFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>

          <Table leads={filteredLeads} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
