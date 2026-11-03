
import type { EventFormData } from "../types/campus-event";

export function validateEvent(data: EventFormData): string[] {
  const errors: string[] = [];

  if (data.title.trim().length < 3) {
    errors.push("Etkinlik adı en az 3 karakter olmalıdır.");
  }

  if (!data.category) {
    errors.push("Lütfen bir kategori seçiniz.");
  }

  if (!data.date) {
    errors.push("Lütfen tarih giriniz.");
  }

  if (!data.time.trim()) {
    errors.push("Lütfen saat giriniz.");
  }

  if (!data.location.trim()) {
    errors.push("Lütfen yer bilgisi giriniz.");
  }

  const capacity = Number(data.capacity);

  if (
    !Number.isInteger(capacity) ||
    capacity < 1 ||
    capacity > 1000
  ) {
    errors.push("Kapasite 1 ile 1000 arasında tam sayı olmalıdır.");
  }

  if (data.description.trim().length < 10) {
    errors.push("Açıklama en az 10 karakter olmalıdır.");
  }

  return errors;
}
