# maintenance-notes

The maintenance-notes feature (PR #1) as it exists after the inventory
rework merged it in.

**Behavior:** an item whose `condition` is `"maintenance"` shows an inline
notes input on its `GearCard` — visible/editable only in that condition,
saved on blur via `store.setMaintenanceNotes` (bumps `updatedAt`, no other
side effects). `GearForm` shows a "Maintenance notes" field under the same
condition. Maintenance notes are included in the search haystack.

**Model:** `GearItem.maintenanceNotes` is a dedicated field. The original
feature reused `notes` (which was dead in the check-out app), but the rework
made `notes` a real general-notes field, so the merge split them — see
[[decisions]]. `store.load()` defaults `maintenanceNotes` to `""` for items
saved before the field existed. `"maintenance"` is a `GearCondition` value
(the old `GearStatus` is gone); adding a condition means touching types.ts
(union + CONDITIONS label) and styles.css (`.condition.<value>` badge color).

Related: [[architecture]], [[gotchas]]
