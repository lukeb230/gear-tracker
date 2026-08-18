export function FilterBar({
  query,
  onQuery,
  category,
  onCategory,
  categories,
  onAdd,
}: {
  query: string;
  onQuery: (q: string) => void;
  category: string | null;
  onCategory: (c: string | null) => void;
  categories: string[];
  onAdd: () => void;
}) {
  return (
    <div className="toolbar">
      <input
        className="search"
        type="search"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Search gear, brands, notes…"
        aria-label="Search gear"
      />
      {categories.length > 0 && (
        <div className="chips" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={`chip${category === null ? " active" : ""}`}
            onClick={() => onCategory(null)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip${category === c ? " active" : ""}`}
              onClick={() => onCategory(category === c ? null : c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <button type="button" className="btn btn-primary" onClick={onAdd}>
        + Add gear
      </button>
    </div>
  );
}
