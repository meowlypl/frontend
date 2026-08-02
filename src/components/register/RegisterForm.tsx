import { useState } from "react";

import AccountTypeSelector from "./AccountTypeSelector";
import { api } from "../services/api";

interface Props {
  onSuccess?: () => void;
}

type Message = {
  text: string;
  type: "success" | "error";
};

const inputClassName = "mt-1.5 h-[52px] w-full rounded-xl border border-light-border/45 bg-light-overlay/25 px-4 text-light-text outline-none transition-colors placeholder:text-light-subtext/65 focus:border-[#c15a15] focus:ring-2 focus:ring-[#c15a15]/20 dark:border-border/45 dark:bg-overlay/25 dark:text-text dark:placeholder:text-subtext/65";

export default function RegisterForm({
  onSuccess,
}: Props) {
  const [accountType, setAccountType] = useState("user");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const passwordChecks = [
    { label: "8 znaków", met: password.length >= 8 },
    { label: "Duża litera", met: /[A-Z]/.test(password) },
    { label: "Mała litera", met: /[a-z]/.test(password) },
    { label: "Cyfra", met: /\d/.test(password) },
    { label: "Znak specjalny", met: /[^A-Za-z0-9\s]/.test(password) },
  ];
  const strengthScore = passwordChecks.filter((check) => check.met).length;
  const strengthLabel = strengthScore === 5 ? "Silne" : strengthScore >= 3 ? "Średnie" : "Słabe";
  const strengthColor = strengthScore === 5
    ? "bg-emerald-600 dark:bg-emerald-500"
    : strengthScore >= 3
      ? "bg-amber-600 dark:bg-amber-500"
      : "bg-red-600 dark:bg-red-500";

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setMessage(null);

    if (!name || !email || !password || !confirmPassword) {
      setMessage({ text: "Uzupełnij wszystkie pola.", type: "error" });
      return;
    }

    const failedCheck = passwordChecks.find((check) => !check.met);
    if (failedCheck) {
      const validationMessages: Record<string, string> = {
        "8 znaków": "Hasło musi mieć co najmniej 8 znaków.",
        "Duża litera": "Hasło musi zawierać co najmniej jedną dużą literę.",
        "Mała litera": "Hasło musi zawierać co najmniej jedną małą literę.",
        Cyfra: "Hasło musi zawierać co najmniej jedną cyfrę.",
        "Znak specjalny": "Hasło musi zawierać co najmniej jeden znak specjalny.",
      };
      setMessage({ text: validationMessages[failedCheck.label], type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Podane hasła nie są zgodne.", type: "error" });
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

      const isCreated = response.success === true ||
        Number(response.code) === 201 ||
        Number(response.status) === 201 ||
        Number(response.statusCode) === 201;

      if (isCreated) {
        setMessage({
          text: "Konto zostało utworzone. Za chwilę przejdziemy do logowania.",
          type: "success",
        });

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        onSuccess?.();
      } else {
        setMessage({
          text: response.message || "Nie udało się utworzyć konta.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        text: err instanceof Error && err.message.trim()
          ? err.message
          : "Wystąpił błąd serwera.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleRegister}>
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
            name="name"
            type="text"
            required
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
            name="email"
            type="email"
            required
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
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Minimum 8 znaków"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby={password ? "password-strength password-requirements" : undefined}
            className={inputClassName}
          />
          {password && (
            <div className="mt-2.5">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-light-subtext dark:text-subtext">Siła hasła</span>
                <span
                  id="password-strength"
                  aria-live="polite"
                  className="font-bold text-light-text dark:text-text"
                >
                  {strengthLabel}
                </span>
              </div>
              <div className="mt-1.5 grid grid-cols-5 gap-1" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((segment) => (
                  <span
                    key={segment}
                    className={`h-1 rounded-sm ${
                      segment <= strengthScore
                        ? strengthColor
                        : "bg-light-border/35 dark:bg-border/40"
                    }`}
                  />
                ))}
              </div>
              <ul
                id="password-requirements"
                className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-light-subtext min-[380px]:grid-cols-3 dark:text-subtext"
              >
                {passwordChecks.map((check) => (
                  <li
                    key={check.label}
                    className={check.met ? "text-emerald-700 dark:text-emerald-400" : undefined}
                  >
                    <span aria-hidden="true">{check.met ? "✓" : "·"}</span>{" "}
                    {check.label}
                    <span className="sr-only">{check.met ? " — spełnione" : " — niespełnione"}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="register-confirm-password" className="text-sm font-bold">
            Powtórz hasło
          </label>
          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Wpisz hasło ponownie"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-describedby={confirmPassword ? "password-match" : undefined}
            className={inputClassName}
          />
          {confirmPassword && (
            <p
              id="password-match"
              aria-live="polite"
              className={`mt-2 text-xs font-bold ${
                password === confirmPassword
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {password === confirmPassword ? "Hasła są zgodne" : "Hasła nie są zgodne"}
            </p>
          )}
        </div>

        {message && (
          <div
            role={message.type === "error" ? "alert" : "status"}
            aria-live={message.type === "error" ? "assertive" : "polite"}
            className={`rounded-xl border px-4 py-3 text-sm font-bold ${
              message.type === "success"
                ? "border-emerald-300/70 bg-emerald-50 text-emerald-800 dark:border-emerald-900/80 dark:bg-emerald-950/30 dark:text-emerald-300"
                : "border-red-300/70 bg-red-50 text-red-700 dark:border-red-900/80 dark:bg-red-950/30 dark:text-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-[#c15a15] px-6 font-black text-white hover:bg-[#a94d11] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#d56b24] dark:hover:bg-[#e27a31] dark:focus-visible:outline-border"
        >
          {loading ? "Ładowanie..." : "Załóż konto"}
        </button>
      </div>
    </form>
  );
}
