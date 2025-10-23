type FiltersBarProps = {
  sortByDate: "newest" | "oldest" | "";
  sortByPrice: "high" | "low" | "";
  onDateChange: (value: "newest" | "oldest" | "") => void;
  onPriceChange: (value: "high" | "low" | "") => void;
};

export default function FiltersBar({
  sortByDate,
  sortByPrice,
  onDateChange,
  onPriceChange,
}: FiltersBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <label className="text-gray-700">Sort by date:</label>
        <select
          value={sortByDate}
          onChange={(e) => {
            onDateChange(e.target.value as "newest" | "oldest");
            onPriceChange("");
          }}
          className="border border-[#dcdcdc] outline-0 rounded px-2 py-1"
        >
          <option disabled value="">
            Default
          </option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-700">Sort by price:</label>
        <select
          value={sortByPrice}
          onChange={(e) => {
            onPriceChange(e.target.value as "high" | "low");
            onDateChange("");
          }}
          className="border border-[#dcdcdc] outline-0 rounded px-2 py-1"
        >
          <option disabled value="">
            Default
          </option>
          <option value="high">Highest</option>
          <option value="low">Lowest</option>
        </select>
      </div>
    </div>
  );
}
