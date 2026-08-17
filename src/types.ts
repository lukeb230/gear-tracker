export type GearStatus = "in-shop" | "checked-out" | "maintenance";

export interface GearItem {
  id: string;
  name: string;
  category: string;
  status: GearStatus;
  holder: string | null; // who has it checked out
  notes: string; // maintenance notes — editable/visible only while in maintenance
  updatedAt: string; // ISO
}

export interface HistoryEntry {
  id: string;
  gearId: string;
  gearName: string;
  action: "added" | "checked-out" | "returned" | "maintenance" | "deleted";
  actor: string;
  at: string; // ISO
}
