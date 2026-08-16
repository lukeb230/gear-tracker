import type { GearStatus } from "../types";

export function statusLabel(s: GearStatus): string {
  switch (s) {
    case "in-shop":
      return "In shop";
    case "checked-out":
      return "Checked out";
    case "maintenance":
      return "Maintenance";
  }
}

export function statusColor(s: GearStatus): string {
  switch (s) {
    case "in-shop":
      return "#2dd4bf";
    case "checked-out":
      return "#fbbf24";
    case "maintenance":
      return "#f87171";
  }
}

export function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const min = Math.floor(ms / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}
