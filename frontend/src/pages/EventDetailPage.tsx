
import { useParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();

  const event = id ? findEventById(events, id) : undefined;

  if (!event) {
    return <NotFoundPage />;
  }

  return <EventDetail event={event} />;
}

export default EventDetailPage;
