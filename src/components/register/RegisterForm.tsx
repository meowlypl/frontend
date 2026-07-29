import { useState } from "react";

import Button from "../ui/Button";
import Input from "../ui/Input";
import AccountTypeSelector from "./AccountTypeSelector";

import { api } from "../services/api";

interface Props {
  onSuccess?: () => void;
}

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
    <div className="rounded-[36px] bg-white p-10 shadow-xl">
      <h2 className="text-center text-4xl font-black text-slate-900">
        Załóż konto
      </h2>

      <p className="mt-3 text-center text-slate-500">
        Dołącz do społeczności Meowly.
      </p>

      <div className="mt-8 space-y-5">
        <AccountTypeSelector
          value={accountType}
          onChange={setAccountType}
        />

        <Input
          label={
            accountType === "foundation"
              ? "Nazwa fundacji"
              : "Imię"
          }
          placeholder={
            accountType === "foundation"
              ? "Fundacja Koci Azyl"
              : "Jan"
          }
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label="Adres e-mail"
          type="email"
          placeholder="twoj@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Hasło"
          type="password"
          placeholder="Minimum 6 znaków"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && (
          <div className="rounded-2xl bg-orange-50 p-4 text-center font-semibold text-orange-600">
            {message}
          </div>
        )}

        <Button
          fullWidth
          loading={loading}
          onClick={handleRegister}
        >
          Załóż konto
        </Button>
      </div>
    </div>
  );
}