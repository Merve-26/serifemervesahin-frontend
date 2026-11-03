
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2>Sayfa veya etkinlik bulunamadı</h2>
      <p>Aradığınız içerik mevcut değil.</p>
      <Link to="/">Ana sayfaya dön</Link>
    </section>
  );
}

export default NotFoundPage;
