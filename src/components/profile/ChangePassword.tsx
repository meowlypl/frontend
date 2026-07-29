import { useState } from "react";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { api } from "../services/api";

export default function ChangePassword() {
  const user = JSON.parse(
    localStorage.getItem("meowlyUser") || "null"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleChangePassword() {
    setMessage("");

    if (!currentPassword || !newPassword || !repeatPassword) {
      setMessage("Uzupełnij wszystkie pola.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setMessage("Nowe hasła nie są takie same.");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Hasło musi mieć minimum 6 znaków.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.put("/change-password", {
        userId: user.id,
        currentPassword,
        newPassword,
      });

      if (response.success) {
        setMessage("✅ Hasło zostało zmienione.");

        setCurrentPassword("");
        setNewPassword("");
        setRepeatPassword("");
      } else {
        setMessage(response.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Wystąpił błąd serwera.");
    }

    setLoading(false);
  }

  return (
    <Card
      title="Zmiana hasła"
      subtitle="Zadbaj o bezpieczeństwo swojego konta."
    >
      <div className="space-y-5">

        <Input
          label="Aktualne hasło"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <Input
          label="Nowe hasło"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Input
          label="Powtórz nowe hasło"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        {message && (
          <div className="rounded-2xl bg-orange-50 p-4 text-center font-semibold text-orange-600">
            {message}
          </div>
        )}

        <Button
          fullWidth
          loading={loading}
          onClick={handleChangePassword}
        >
          Zmień hasło
        </Button>

      </div>
    </Card>
  );
}