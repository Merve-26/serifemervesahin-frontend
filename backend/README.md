# Kampüs Etkinlikleri API

Node.js ve Express kullanılarak geliştirilmiş REST API projesidir.

## Kurulum

Backend klasöründe bağımlılıkları yükleyin:

```bash
npm install
```

`.env` dosyasında PORT değerini ayarlayın:

```env
PORT=3000
```

## Çalıştırma

Geliştirme modu:

```bash
npm run dev
```

Normal başlatma:

```bash
npm start
```

API adresi: `http://localhost:3000`

## API Endpointleri

| Method | Endpoint | Açıklama | Başarılı Yanıt |
|---|---|---|---|
| GET | `/health` | API sağlık kontrolü | 200 |
| GET | `/events` | Tüm etkinlikleri listeler | 200 |
| GET | `/events?category=Atölye` | Kategoriye göre filtreler | 200 |
| GET | `/events/:id` | ID ile etkinlik getirir | 200 |
| POST | `/events` | Yeni etkinlik oluşturur | 201 |

## Hata Kodları

- **400:** Zorunlu alanlar eksik.
- **404:** Etkinlik veya endpoint bulunamadı.

Hata yanıtı formatı:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

## Yeni Etkinlik Oluşturma

POST `/events` isteğinde JSON gövdesi kullanılır.

Zorunlu alanlar: `title`, `category` ve `date`.

## Veri Depolama

Etkinlik verileri bellekte (in-memory) tutulur. Sunucu yeniden başlatıldığında sonradan eklenen etkinlikler sıfırlanır.

## Postman Koleksiyonu

Postman Collection v2.1 dosyası `requests/kampus-api.json` konumunda bulunmaktadır.