
import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory } from "./utils/filter-events";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory,
  );

  const selectedEvent = events.find(
    (event) => event.id === selectedId,
  );

  useEffect(() => {
    const titles: Record<PageName, string> = {
      home: "Ana Sayfa",
      events: "Etkinlikler",
      detail: "Etkinlik Detayı",
      add: "Etkinlik Ekle",
      update: "Etkinliği Güncelle",
    };

    document.title = `Kampüs Etkinlikleri — ${titles[page]}`;
  }, [page]);

  function go(nextPage: PageName, id?: string) {
    if (id !== undefined) {
      setSelectedId(id);
    }

    setPage(nextPage);
  }

  return (
    <>
      <Header
        title={
          page === "home"
            ? "Kampüs Etkinlikleri"
            : page === "events"
              ? "Etkinlikler"
              : page === "add"
                ? "Etkinlik Ekle"
                : page === "update"
                  ? "Etkinliği Güncelle"
                  : selectedEvent?.title ?? "Etkinlik Detayı"
        }
      />

      <Navigation
  current={page}
  onNavigate={go}
  eventTitle={selectedEvent?.title}
/>

      <main>
        {page === "home" && (
          <section>
            <h2>Ana Sayfa</h2>
            <h3>Yaklaşan Etkinlikler</h3>

            <EventList
              events={[...events]
                .sort((a, b) => {
                  const dateA = a.date.split("-").reverse().join("-");
                  const dateB = b.date.split("-").reverse().join("-");
                  return dateA.localeCompare(dateB);
                })
                .slice(0, 2)}
              onShowDetail={(id) => go("detail", id)}
            />
          </section>
        )}

        {page === "events" && (
          <section>
            <h2>Etkinlikler</h2>

            <EventFilter
              searchText={searchText}
              category={selectedCategory}
              categories={[...new Set(events.map((event) => event.category))]}
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
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanızla eşleşen etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && (
          selectedEvent ? (
            <EventDetail
              event={selectedEvent}
              onBack={() => go("events")}
              onEdit={(id) => go("update", id)}
            />
          ) : (
            <section>
              <h2>Etkinlik bulunamadı</h2>
              <p>Görüntülenecek bir etkinlik seçilmedi.</p>
              <button onClick={() => go("events")}>
                Etkinliklere dön
              </button>
            </section>
          )
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2>
              {page === "add" ? "Etkinlik Ekle" : "Etkinliği Güncelle"}
            </h2>

           <EventForm
  onSubmit={() => {
    alert(
      page === "add"
        ? "Form kontrol edildi. Etkinlik kaydetme henüz etkin değil."
        : "Form kontrol edildi. Güncelleme henüz etkin değil.",
    );
  }}
  onCancel={() => go("events")}
/>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
