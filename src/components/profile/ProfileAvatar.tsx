import { useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };

  onAvatarChanged?: (avatar: string) => void;
}

export default function ProfileAvatar({
  user,
  onAvatarChanged,
}: Props) {
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [loading, setLoading] = useState(false);

  async function uploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch(`https://grosik.dev/upload-avatar/${user.id}`, {
        body: formData,
        method: 'POST',
        headers: { "Content-Type":"multipart/form-data" }
      }).then(_ => _.json());

      const newAvatar = response.data.avatar;

      setAvatar(newAvatar);

      const updatedUser = {
        ...user,
        avatar: newAvatar,
      };

      localStorage.setItem(
        "meowlyUser",
        JSON.stringify(updatedUser)
      );

      onAvatarChanged?.(newAvatar);
    } catch (err) {
      console.error(err);
      alert("Nie udało się przesłać zdjęcia.");
    }

    setLoading(false);
  }

  return (
    <Card>

      <div className="flex flex-col items-center">

        <div className="mb-6 h-40 w-40 overflow-hidden rounded-full bg-orange-500 shadow-xl">

          {avatar ? (
            <img
              src={avatar}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-6xl font-black text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

        </div>

        <h2 className="text-3xl font-black text-slate-900">
          {user.name}
        </h2>

        <p className="mt-2 text-slate-500">
          {user.email}
        </p>

        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={uploadAvatar}
        />

        <Button
          onClick={() => document.getElementById('avatar-upload')?.click()}
          className="mt-8 block w-full"
          type="button"
          fullWidth
          loading={loading}
        >
          Zmień zdjęcie
        </Button>

      </div>

    </Card>
  );
}