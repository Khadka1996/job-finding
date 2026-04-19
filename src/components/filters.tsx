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
    <form method="get" className="glass-card rounded-3xl p-3 sm:p-4 md:p-5">
      <div className="grid gap-2 sm:gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_auto]">
        <input type="hidden" name="q" value={values.q ?? ""} />
        <input type="hidden" name="location" value={values.location ?? ""} />
        <input type="hidden" name="industry" value={values.industry ?? ""} />

        <label className="grid gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#14213d]">
          Job type
          <select name="type" defaultValue={values.type ?? ""} className="h-10 sm:h-11 rounded-full border border-[#c8d0df] bg-white px-3 sm:px-4 text-xs sm:text-sm outline-none focus:border-[#b10f2e]">
            <option value="">All types</option>
            <option value="remote">Remote</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </label>

        <label className="grid gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-[#14213d]">
          Visa sponsorship
          <select name="visa" defaultValue={values.visa ?? ""} className="h-10 sm:h-11 rounded-full border border-[#c8d0df] bg-white px-3 sm:px-4 text-xs sm:text-sm outline-none focus:border-[#b10f2e]">
            <option value="">Any</option>
            <option value="yes">Available</option>
          </select>
        </label>

        <div className="col-span-2 sm:col-span-1 lg:col-span-auto flex items-end gap-2 sm:gap-3">
          <button type="submit" className="w-full sm:w-auto h-10 sm:h-11 rounded-full bg-[#b10f2e] px-4 sm:px-5 text-xs sm:text-sm font-medium text-white transition hover:bg-[#8d1129]">
            Apply
          </button>
        </div>
      </div>
      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-slate-500">
        Combine filters with search to find sponsor-friendly roles worldwide.
      </div>
    </form>
  );
}