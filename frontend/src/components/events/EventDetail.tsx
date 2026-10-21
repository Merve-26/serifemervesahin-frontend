
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
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

      <button onClick={() => onEdit(event.id)}>
        Etkinliği Güncelle
      </button>

      <button onClick={onBack}>
        Etkinliklere dön
      </button>
    </section>
  );
}

export default EventDetail;
