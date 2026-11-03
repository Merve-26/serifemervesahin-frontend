
import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventList from "../components/events/EventList";
import EventFilter from "../components/events/EventFilter";

function EventsPage() {
  const { events } = useEvents();

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory,
  );

  const categories = [...new Set(events.map((event) => event.category))];

  return (
    <section>
      <h2>Etkinlikler</h2>

      <EventFilter
        searchText={searchText}
        category={selectedCategory}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setSelectedCategory}
      />

      <p>
        {filteredEvents.length === 0
          ? "Aramanızla eşleşen etkinlik bulunamadı."
          : `${filteredEvents.length} etkinlik bulundu.`}
      </p>

      <EventList
        events={filteredEvents}
        emptyText="Aramanızla eşleşen etkinlik bulunamadı."
      />
    </section>
  );
}

export default EventsPage;
