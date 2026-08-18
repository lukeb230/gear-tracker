import { useState } from "react";
import { formatDate, formatDims, formatPrice, formatWeight } from "../lib/format";
import { removeGear, setMaintenanceNotes } from "../lib/store";
import { CONDITIONS, type GearItem } from "../types";

export function GearCard({
  item,
  onEdit,
}: {
  item: GearItem;
  onEdit: (item: GearItem) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dims = formatDims(item.dims);
  const price = formatPrice(item.priceUsd);
  const acquired = formatDate(item.acquiredOn);
  const conditionLabel = CONDITIONS.find((c) => c.value === item.condition)?.label;

  return (
    <article className="card">
      <span className="grommet" aria-hidden="true" />
      {conditionLabel && (
        <span className={`condition ${item.condition}`}>{conditionLabel}</span>
      )}
      {item.photo ? (
        <img className="card-photo" src={item.photo} alt={item.name} />
      ) : (
        <div className="card-placeholder">
          <span>{item.category}</span>
        </div>
      )}
      <div className="card-body">
        <h3>{item.name}</h3>
        <div className="card-sub">
          {item.brand && <>{item.brand} · </>}
          <span className="cat">{item.category}</span>
        </div>
        {item.notes && <p className="card-notes">{item.notes}</p>}
        {item.condition === "maintenance" && <MaintenanceNotes item={item} />}
      </div>
      <div className="spec">
        <span className="weight">{formatWeight(item.weightGrams)}</span>
        {dims && <span className="dim">{dims}</span>}
        {price && <span className="price">{price}</span>}
      </div>
      <div className="card-foot">
        {acquired && <span className="acquired">since {acquired}</span>}
        <button type="button" className="btn btn-sm" onClick={() => onEdit(item)}>
          Edit
        </button>
        {confirmDelete ? (
          <>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => removeGear(item.id)}
            >
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setConfirmDelete(false)}
            >
              Keep
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}

function MaintenanceNotes({ item }: { item: GearItem }) {
  const [draft, setDraft] = useState(item.maintenanceNotes);
  return (
    <input
      className="maintenance-notes"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        if (draft !== item.maintenanceNotes) setMaintenanceNotes(item.id, draft);
      }}
      placeholder="Maintenance notes — what needs fixing?"
      aria-label={`Maintenance notes for ${item.name}`}
    />
  );
}
