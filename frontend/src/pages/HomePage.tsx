
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";
import { Link } from "react-router-dom";

function HomePage() {
  const { events } = useEvents();

  const upcomingEvents = [...events]
    .sort((a, b) => {
      const dateA = a.date.split("-").reverse().join("-");
      const dateB = b.date.split("-").reverse().join("-");
      return dateA.localeCompare(dateB);
    })
    .slice(0, 2);

  return (
    <section>
      <h2>Ana Sayfa</h2>
      <h3>Yaklaşan Etkinlikler</h3>
      <EventList events={upcomingEvents} />
      <Link to="/events">Tüm etkinlikleri gör →</Link>
    </section>
  );
}

export default HomePage;
