# Kampüs Etkinlikleri API

Node.js, Express ve MongoDB kullanılarak geliştirilmiş REST API projesidir. Kampüs etkinlikleri üzerinde CRUD işlemleri yapılabilir, etkinlikler aranabilir ve filtrelenebilir.

## Kullanılan Teknolojiler

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Kurulum

Backend klasöründe bağımlılıkları yükleyin:

```bash
npm install
```

Proje ana dizininde `.env` dosyası oluşturun ve gerekli değişkenleri tanımlayın:

```env
PORT=3000
MONGODB_URI=mongodb+srv://...
```

**Not:** Gerçek MongoDB bağlantı adresinizi ve şifrenizi GitHub üzerinde paylaşmayın.

## Çalıştırma

Geliştirme modunda başlatmak için:

```bash
npm run dev
```

Normal başlatma:

```bash
npm start
```

API adresi: `http://localhost:3000`

## Veri Tabanı

Etkinlik verileri MongoDB üzerinde tutulur. Mongoose kullanılarak etkinlik modeli oluşturulmuştur.

Etkinlik alanları:

- `title`: Etkinlik başlığı (zorunlu)
- `category`: Etkinlik kategorisi (zorunlu)
- `capacity`: Katılımcı kapasitesi
- `date`: Etkinlik tarihi (zorunlu, GG-AA-YYYY)
- `time`: Etkinlik saati
- `location`: Etkinlik konumu
- `description`: Etkinlik açıklaması

Seed verilerini yüklemek için:

```bash
npm run seed
```

**Dikkat:** Seed işlemi mevcut etkinlik kayıtlarını silerek örnek verileri yeniden ekler.

## API Endpointleri

| Method | Endpoint | Açıklama | Başarılı Yanıt |
|---|---|---|---|
| GET | `/health` | API sağlık kontrolü | 200 |
| GET | `/events` | Tüm etkinlikleri listeler | 200 |
| GET | `/events?search=atölye` | Başlığa göre arama yapar | 200 |
| GET | `/events?category=Atölye` | Kategoriye göre filtreler | 200 |
| GET | `/events?search=atölye&category=Atölye` | Arama ve kategori filtrelerini birlikte uygular | 200 |
| GET | `/events/upcoming` | Yaklaşan etkinlikleri listeler | 200 |
| GET | `/events/:id` | ID ile etkinlik getirir | 200 |
| POST | `/events` | Yeni etkinlik oluşturur | 201 |
| PATCH | `/events/:id` | Etkinliği günceller | 200 |
| DELETE | `/events/:id` | Etkinliği siler | 204 |

## Arama ve Filtreleme

- `search` parametresi etkinlik başlığında büyük/küçük harf duyarsız arama yapar.
- `category` parametresi etkinlikleri kategorilerine göre filtreler.
- İki parametre birlikte kullanılabilir.
- `/events/upcoming` endpointi geçmiş tarihli etkinlikleri listelemez ve etkinlikleri tarihe göre artan sırada döndürür.

## Tarih Formatı

API isteklerinde ve yanıtlarında tarihler `GG-AA-YYYY` biçiminde kullanılır.

Örnek: `15-12-2026`

Veri tabanında tarihler MongoDB Date türünde saklanır.

## Hata Kodları

- **400 Bad Request:** Eksik veya geçersiz veri, doğrulama hatası ya da korumalı alanı değiştirme girişimi.
- **404 Not Found:** Etkinlik bulunamadığında veya geçersiz bir ID gönderildiğinde.

Hata yanıtı formatı:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

## Postman ve Newman Testleri

Öğretmen tarafından sağlanan Sprint 9 Postman koleksiyonu 18 istek ve 45 otomatik test içerir.

Koleksiyonu Newman ile terminalden çalıştırmak için:

```bash
newman run https://webdersi.vercel.app/test.json
```

JSON test raporunu oluşturmak için:

```bash
newman run https://webdersi.vercel.app/test.json --reporters cli,json --reporter-json-export requests/run-results.json
```

Test sonuçları `requests/run-results.json` dosyasına kaydedilir.

Sprint 9 test sonucu: 18 istek, 45 başarılı test, 0 başarısız test.