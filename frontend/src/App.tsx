
import { useEffect, useState } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent } from "./types/campus-event";
import { searchEvents, filterByCategory } from "./utils/filter-events";
import type { Category } from "./types/campus-event";

type PageName = "home" | "events" | "detail" | "add" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const filteredEvents = filterByCategory(
  searchEvents(events, searchText),
  selectedCategory,
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

  function formatDate(date: string): string {
  const [day, month, year] = date.split("-");
  return `${day}.${month}.${year}`;
}

function renderCard(event: CampusEvent) {
  return (
    <article key={event.id} className="etkinlik-karti">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="etkinlik-afisi"
        />
      )}

      <h3>{event.title}</h3>
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Saat:</strong> {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p>{event.description}</p>

      <button onClick={() => go("detail", event.id)}>
        Detayları gör
      </button>
    </article>
  );
}

  function go(nextPage: PageName, id?: string) {
    if (id !== undefined) {
      setSelectedId(id);
    }

    setPage(nextPage);
  }

  const menuItems: { label: string; page: PageName }[] = [
    { label: "Ana Sayfa", page: "home" },
    { label: "Etkinlikler", page: "events" },
    { label: "Etkinlik Ekle", page: "add" },
  ];

  return (
    <>
      <header>
        <h1>Kampüs Etkinlikleri</h1>
      </header>

      <nav>
        {menuItems.map((item) => (
          <a
            key={item.page}
            href={`#${item.page}`}
            aria-current={page === item.page ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              go(item.page);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main>
       {page === "home" && (
  <section>
    <h2>Ana Sayfa</h2>
    <h3>Yaklaşan Etkinlikler</h3>

    <div className="etkinlik-listesi">
      {[...events]
        .sort((a, b) => {
          const dateA = a.date.split("-").reverse().join("-");
          const dateB = b.date.split("-").reverse().join("-");
          return dateA.localeCompare(dateB);
        })
        .slice(0, 2)
        .map((event) => renderCard(event))}
    </div>
  </section>
)}

        
{page === "events" && (
  <section>
    <h2>Etkinlikler</h2>

    <form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="etkinlik-ara">Etkinlik ara:</label>
      <input
        id="etkinlik-ara"
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        placeholder="Etkinlik adı veya açıklama..."
      />

      <label htmlFor="kategori-sec">Kategori:</label>
      <select
        id="kategori-sec"
        value={selectedCategory}
        onChange={(event) =>
          setSelectedCategory(event.target.value as Category | "")
        }
      >
        <option value="">Tüm kategoriler</option>
        {[...new Set(events.map((event) => event.category))].map(
          (category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ),
        )}
      </select>
    </form>

    <p>
      {filteredEvents.length === 0
        ? "Aramanızla eşleşen etkinlik bulunamadı."
        : `${filteredEvents.length} etkinlik bulundu.`}
    </p>

    <div className="etkinlik-listesi">
      {filteredEvents.map((event) => renderCard(event))}
    </div>
  </section>
)}


        
{page === "detail" && (
  <section>
    {(() => {
      const selectedEvent = events.find(
        (event) => event.id === selectedId,
      );

      if (!selectedEvent) {
        return (
          <>
            <h2>Etkinlik bulunamadı</h2>
            <p>Görüntülenecek bir etkinlik seçilmedi.</p>
            <button onClick={() => go("events")}>
              Etkinliklere dön
            </button>
          </>
        );
      }

      return (
        <>
          <h2>{selectedEvent.title}</h2>

          {selectedEvent.image && (
            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="etkinlik-afisi"
            />
          )}

          <p><strong>Kategori:</strong> {selectedEvent.category}</p>
          <p><strong>Tarih:</strong> {formatDate(selectedEvent.date)}</p>
          <p><strong>Saat:</strong> {selectedEvent.time}</p>
          <p><strong>Yer:</strong> {selectedEvent.location}</p>
          <p><strong>Kapasite:</strong> {selectedEvent.capacity} kişi</p>
          <p>{selectedEvent.description}</p>

          <button onClick={() => go("update", selectedEvent.id)}>
            Etkinliği Güncelle
          </button>

          <button onClick={() => go("events")}>
            Etkinliklere dön
          </button>
        </>
      );
    })()}
  </section>
)}


{(page === "add" || page === "update") && (
  <section>
    <h2>
      {page === "add" ? "Etkinlik Ekle" : "Etkinliği Güncelle"}
    </h2>

    <form
      onSubmit={(event) => {
        event.preventDefault();
        alert(
          page === "add"
            ? "Form kontrol edildi. Etkinlik kaydetme henüz etkin değil."
            : "Form kontrol edildi. Güncelleme henüz etkin değil.",
        );
      }}
    >
      <label htmlFor="etkinlik-adi">Etkinlik adı:</label>
      <input
        id="etkinlik-adi"
        type="text"
        placeholder="Etkinlik adını girin"
        required
      />

      <label htmlFor="etkinlik-kategori">Kategori:</label>
      <select id="etkinlik-kategori" required defaultValue="">
        <option value="" disabled>Kategori seçin</option>
        <option value="Seminer">Seminer</option>
        <option value="Atölye">Atölye</option>
        <option value="Söyleşi">Söyleşi</option>
        <option value="Yarışma">Yarışma</option>
        <option value="Konser">Konser</option>
        <option value="Spor">Spor</option>
      </select>

      <label htmlFor="etkinlik-tarihi">Tarih:</label>
      <input id="etkinlik-tarihi" type="date" required />

      <label htmlFor="etkinlik-saati">Saat:</label>
      <input id="etkinlik-saati" type="time" required />

      <label htmlFor="etkinlik-yeri">Yer:</label>
      <input
        id="etkinlik-yeri"
        type="text"
        placeholder="Etkinlik yerini girin"
        required
      />

      <label htmlFor="etkinlik-kapasitesi">Kapasite:</label>
      <input
        id="etkinlik-kapasitesi"
        type="number"
        min="1"
        placeholder="Katılımcı sayısı"
        required
      />

      <label htmlFor="etkinlik-aciklamasi">Açıklama:</label>
      <textarea
        id="etkinlik-aciklamasi"
        placeholder="Etkinliği açıklayın"
        required
      />

      <button type="submit">
        {page === "add" ? "Etkinliği Ekle" : "Değişiklikleri Kaydet"}
      </button>

      <button type="button" onClick={() => go("events")}>
        İptal
      </button>
    </form>
  </section>
)}

        
      </main>

      <footer>
        <p>Kampüs Etkinlikleri © 2026</p>
      </footer>
    </>
  );
}

export default App;
