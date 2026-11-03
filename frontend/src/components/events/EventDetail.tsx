
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <section>
      <h2>{event.title}</h2>

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="etkinlik-afisi"
        />
      )}

      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih:</strong> {formatDate(event.date)}</p>
      <p><strong>Saat:</strong> {event.time}</p>
      <p><strong>Yer:</strong> {event.location}</p>
      <p><strong>Kapasite:</strong> {event.capacity} kişi</p>
      <p>{event.description}</p>

      <Link to={`/admin/${event.id}/edit`}>
        Etkinliği Güncelle
      </Link>

      <Link to="/events">
        Etkinliklere dön
      </Link>
    </section>
  );
}

export default EventDetail;
