import { useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

import { api } from "../services/api";

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
  };

  onUpdated?: () => void;
}

export default function ProfileSettings({
  user,
  onUpdated,
}: Props) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function saveProfile() {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.put(`/users/${user.id}`, {
        name,
        email,
      });

      if (response.data.success) {
        const updatedUser = {
          ...user,
          name,
          email,
        };

        localStorage.setItem(
          "meowlyUser",
          JSON.stringify(updatedUser)
        );

        setMessage("Profil został zapisany.");

        onUpdated?.();
      } else {
        setMessage(
          response.data.message ||
            "Nie udało się zapisać zmian."
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("Wystąpił błąd.");
    }

    setLoading(false);
  }

  return (
    <Card>

      <h2 className="text-2xl font-black text-slate-900">
        Ustawienia konta
      </h2>

      <p className="mt-2 text-slate-500">
        Zmień podstawowe informacje o swoim koncie.
      </p>

      <div className="mt-6 space-y-5">

        <Input
          label="Imię"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <Input
          label="Adres e-mail"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {message && (
          <div className="rounded-2xl bg-orange-50 p-4 text-center font-semibold text-orange-600">
            {message}
          </div>
        )}

        <Button
          fullWidth
          loading={loading}
          onClick={saveProfile}
        >
          Zapisz zmiany
        </Button>

      </div>

    </Card>
  );
}