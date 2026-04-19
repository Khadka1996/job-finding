type FiltersProps = {
  values: {
    q?: string;
    location?: string;
    industry?: string;
    type?: string;
    visa?: string;
  };
};

export function Filters({ values }: FiltersProps) {
  return (
    <form method="get" className="glass-card rounded-3xl p-5">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_auto]">
        <input type="hidden" name="q" value={values.q ?? ""} />
        <input type="hidden" name="location" value={values.location ?? ""} />
        <input type="hidden" name="industry" value={values.industry ?? ""} />

        <label className="grid gap-2 text-sm font-medium text-[#14213d]">
          Job type
          <select name="type" defaultValue={values.type ?? ""} className="h-11 rounded-full border border-[#c8d0df] bg-white px-4 text-sm outline-none focus:border-[#b10f2e]">
            <option value="">All types</option>
            <option value="remote">Remote</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-[#14213d]">
          Visa sponsorship
          <select name="visa" defaultValue={values.visa ?? ""} className="h-11 rounded-full border border-[#c8d0df] bg-white px-4 text-sm outline-none focus:border-[#b10f2e]">
            <option value="">Any</option>
            <option value="yes">Available</option>
          </select>
        </label>

        <div className="flex items-end">
          <button type="submit" className="h-11 rounded-full bg-[#b10f2e] px-5 text-sm font-medium text-white transition hover:bg-[#8d1129]">
            Apply Filters
          </button>
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-500">
        Combine these filters with search to discover sponsor-friendly roles in UK, Australia, New Zealand, Canada, USA, Ireland, Middle East, India, and Nepal.
      </div>
    </form>
  );
}