# Kampüs Etkinlikleri

Üniversite öğrencilerinin kampüs etkinliklerini görüntüleyebildiği, arayabildiği ve kategorilere göre filtreleyebildiği bir web uygulamasıdır.

## Canlı Proje

[Projeyi Görüntüle](https://serifemervesahin-frontend.vercel.app)

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- React Router DOM
- CSS

## Özellikler

- Ana sayfada yaklaşan etkinlikleri görüntüleme
- Etkinlikleri listeleme ve detaylarını inceleme
- Etkinlik arama ve kategoriye göre filtreleme
- Yeni etkinlik ekleme
- Etkinlik bilgilerini güncelleme
- Etkinlik silme ve silme öncesi onay alma
- Context API ile etkinlik verilerini yönetme
- Giriş yapma, kayıt olma ve şifre sıfırlama sayfaları
- Form doğrulama işlemleri
- Mobil uyumlu tasarım

## Sayfalar ve Rotalar

| Sayfa | Rota |
|---|---|
| Ana Sayfa | `/` |
| Etkinlikler | `/events` |
| Etkinlik Detayı | `/events/:id` |
| Giriş Yap | `/login` |
| Kayıt Ol | `/register` |
| Şifremi Unuttum | `/forgot-password` |
| Yönetim | `/admin` |
| Yeni Etkinlik | `/admin/new` |
| Etkinlik Düzenle | `/admin/:id/edit` |
| Bulunamadı | `*` |

## Kurulum

Projeyi bilgisayarınızda çalıştırmak için:

```bash
npm install
npm run dev
```

Üretim sürümünü oluşturmak için:

```bash
npm run build
```

## Geliştirici

Şerife Merve Şahin

Bilgisayar Mühendisliği