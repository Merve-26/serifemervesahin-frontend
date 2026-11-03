
import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setMessage("Geçerli bir e-posta adresi giriniz.");
      return;
    }

    setMessage("Şifre sıfırlama bağlantısı gönderildi! (Demo)");
  }

  return (
    <section>
      <h2>Şifremi Unuttum</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>E-posta adresi</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Bağlantı Gönder</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        <Link to="/login">Giriş sayfasına dön</Link>
      </p>
    </section>
  );
}

export default ForgotPasswordPage;
