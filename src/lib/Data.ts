export type WorkflowType = "OPD" | "IP" | "Insurance" | "General Enquiry"
export type LeadStatus = "New" | "Contacted" | "Follow-up" | "Converted" | "Closed"
export type Priority = "High" | "Medium" | "Low"

export interface Lead {
  lead_id: string
  patient_name: string
  phone_number: string
  lead_source: string
  workflow_type: WorkflowType
  current_status: LeadStatus
  assigned_to: string
  priority: Priority
  created_date: string
  last_updated: string
}

export const sampleLeads: Lead[] = [
  {
    lead_id: "LD-2024-001",
    patient_name: "Rajesh Kumar",
    phone_number: "+91 98765 43210",
    lead_source: "Website",
    workflow_type: "OPD", 
    current_status: "Contacted",
    assigned_to: "Dr. Priya Sharma",
    priority: "High",
    created_date: "2024-01-15T09:30:00",
    last_updated: "2024-01-16T14:20:00",
  },
  {
    lead_id: "LD-2024-002",
    patient_name: "Sunita Devi",
    phone_number: "+91 87654 32109",
    lead_source: "Referral",
    workflow_type: "IP",
    current_status: "Follow-up",
    assigned_to: "Nurse Anita Gupta",
    priority: "High",
    created_date: "2024-01-14T11:00:00",
    last_updated: "2024-01-17T10:45:00",
  },
  {
    lead_id: "LD-2024-003",
    patient_name: "Amit Patel",
    phone_number: "+91 76543 21098",
    lead_source: "Walk-in",
    workflow_type: "Insurance",
    current_status: "New",
    assigned_to: "Ramesh Verma",
    priority: "Medium",
    created_date: "2024-01-17T08:15:00",
    last_updated: "2024-01-17T08:15:00",
  },
  {
    lead_id: "LD-2024-004",
    patient_name: "Meera Reddy",
    phone_number: "+91 65432 10987",
    lead_source: "Social Media",
    workflow_type: "General Enquiry",
    current_status: "Converted",
    assigned_to: "Dr. Suresh Rao",
    priority: "Low",
    created_date: "2024-01-10T16:45:00",
    last_updated: "2024-01-16T09:30:00",
  },
  {
    lead_id: "LD-2024-005",
    patient_name: "Vikram Singh",
    phone_number: "+91 54321 09876",
    lead_source: "Phone Call",
    workflow_type: "OPD",
    current_status: "Closed",
    assigned_to: "Dr. Priya Sharma",
    priority: "Medium",
    created_date: "2024-01-08T10:00:00",
    last_updated: "2024-01-15T17:00:00",
  },
  {
    lead_id: "LD-2024-006",
    patient_name: "Lakshmi Nair",
    phone_number: "+91 43210 98765",
    lead_source: "Website",
    workflow_type: "IP",
    current_status: "New",
    assigned_to: "Nurse Anita Gupta",
    priority: "High",
    created_date: "2024-01-17T07:00:00",
    last_updated: "2024-01-17T07:00:00",
  },
  {
    lead_id: "LD-2024-007",
    patient_name: "Arjun Mehta",
    phone_number: "+91 32109 87654",
    lead_source: "Referral",
    workflow_type: "Insurance",
    current_status: "Contacted",
    assigned_to: "Ramesh Verma",
    priority: "Medium",
    created_date: "2024-01-13T13:30:00",
    last_updated: "2024-01-16T11:15:00",
  },
  {
    lead_id: "LD-2024-008",
    patient_name: "Kavitha Iyer",
    phone_number: "+91 21098 76543",
    lead_source: "Walk-in",
    workflow_type: "OPD",
    current_status: "Converted",
    assigned_to: "Dr. Suresh Rao",
    priority: "Low",
    created_date: "2024-01-05T15:00:00",
    last_updated: "2024-01-14T16:30:00",
  },
  {
    lead_id: "LD-2024-009",
    patient_name: "Deepak Joshi",
    phone_number: "+91 10987 65432",
    lead_source: "Social Media",
    workflow_type: "General Enquiry",
    current_status: "Follow-up",
    assigned_to: "Dr. Priya Sharma",
    priority: "Medium",
    created_date: "2024-01-12T09:45:00",
    last_updated: "2024-01-17T08:00:00",
  },
  {
    lead_id: "LD-2024-010",
    patient_name: "Pooja Agarwal",
    phone_number: "+91 09876 54321",
    lead_source: "Phone Call",
    workflow_type: "IP",
    current_status: "Closed",
    assigned_to: "Nurse Anita Gupta",
    priority: "High",
    created_date: "2024-01-03T12:00:00",
    last_updated: "2024-01-12T14:45:00",
  },
]
