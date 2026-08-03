import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const DISMISSED_KEY = "meowly-landing-report-info-dismissed";

export default function ReportInfoDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    try {
      if (localStorage.getItem(DISMISSED_KEY) === "true") return;
    } catch {
      // The landing remains usable when storage is unavailable.
    }

    if (typeof dialog.showModal !== "function") return;

    dialog.showModal();
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const closeDialog = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem(DISMISSED_KEY, "true");
      } catch {
        // Closing the dialog should never depend on storage access.
      }
    }

    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="report-info-title"
      aria-describedby="report-info-description"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(34rem,calc(100%-2rem))] overflow-y-auto rounded-2xl border border-light-border/60 bg-light-base p-0 text-light-text shadow-[0_16px_48px_rgba(24,20,17,0.14)] backdrop:bg-black/50 dark:border-border/60 dark:bg-base dark:text-text dark:shadow-[0_16px_48px_rgba(0,0,0,0.32)]"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const rect = event.currentTarget.getBoundingClientRect();
        const clickedOutside =
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom;

        if (clickedOutside) closeDialog();
      }}
    >
      <div className="px-5 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-6">
        <div className="flex items-start gap-5">
          <h2
            id="report-info-title"
            className="meowly-landing-revealed min-w-0 flex-1 text-[1.375rem] font-black leading-[1.2] tracking-[-0.025em] sm:text-2xl"
          >
            Widzisz kota, który potrzebuje pomocy?
          </h2>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDialog}
            aria-label="Zamknij informację"
            className="-mr-1 -mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-light-subtext transition-colors hover:bg-light-overlay hover:text-light-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] dark:text-subtext dark:hover:bg-overlay dark:hover:text-text"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <p
          id="report-info-description"
          className="mt-4 max-w-[29rem] text-[0.9375rem] font-medium leading-6 text-light-subtext dark:text-subtext sm:text-base"
        >
          Dodaj miejsce i krótki opis. Zgłoszenie trafi do mieszkańców i fundacji,
          które mogą pomóc.
        </p>

        <div className="mt-6 flex flex-col gap-4 border-t border-light-border/50 pt-5 dark:border-border/50 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-light-subtext dark:text-subtext">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(event) => setDontShowAgain(event.target.checked)}
              className="size-4 shrink-0 rounded border-light-border accent-[#c15a15] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] dark:border-border"
            />
            <span>Nie pokazuj ponownie</span>
          </label>

          <button
            type="button"
            onClick={closeDialog}
            className="inline-flex h-10 items-center justify-center self-end rounded-lg bg-[#c15a15] px-5 text-sm font-bold text-white transition-colors hover:bg-[#a94d11] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c15a15] dark:bg-[#d56b24] dark:hover:bg-[#e27a31] sm:self-auto"
          >
            Zamknij
          </button>
        </div>
      </div>
    </dialog>
  );
}
