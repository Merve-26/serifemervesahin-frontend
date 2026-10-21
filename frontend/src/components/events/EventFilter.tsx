
import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="etkinlik-ara">Etkinlik ara:</label>
      <input
        id="etkinlik-ara"
        type="text"
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Etkinlik adı veya açıklama..."
      />

      <label htmlFor="kategori-sec">Kategori:</label>
      <select
        id="kategori-sec"
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value as Category | "")
        }
      >
        <option value="">Tüm kategoriler</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </form>
  );
}

export default EventFilter;
