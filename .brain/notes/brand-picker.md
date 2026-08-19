# brand-picker

The Brand field in the add/edit form is a combobox, not a plain text input:
an `<input list=…>` backed by a native `<datalist>`. Users can pick a
suggestion or still type any free-text brand — `GearItem.brand` stays a
plain `string`, no migration, no validation change.

**Where the suggestions come from:** `App.tsx` builds `brandOptions` by
merging `KNOWN_BRANDS` (curated list in `types.ts`) with every distinct
brand already saved in the locker, deduped case-insensitively (first
spelling wins, curated spelling beats stored ones), sorted, and passes it
to `GearForm` as a prop. So a custom brand typed once shows up as a
suggestion next time.

touches: `src/types.ts` (KNOWN_BRANDS), `src/App.tsx` (brandOptions memo),
`src/components/GearForm.tsx` (datalist input).

Why a datalist and not a `<select>`: brands are open-ended — a closed picker
would force an "Other" escape hatch and a schema change. Native datalist
keeps keyboard/mobile behavior for free and zero dependencies
(see [[decisions]]).

Related: [[architecture]]
