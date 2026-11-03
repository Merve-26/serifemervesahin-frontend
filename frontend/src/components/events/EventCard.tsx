
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: CampusEvent;
}

function EventCard({ event }: EventCardProps) {
  return (
    <article className="etkinlik-karti">
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

      <Link to={`/events/${event.id}`}>
        Detayları gör
      </Link>
    </article>
  );
}

export default EventCard;
