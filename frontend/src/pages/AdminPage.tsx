
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Bu etkinliği silmek istediğinize emin misiniz?"
    );

    if (confirmed) {
      deleteEvent(id);
    }
  };

  return (
    <section>
      <h2>Etkinlik Yönetimi</h2>

      <Link to="/admin/new">Yeni Etkinlik Ekle</Link>

      {events.length === 0 ? (
        <p>Henüz etkinlik bulunmuyor.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Etkinlik Adı</th>
              <th>Kategori</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.date}</td>
                <td>
                  <Link to={`/admin/${event.id}/edit`}>
                    Düzenle
                  </Link>

                  <button onClick={() => handleDelete(event.id)}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default AdminPage;
