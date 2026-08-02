import { useState } from "react";

import AccountTypeSelector from "./AccountTypeSelector";
import { api } from "../services/api";

interface Props {
  onSuccess?: () => void;
}

const inputClassName = "mt-1.5 h-[52px] w-full rounded-xl border border-light-border/45 bg-light-overlay/25 px-4 text-light-text outline-none transition-colors placeholder:text-light-subtext/65 focus:border-[#c15a15] focus:ring-2 focus:ring-[#c15a15]/20 dark:border-border/45 dark:bg-overlay/25 dark:text-text dark:placeholder:text-subtext/65";

export default function RegisterForm({
  onSuccess,
}: Props) {
  const [accountType, setAccountType] = useState("user");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister() {
    setMessage("");

    if (!name || !email || !password) {
      setMessage("Uzupełnij wszystkie pola.");
      return;
    }

    if (password.length < 6) {
      setMessage("Hasło musi mieć minimum 6 znaków.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register", {
        name,
        email,
        password,
        role: accountType,
      });

      if (response.success) {
        setMessage("🎉 Konto zostało utworzone.");

        setName("");
        setEmail("");
        setPassword("");

        onSuccess?.();
      } else {
        setMessage(
          response.message || "Nie udało się utworzyć konta."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("Wystąpił błąd serwera.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1
        id="register-heading"
        className="mt-7 text-[2rem] font-black leading-none tracking-[-0.04em]"
      >
        Załóż konto
      </h1>

      <div className="mt-7 space-y-4">
        <AccountTypeSelector
          value={accountType}
          onChange={setAccountType}
        />

        <div>
          <label htmlFor="register-name" className="text-sm font-bold">
            {accountType === "foundation" ? "Nazwa fundacji" : "Imię"}
          </label>
          <input
            id="register-name"
            type="text"
            autoComplete={accountType === "foundation" ? "organization" : "given-name"}
            placeholder={accountType === "foundation" ? "Fundacja Koci Azyl" : "Jan"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="register-email" className="text-sm font-bold">
            Adres e-mail
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="twoj@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="register-password" className="text-sm font-bold">
            Hasło
          </label>
          <input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder="Minimum 6 znaków"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClassName}
          />
        </div>

        {message && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl border border-light-border/35 bg-light-overlay/30 px-4 py-3 text-sm font-bold text-light-text dark:border-border/40 dark:bg-overlay/30 dark:text-text"
          >
            {message}
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={handleRegister}
          className="btn inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-[#c15a15] px-6 font-black text-white hover:bg-[#a94d11] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#d56b24] dark:hover:bg-[#e27a31] dark:focus-visible:outline-border"
        >
          {loading ? "Ładowanie..." : "Załóż konto"}
        </button>
      </div>
    </div>
  );
}
