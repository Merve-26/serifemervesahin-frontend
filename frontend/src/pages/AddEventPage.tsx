
import { useNavigate } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { CampusEvent, EventFormData } from "../types/campus-event";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  function handleAdd(data: EventFormData) {
    const newEvent: CampusEvent = {
      id: Date.now().toString(),
      title: data.title,
      category: data.category as CampusEvent["category"],
      date: data.date.split("-").reverse().join("-"),
      time: data.time,
      location: data.location,
      capacity: Number(data.capacity),
      description: data.description,
      image: data.image,
    };

    addEvent(newEvent);
    navigate("/admin");
  }

  return (
    <section>
      <h2>Yeni Etkinlik Ekle</h2>
      <EventForm onSubmit={handleAdd} />
    </section>
  );
}

export default AddEventPage;
