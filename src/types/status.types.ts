// General status types used across the application
export type StatusId =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;

export type StatusName =
  | "active" // 1
  | "pending" // 2
  | "rejected" // 3
  | "disabled" // 4
  | "filled" // 5
  | "closed" // 6
  | "onboarding" // 7
  | "applied" // 8
  | "interview_scheduled" // 9
  | "selected" // 10
  | "offer_accepted" // 11
  | "offer_declined" // 12
  | "shortlisted" // 13
  | "on_hold"; // 14

export type JobPostStatusName =
  | "active" // 1
  | "pending" // 2
  | "rejected" // 3
  | "disabled" // 4
  | "filled" // 5
  | "closed" // 6
  | "onboarding"; // 7

export interface Status {
  status_id: StatusId;
  status: StatusName;
}

// Specific status ID types for different entities
export type JobPostStatusId = StatusId;
export type CompanyPostStatusId = StatusId;
export type CompanyStatusId = StatusId;

// Helper to get status name from ID
export const getStatusName = (status_id: StatusId): StatusName => {
  const statusMap: Record<StatusId, StatusName> = {
    1: "active",
    2: "pending",
    3: "rejected",
    4: "disabled",
    5: "filled",
    6: "closed",
    7: "onboarding",
    8: "applied",
    9: "interview_scheduled",
    10: "selected",
    11: "offer_accepted",
    12: "offer_declined",
    13: "shortlisted",
    14: "on_hold",
  };
  return statusMap[status_id];
};

// Helper to get status ID from name
export const getStatusId = (status_name: StatusName): StatusId => {
  const statusMap: Record<StatusName, StatusId> = {
    active: 1,
    pending: 2,
    rejected: 3,
    disabled: 4,
    filled: 5,
    closed: 6,
    onboarding: 7,
    applied: 8,
    interview_scheduled: 9,
    selected: 10,
    offer_accepted: 11,
    offer_declined: 12,
    shortlisted: 13,
    on_hold: 14,
  };
  return statusMap[status_name];
};
