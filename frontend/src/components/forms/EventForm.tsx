
import type { FormEvent } from "react";

interface EventFormProps {
  onSubmit: () => void;
  onCancel?: () => void;
}

function EventForm({ onSubmit, onCancel }: EventFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Kaydet</button>

      <button type="button" onClick={onCancel}>
        İptal
      </button>
    </form>
  );
}

export default EventForm;
