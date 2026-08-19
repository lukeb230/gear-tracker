import { useState } from "react";
import { fileToDataUrl } from "../lib/image";
import { addGear, updateGear } from "../lib/store";
import {
  CATEGORIES,
  CONDITIONS,
  type GearCondition,
  type GearDraft,
  type GearItem,
} from "../types";

function toNumber(raw: string): number | null {
  const n = Number(raw);
  return raw.trim() === "" || Number.isNaN(n) ? null : n;
}

export function GearForm({
  initial,
  brandOptions,
  onClose,
}: {
  initial: GearItem | null;
  brandOptions: string[];
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [weight, setWeight] = useState(initial?.weightGrams?.toString() ?? "");
  const [l, setL] = useState(initial?.dims.l?.toString() ?? "");
  const [w, setW] = useState(initial?.dims.w?.toString() ?? "");
  const [h, setH] = useState(initial?.dims.h?.toString() ?? "");
  const [price, setPrice] = useState(initial?.priceUsd?.toString() ?? "");
  const [acquiredOn, setAcquiredOn] = useState(initial?.acquiredOn ?? "");
  const [condition, setCondition] = useState<GearCondition>(
    initial?.condition ?? "good",
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [maintenanceNotes, setMaintenanceNotes] = useState(
    initial?.maintenanceNotes ?? "",
  );
  const [photo, setPhoto] = useState<string | null>(initial?.photo ?? null);
  const [photoError, setPhotoError] = useState(false);

  async function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setPhoto(await fileToDataUrl(file));
      setPhotoError(false);
    } catch {
      setPhotoError(true);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const draft: GearDraft = {
      name: name.trim(),
      brand: brand.trim(),
      category,
      weightGrams: toNumber(weight),
      dims: { l: toNumber(l), w: toNumber(w), h: toNumber(h) },
      priceUsd: toNumber(price),
      acquiredOn,
      condition,
      notes: notes.trim(),
      maintenanceNotes: maintenanceNotes.trim(),
      photo,
    };
    if (initial) {
      updateGear(initial.id, draft);
    } else {
      addGear(draft);
    }
    onClose();
  }

  return (
    <form className="form-panel" onSubmit={submit}>
      <h2>{initial ? `Edit ${initial.name}` : "Add gear"}</h2>
      <div className="form-grid">
        <div className="field span-3">
          <label htmlFor="gear-name">Name *</label>
          <input
            id="gear-name"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Hornet 2P"
          />
        </div>
        <div className="field span-2">
          <label htmlFor="gear-brand">Brand</label>
          <input
            id="gear-brand"
            list="gear-brand-options"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Pick or type a brand"
          />
          <datalist id="gear-brand-options">
            {brandOptions.map((b) => (
              <option key={b} value={b} />
            ))}
          </datalist>
        </div>
        <div className="field">
          <label htmlFor="gear-category">Category</label>
          <select
            id="gear-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="field span-2">
          <label htmlFor="gear-weight">Weight (g)</label>
          <input
            id="gear-weight"
            type="number"
            min="0"
            step="1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 878"
          />
        </div>
        <div className="field span-2">
          <label htmlFor="gear-dim-l">Packed size L × W × H (cm)</label>
          <div className="dims-row">
            <input
              id="gear-dim-l"
              type="number"
              min="0"
              value={l}
              onChange={(e) => setL(e.target.value)}
              aria-label="Length in cm"
            />
            <span>×</span>
            <input
              type="number"
              min="0"
              value={w}
              onChange={(e) => setW(e.target.value)}
              aria-label="Width in cm"
            />
            <span>×</span>
            <input
              type="number"
              min="0"
              value={h}
              onChange={(e) => setH(e.target.value)}
              aria-label="Height in cm"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="gear-price">Price ($)</label>
          <input
            id="gear-price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 399"
          />
        </div>
        <div className="field">
          <label htmlFor="gear-acquired">Acquired</label>
          <input
            id="gear-acquired"
            type="date"
            value={acquiredOn}
            onChange={(e) => setAcquiredOn(e.target.value)}
          />
        </div>

        <div className="field span-2">
          <label htmlFor="gear-condition">Condition</label>
          <select
            id="gear-condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value as GearCondition)}
          >
            {CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        {condition === "maintenance" && (
          <div className="field span-2">
            <label htmlFor="gear-maintenance-notes">Maintenance notes</label>
            <input
              id="gear-maintenance-notes"
              value={maintenanceNotes}
              onChange={(e) => setMaintenanceNotes(e.target.value)}
              placeholder="What needs fixing?"
            />
          </div>
        )}
        <div className="field span-2">
          <label htmlFor="gear-photo">Photo</label>
          <div className="photo-field">
            {photo && <img className="photo-preview" src={photo} alt="Gear preview" />}
            <input
              id="gear-photo"
              type="file"
              accept="image/*"
              onChange={onPhotoChange}
            />
            {photo && (
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setPhoto(null)}
              >
                Remove
              </button>
            )}
          </div>
          {photoError && (
            <span style={{ color: "var(--danger)", fontSize: 12 }}>
              That file couldn't be read as an image. Try a JPEG or PNG.
            </span>
          )}
        </div>
        <div className="field span-2">
          <label htmlFor="gear-notes">Notes</label>
          <textarea
            id="gear-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Sizing, mods, quirks…"
          />
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initial ? "Save changes" : "Add to locker"}
        </button>
      </div>
    </form>
  );
}
