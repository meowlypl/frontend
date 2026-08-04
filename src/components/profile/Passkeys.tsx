import { useEffect, useState } from "react";
import { AlertCircle, KeyIcon, Loader } from "lucide-react";
import { startRegistration } from "@simplewebauthn/browser";
import Button from "../ui/Button";

type Passkey = {
  id: string;
  name: string;
};

export default function ChangePassword() {
  const [ fail, setFailed ] = useState<boolean>(false)
  const [ passkeys, setPasskeys ] = useState<Array<Passkey>>()

  async function newKey() {
    const API = `${import.meta.env.VITE_API_URL}/passkey`
    const opt = await (fetch(`${API}/opt/register`, {
      method: 'POST',
      credentials: 'include'
    }).then(r => r.json()))

    const credential = await startRegistration({ optionsJSON: opt });

    const name = prompt('Nazwa klucza:')

    const res = await (fetch(`${API}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credential, name })
    }).then(r => r.json()))
    if(res.verified) {
      loadKeys()
      alert('registered!')
    }
  }
  function loadKeys() {
    fetch(`${import.meta.env.VITE_API_URL}/passkey/list`, { credentials: 'include' })
      .then(async (r) => {
        if(r.status == 404) return setPasskeys([])
        if(r.status == 200) {
          const res = await r.json()
          setPasskeys(res.list)
        } else {
          console.error(await r.text())
          setFailed(true)
        }
      })
  }
  useEffect(loadKeys, [])

  return (
    <div
      className={`
        rounded-[32px]
        shadow-xl
        border-2
        border-light-overlay
        dark:border-border
        card-hover
        p-7
      `}
    >
      <div className="mb-5 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-black text-light-text dark:text-text">
            Klucze dostępu
          </h2>

          <p className="mt-2 text-light-subtext dark:text-subtext">
            Zarządzaj kluczami dostępu do swojego konta
          </p>
        </div>

        <button
          onClick={newKey}
          className="btn h-14 rounded-2xl min-w-14 text-2xl/14 bg-light-border dark:bg-border text-white hover:brightness-105"
        >
          +
        </button>

      </div>

      <div className="space-y-5">

        { passkeys && passkeys?.length > 0 ? passkeys?.map((key) => (
            <div
              key={key.id}
              className="flex items-center justify-between rounded-3xl bg-light-overlay dark:bg-overlay p-5 transition hover:shadow-lg"
            >

              <h2 className="text-lg font-bold text-light-text dark:text-text">
                {key.name}
              </h2>

              <button
                onClick={() => {
                  const password = prompt('Potwierdź usunięcie klucza hasłem')
                  if(!password) return

                  fetch(`${import.meta.env.VITE_API_URL}/passkey/${key.id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: { password }
                  }).then(async r => {
                    if(r.status == 200) {
                      loadKeys()
                    } else {
                      console.error(await r.text())
                      setFailed(true)
                    }
                  })
                }}
                style={{ background: 'hsl(357, 80.37%, 50%)' }}
                className="btn rounded-2xl bg-red-500 px-5 py-3 font-semibold text-white"
              >
                Usuń
              </button>
            </div>
          )) : fail ? (
            <div className="rounded-[36px] bg-red-500 px-6 py-16 text-center shadow-sm text-white">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>

              <h2 className="text-xl font-bold">
                Coś poszło nie tak
              </h2>
            </div>
          ) : !passkeys ? (
            <div className="rounded-[36px] bg-light-border px-6 py-16 text-center shadow-sm text-white">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <Loader className="h-8 w-8 text-gray-500" />
              </div>

              <h2 className="text-xl font-bold">
                Ładowanie
              </h2>
            </div>
          ) : (
            <div className="rounded-[36px] bg-light-overlay dark:bg-overlay px-6 py-8 text-center shadow-sm text-white">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <KeyIcon className="h-8 w-8 text-gray-500" />
              </div>

              <h2 className="text-xl font-bold">
                Brak kluczy dostępu
              </h2>

              <Button
                onClick={newKey}
                className="mt-3 block w-full"
                type="button"
                fullWidth
              >
                Dodaj klucz dostępu
              </Button>
            </div>
          )
        }

      </div>

    </div>
  )
}