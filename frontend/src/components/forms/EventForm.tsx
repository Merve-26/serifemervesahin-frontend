
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { EventFormData } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => void;
  onCancel?: () => void;
}

const emptyForm: EventFormData = {
  title: "",
  category: "",
  date: "",
  time: "",
  location: "",
  capacity: "",
  description: "",
  image: "",
};

function EventForm({
  initialData,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>(
    initialData ?? emptyForm
  );

  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setFormData(initialData ?? emptyForm);
  }, [initialData]);

  function handleChange(
    field: keyof EventFormData,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateEvent(formData);
    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      return;
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Etkinlik Adı</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div>
        <label>Kategori</label>
        <select
          value={formData.category}
          onChange={(e) => handleChange("category", e.target.value)}
        >
          <option value="">Kategori seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
          <option value="Konser">Konser</option>
          <option value="Spor">Spor</option>
        </select>
      </div>

      <div>
        <label>Tarih</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
        />
      </div>

      <div>
        <label>Saat</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => handleChange("time", e.target.value)}
        />
      </div>

      <div>
        <label>Yer</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div>
        <label>Kapasite</label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => handleChange("capacity", e.target.value)}
        />
      </div>

      <div>
        <label>Açıklama</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div>
        <label>Görsel URL (isteğe bağlı)</label>
        <input
          type="text"
          value={formData.image ?? ""}
          onChange={(e) => handleChange("image", e.target.value)}
        />
      </div>

      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <button type="submit">Kaydet</button>

      {onCancel && (
        <button type="button" onClick={onCancel}>
          İptal
        </button>
      )}
    </form>
  );
}

export default EventForm;
