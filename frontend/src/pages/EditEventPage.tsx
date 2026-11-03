
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import NotFoundPage from "./NotFoundPage";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import type { EventFormData } from "../types/campus-event";

function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();

  const event = id ? findEventById(events, id) : undefined;

  if (!event) {
    return <NotFoundPage />;
  }

  const currentEvent = event;

  const initialData: EventFormData = {
    title: currentEvent.title,
    category: currentEvent.category,
    date: currentEvent.date.split("-").reverse().join("-"),
    time: currentEvent.time,
    location: currentEvent.location,
    capacity: String(currentEvent.capacity),
    description: currentEvent.description,
    image: currentEvent.image ?? "",
  };

  function handleUpdate(data: EventFormData) {
    updateEvent(currentEvent.id, {
      ...currentEvent,
      title: data.title,
      category: data.category as typeof currentEvent.category,
      date: data.date.split("-").reverse().join("-"),
      time: data.time,
      location: data.location,
      capacity: Number(data.capacity),
      description: data.description,
      image: data.image,
    });

    navigate("/admin");
  }

  return (
    <section>
      <h2>Etkinliği Düzenle</h2>

      <EventForm
        initialData={initialData}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/admin")}
      />
    </section>
  );
}

export default EditEventPage;
