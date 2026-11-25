
export function parseDate(value) {
  // Zaten Date ise olduğu gibi kullan.
  if (value instanceof Date) return value;

  // Beklenen biçim: GG-AA-YYYY
  if (typeof value !== "string") {
    return new Date(NaN);
  }

  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);

  if (!match) return new Date(NaN);

  const [, gun, ay, yil] = match;

  const tarih = new Date(
    Date.UTC(Number(yil), Number(ay) - 1, Number(gun))
  );

  // 31-02-2026 gibi geçersiz tarihleri kontrol et.
  if (
    tarih.getUTCDate() !== Number(gun) ||
    tarih.getUTCMonth() !== Number(ay) - 1 ||
    tarih.getUTCFullYear() !== Number(yil)
  ) {
    return new Date(NaN);
  }

  return tarih;
}

export function formatDate(tarih) {
  if (!(tarih instanceof Date) || Number.isNaN(tarih.getTime())) {
    return tarih;
  }

  const gun = String(tarih.getUTCDate()).padStart(2, "0");
  const ay = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  const yil = tarih.getUTCFullYear();

  return `${gun}-${ay}-${yil}`;
}

export function todayStart() {
  const simdi = new Date();

  return new Date(
    Date.UTC(
      simdi.getUTCFullYear(),
      simdi.getUTCMonth(),
      simdi.getUTCDate()
    )
  );
}
