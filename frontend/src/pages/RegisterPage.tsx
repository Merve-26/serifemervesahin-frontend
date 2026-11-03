
import { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length === 0) {
      setMessage("Lütfen adınızı giriniz.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("Geçerli bir e-posta adresi giriniz.");
      return;
    }

    if (password.length < 6) {
      setMessage("Şifre en az 6 karakter olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }

    setMessage("Kayıt başarılı! (Demo)");
  }

  return (
    <section>
      <h2>Kayıt Ol</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Ad Soyad</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div>
          <label>Şifre Tekrar</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">Kayıt Ol</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
