
import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.includes("@")) {
      setMessage("Geçerli bir e-posta adresi giriniz.");
      return;
    }

    if (password.length < 6) {
      setMessage("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    setMessage("Giriş başarılı! (Demo)");
  }

  return (
    <section>
      <h2>Giriş Yap</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Giriş Yap</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
      </p>

      <p>
        <Link to="/forgot-password">Şifremi Unuttum</Link>
      </p>
    </section>
  );
}

export default LoginPage;
