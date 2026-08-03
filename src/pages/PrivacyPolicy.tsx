import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  ["administrator", "Administrator danych"],
  ["iod", "Inspektor ochrony danych"],
  ["zakres", "Zakres i źródła danych"],
  ["cele", "Cele i podstawy prawne"],
  ["obowiazek", "Podanie danych"],
  ["odbiorcy", "Odbiorcy danych"],
  ["transfery", "Transfery poza EOG"],
  ["retencja", "Okres przechowywania"],
  ["prawa", "Twoje prawa"],
  ["profilowanie", "Profilowanie"],
  ["dzieci", "Dzieci"],
  ["cookies", "Cookies i pamięć przeglądarki"],
  ["bezpieczenstwo", "Bezpieczeństwo"],
  ["integracje", "Linki i integracje"],
  ["zmiany", "Zmiany polityki"],
] as const;

function getInitialTheme() {
  return (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
}

function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="font-bold text-[#a94d11] dark:text-[#e48848]">
      [DO UZUPEŁNIENIA: {children}]
    </span>
  );
}

function Section({
  number,
  id,
  title,
  children,
}: {
  number: number;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-light-border/30 py-10 first:border-t-0 first:pt-0 dark:border-border/30">
      <p className="mb-2 text-xs font-black tabular-nums tracking-[0.16em] text-[#c15a15] dark:text-[#d56b24]">
        {String(number).padStart(2, "0")}
      </p>
      <h2 className="text-2xl font-black leading-tight tracking-[-0.035em] text-light-text sm:text-3xl dark:text-text">
        {title}
      </h2>
      <div className="mt-5 space-y-4 leading-7 text-light-subtext dark:text-subtext">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <div className="min-h-screen bg-light-base text-light-text selection:bg-light-border selection:text-white dark:bg-base dark:text-text dark:selection:bg-border">
      <a href="#tresc" className="sr-only z-[60] rounded-lg bg-[#c15a15] px-4 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Przejdź do treści
      </a>

      <header className="sticky top-0 z-50 border-b border-light-border/25 bg-light-base dark:border-border/30 dark:bg-base">
        <nav aria-label="Nawigacja strony" className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-7 lg:px-10">
          <Link to="/" className="btn mr-3 grid size-9 place-items-center rounded-lg text-light-subtext hover:bg-light-overlay hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-subtext dark:hover:bg-overlay dark:hover:text-text dark:focus-visible:outline-border" aria-label="Wróć na stronę główną">
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
          <Link to="/" aria-label="Meowly — strona główna" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:focus-visible:outline-border">
            <img src="/logo-marketing.png" alt="Meowly" className="h-8 w-auto object-contain sm:h-9" />
          </Link>
          <button type="button" onClick={() => setDark((value) => !value)} aria-label={dark ? "Włącz jasny motyw" : "Włącz ciemny motyw"} aria-pressed={dark} className="btn ml-auto grid size-9 place-items-center rounded-lg text-light-subtext hover:bg-light-overlay hover:text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border dark:text-subtext dark:hover:bg-overlay dark:hover:text-text dark:focus-visible:outline-border">
            {dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
        </nav>
      </header>

      <main id="tresc" className="mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-7 sm:pt-20 lg:px-10">
        <header className="max-w-3xl">
          <p className="text-sm font-bold text-[#c15a15] dark:text-[#d56b24]">Dokument prawny</p>
          <h1 className="mt-3 text-[clamp(2.7rem,7vw,5.75rem)] font-black leading-[0.98] tracking-[-0.065em]">Polityka prywatności</h1>
          <p className="mt-6 text-sm font-bold text-light-subtext dark:text-subtext">
            Ostatnia aktualizacja: <Placeholder>DD.MM.RRRR</Placeholder>
          </p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-light-subtext dark:text-subtext">
            Tutaj wyjaśniamy, jakie dane mogą być przetwarzane w Meowly, po co są potrzebne i jakie masz prawa. Zależy nam, żeby te zasady były zrozumiałe także bez znajomości języka prawnego.
          </p>
        </header>

        <aside className="mt-10 max-w-3xl rounded-2xl border border-[#c15a15]/45 bg-light-overlay/55 p-5 sm:p-6 dark:border-[#d56b24]/50 dark:bg-overlay/65" aria-labelledby="draft-warning">
          <h2 id="draft-warning" className="font-black text-light-text dark:text-text">Ten dokument wymaga uzupełnienia przed publikacją</h2>
          <p className="mt-2 leading-7 text-light-subtext dark:text-subtext">
            Pola oznaczone <strong>[DO UZUPEŁNIENIA]</strong> muszą zostać zastąpione prawdziwymi informacjami. Ostateczną treść należy sprawdzić z faktycznym działaniem backendu, umowami z dostawcami i rejestrem czynności przetwarzania oraz poddać weryfikacji prawnej.
          </p>
        </aside>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[220px_minmax(0,780px)] lg:gap-16">
          <nav aria-label="Spis treści" className="border-y border-light-border/30 py-5 lg:sticky lg:top-24 lg:border-y-0 lg:border-l lg:py-1 lg:pl-5 dark:border-border/30">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-light-subtext dark:text-subtext">Na tej stronie</p>
            <ol className="grid grid-cols-1 gap-x-5 gap-y-1.5 text-sm sm:grid-cols-2 lg:block lg:space-y-1">
              {sections.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`} className="block rounded py-1.5 leading-5 text-light-subtext hover:text-[#c15a15] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-border lg:py-1 dark:text-subtext dark:hover:text-[#d56b24] dark:focus-visible:outline-border">
                    <span className="mr-2 tabular-nums opacity-60">{String(index + 1).padStart(2, "0")}</span>{label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="min-w-0">
            <Section number={1} id="administrator" title="Administrator danych">
              <p>Administratorem Twoich danych osobowych jest <Placeholder>pełna nazwa i forma prawna podmiotu</Placeholder>, z siedzibą pod adresem <Placeholder>pełny adres siedziby</Placeholder>.</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-[#c15a15] dark:marker:text-[#d56b24]">
                <li>KRS / rejestr: <Placeholder>numer i właściwy rejestr — jeżeli dotyczy</Placeholder></li>
                <li>NIP: <Placeholder>NIP</Placeholder>; REGON: <Placeholder>REGON</Placeholder></li>
                <li>E-mail dotyczący prywatności: <Placeholder>adres e-mail</Placeholder></li>
                <li>Adres korespondencyjny: <Placeholder>adres do korespondencji</Placeholder></li>
              </ul>
            </Section>

            <Section number={2} id="iod" title="Inspektor ochrony danych">
              <p><Placeholder>wskaż imię i nazwisko lub funkcję Inspektora Ochrony Danych oraz jego dane kontaktowe; jeżeli IOD nie został powołany, zastąp ten tekst prawdziwą informacją i podaj właściwy kontakt w sprawach danych osobowych</Placeholder>.</p>
            </Section>

            <Section number={3} id="zakres" title="Zakres i źródła danych">
              <p>W zależności od włączonych funkcji możemy przetwarzać następujące kategorie danych:</p>
              <ul className="list-disc space-y-2 pl-5 marker:text-[#c15a15] dark:marker:text-[#d56b24]">
                <li>dane konta — imię, nazwa fundacji lub schroniska, adres e-mail i rola użytkownika;</li>
                <li>dane logowania i uwierzytelniania oraz <Placeholder>potwierdź pełny zakres danych autoryzacyjnych</Placeholder>;</li>
                <li>dane profilu i zdjęcie profilowe, jeżeli użytkownik je doda;</li>
                <li>dane zgłoszeń — lokalizacja, opis, zdjęcia i dane kontaktowe, jeśli są wymagane lub dobrowolnie podane;</li>
                <li>dane dotyczące fundacji, zwierząt, wydarzeń i wolontariatu — w zakresie funkcji faktycznie dostępnych;</li>
                <li>aktywność w misjach, punkty XP i miejsce w rankingu;</li>
                <li>treść wiadomości, zapytań i korespondencji;</li>
                <li>dane techniczne, takie jak adres IP, czas zdarzenia, typ przeglądarki i urządzenia — <Placeholder>zweryfikuj zakres logów backendu i infrastruktury</Placeholder>;</li>
                <li>dane zapisane lokalnie w przeglądarce, opisane w sekcji 12.</li>
              </ul>
              <p>Dane otrzymujemy przede wszystkim od Ciebie. Mogą pochodzić także od innych użytkowników, fundacji, schronisk lub publicznie dostępnych źródeł, jeśli dana funkcja to przewiduje. <Placeholder>potwierdź, czy występuje pozyskiwanie pośrednie; jeśli tak, uzupełnij obowiązek informacyjny zgodnie z art. 14 RODO, w tym źródła i kategorie danych</Placeholder>.</p>
            </Section>

            <Section number={4} id="cele" title="Cele i podstawy prawne">
              <div className="overflow-x-auto rounded-xl border border-light-border/30 dark:border-border/30">
                <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                  <thead className="bg-light-overlay/65 text-light-text dark:bg-overlay/70 dark:text-text"><tr><th className="p-4 font-black">Cel</th><th className="p-4 font-black">Podstawa</th><th className="p-4 font-black">Co trzeba potwierdzić</th></tr></thead>
                  <tbody className="divide-y divide-light-border/25 dark:divide-border/25">
                    <tr><td className="p-4 align-top">Utworzenie i obsługa konta, udostępnienie funkcji serwisu</td><td className="p-4 align-top">art. 6 ust. 1 lit. b RODO — umowa lub działania przed jej zawarciem</td><td className="p-4 align-top"><Placeholder>regulamin i dokładny zakres usługi</Placeholder></td></tr>
                    <tr><td className="p-4 align-top">Bezpieczeństwo, zapobieganie nadużyciom, moderacja, ulepszanie serwisu i dochodzenie roszczeń — jeśli dotyczy</td><td className="p-4 align-top">art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes administratora</td><td className="p-4 align-top"><Placeholder>potwierdź cele, interesy i wynik testu równowagi</Placeholder></td></tr>
                    <tr><td className="p-4 align-top">Wypełnienie obowiązków prawnych</td><td className="p-4 align-top">art. 6 ust. 1 lit. c RODO</td><td className="p-4 align-top"><Placeholder>właściwe przepisy i obowiązki</Placeholder></td></tr>
                    <tr><td className="p-4 align-top">Opcjonalne komunikaty marketingowe, analityka lub niekonieczne cookies — wyłącznie jeśli są używane</td><td className="p-4 align-top">art. 6 ust. 1 lit. a RODO — zgoda, możliwa do wycofania</td><td className="p-4 align-top"><Placeholder>zakres zgód i narzędzia; usuń wiersz, jeśli nie dotyczy</Placeholder></td></tr>
                    <tr><td className="p-4 align-top">Ochrona żywotnych interesów osoby — wyjątkowo, gdy ma zastosowanie</td><td className="p-4 align-top">art. 6 ust. 1 lit. d RODO</td><td className="p-4 align-top"><Placeholder>potwierdź, czy taka sytuacja może wystąpić; w przeciwnym razie usuń wiersz</Placeholder></td></tr>
                  </tbody>
                </table>
              </div>
              <p>Zgoda nie jest podstawą przetwarzania danych niezbędnych do świadczenia podstawowej usługi.</p>
            </Section>

            <Section number={5} id="obowiazek" title="Czy musisz podawać dane?">
              <p>Podanie danych oznaczonych jako wymagane jest niezbędne, aby utworzyć konto lub skorzystać z wybranej funkcji. Bez nich możemy nie móc wykonać tej czynności. Pozostałe dane są dobrowolne, a ich brak nie powinien ograniczać podstawowych funkcji, chyba że przy konkretnym polu wyjaśniono inaczej. <Placeholder>wskaż pola obowiązkowe, dobrowolne i konkretne konsekwencje ich niepodania</Placeholder>.</p>
            </Section>

            <Section number={6} id="odbiorcy" title="Odbiorcy danych">
              <p>Dane mogą otrzymywać wyłącznie podmioty, które potrzebują ich do wykonania określonego zadania: dostawcy hostingu, utrzymania IT, poczty, przechowywania plików, map oraz — tylko jeśli są używane — analityki; doradcy prawni i księgowi; a także uprawnione organy publiczne.</p>
              <p><Placeholder>lista dostawców, ich role, kraje przetwarzania i zawarte umowy powierzenia (DPA)</Placeholder>. Każdy odbiorca powinien uzyskiwać wyłącznie niezbędny zakres danych.</p>
            </Section>

            <Section number={7} id="transfery" title="Transfery poza Europejski Obszar Gospodarczy">
              <p><Placeholder>potwierdź, czy dane są przekazywane poza EOG — TAK/NIE</Placeholder>. Jeśli tak, należy wskazać państwo, odbiorcę i podstawę transferu, np. decyzję stwierdzającą odpowiedni stopień ochrony lub standardowe klauzule umowne, a także opisać, jak uzyskać kopię zastosowanych zabezpieczeń: <Placeholder>mechanizm, dodatkowe środki i kanał kontaktu</Placeholder>.</p>
            </Section>

            <Section number={8} id="retencja" title="Jak długo przechowujemy dane">
              <p>Przechowujemy dane nie dłużej, niż jest to potrzebne do wskazanych celów. Po upływie właściwego okresu dane są usuwane lub anonimizowane, chyba że prawo wymaga dalszego przechowywania.</p>
              <ul className="divide-y divide-light-border/25 border-y border-light-border/25 dark:divide-border/25 dark:border-border/25">
                {[
                  ["Aktywne konto", "do zamknięcia konta oraz przez okres potrzebny do rozliczenia usługi"],
                  ["Dane po usunięciu konta", "okres i wyjątki, w tym kopie zapasowe"],
                  ["Zgłoszenia i publikowane treści", "okres, kryteria usuwania lub anonimizacji"],
                  ["Logi bezpieczeństwa", "okres przechowywania logów"],
                  ["Korespondencja", "okres zależny od celu sprawy"],
                  ["Dowody zgód", "okres wykazania zgody i jej wycofania"],
                  ["Roszczenia i obowiązki prawne", "terminy przedawnienia i właściwe przepisy"],
                ].map(([label, detail]) => <li key={label} className="grid gap-1 py-3 sm:grid-cols-[190px_1fr] sm:gap-5"><strong className="text-light-text dark:text-text">{label}</strong><span><Placeholder>{detail}</Placeholder></span></li>)}
              </ul>
            </Section>

            <Section number={9} id="prawa" title="Twoje prawa">
              <p>W zależności od podstawy i okoliczności przetwarzania możesz żądać dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania i przenoszenia, a także wnieść sprzeciw. Możesz wycofać zgodę w dowolnym momencie; nie wpływa to na zgodność z prawem przetwarzania sprzed jej wycofania.</p>
              <p>Prawa nie są bezwzględne — ich zastosowanie zależy m.in. od podstawy prawnej i obowiązków administratora. Wniosek wyślij na: <Placeholder>adres e-mail lub pocztowy do obsługi praw osób</Placeholder>.</p>
              <p>Masz także prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych. Aktualne informacje kontaktowe znajdziesz na stronie <a href="https://uodo.gov.pl/" target="_blank" rel="noreferrer" className="font-bold text-[#a94d11] underline decoration-[#c15a15]/40 underline-offset-4 hover:decoration-[#c15a15] dark:text-[#e48848]">uodo.gov.pl</a>.</p>
            </Section>

            <Section number={10} id="profilowanie" title="Zautomatyzowane decyzje i profilowanie">
              <p><Placeholder>potwierdź, czy występuje profilowanie lub zautomatyzowane podejmowanie decyzji, w tym decyzje wywołujące skutki prawne lub podobnie istotnie wpływające na osobę; jeśli tak, opisz zasady działania, znaczenie i możliwe konsekwencje</Placeholder>.</p>
            </Section>

            <Section number={11} id="dzieci" title="Dzieci i osoby małoletnie">
              <p><Placeholder>ustal minimalny wiek użytkownika, zasady korzystania z usługi przez osoby małoletnie oraz — gdy jest potrzebna — sposób uzyskania i weryfikacji zgody rodzica lub opiekuna</Placeholder>. Informacje te muszą odpowiadać regulaminowi i faktycznemu sposobowi działania serwisu.</p>
            </Section>

            <Section number={12} id="cookies" title="Cookies i pamięć przeglądarki">
              <p>Frontend Meowly zapisuje w pamięci przeglądarki informacje konieczne do działania wybranych funkcji: ustawienie motywu, dane sesji lub konta i token uwierzytelniający, a także decyzję o niepokazywaniu ponownie komunikatu na stronie głównej. Te mechanizmy wspierają logowanie, bezpieczeństwo, zapamiętanie ustawień i ciągłość działania.</p>
              <p><Placeholder>zweryfikuj pełną listę cookies, localStorage, sessionStorage, okresy ważności i podmioty ustawiające wpisy</Placeholder>. Ustawienia przeglądarki mogą pozwalać zarządzać cookies, ale nie muszą usuwać danych w localStorage — te można wyczyścić w ustawieniach danych witryny.</p>
              <p>Jeżeli zostaną dodane niekonieczne narzędzia analityczne lub marketingowe, nie powinny być uruchamiane przed uzyskaniem wymaganej zgody. Wtedy należy wdrożyć osobną konfigurację zarządzania zgodami i umożliwić równie łatwe wycofanie zgody. <Placeholder>narzędzia, cele, dostawcy i konfiguracja bannera zgód — jeśli dotyczy</Placeholder>.</p>
            </Section>

            <Section number={13} id="bezpieczenstwo" title="Bezpieczeństwo">
              <p>Stosujemy środki techniczne i organizacyjne odpowiednie do ryzyka, aby chronić dane przed nieuprawnionym dostępem, zmianą, utratą lub ujawnieniem. Żaden system nie daje jednak całkowitej gwarancji bezpieczeństwa. Podejrzenie incydentu możesz zgłosić na: <Placeholder>adres kontaktowy ds. bezpieczeństwa lub prywatności</Placeholder>.</p>
            </Section>

            <Section number={14} id="integracje" title="Linki zewnętrzne i integracje">
              <p>Serwis może prowadzić do zewnętrznych stron lub korzystać z integracji, np. map. Ich dostawcy mogą przetwarzać dane na własnych zasadach, opisanych w swoich politykach prywatności. <Placeholder>lista integracji i dostawców, ich rola oraz linki do właściwych polityk</Placeholder>.</p>
            </Section>

            <Section number={15} id="zmiany" title="Zmiany polityki">
              <p>Polityka może być aktualizowana, gdy zmieni się sposób działania Meowly, prawo lub wykorzystywani dostawcy. Wersja: <Placeholder>numer wersji</Placeholder>. O istotnych zmianach poinformujemy przez <Placeholder>sposób powiadomienia, np. komunikat w serwisie lub e-mail</Placeholder>. Data wejścia w życie: <Placeholder>DD.MM.RRRR</Placeholder>.</p>
            </Section>

            <aside className="mt-5 rounded-2xl border border-light-border/45 bg-light-overlay/55 p-6 sm:p-8 dark:border-border/45 dark:bg-overlay/65" aria-labelledby="publication-checklist">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#c15a15] dark:text-[#d56b24]">Przed uruchomieniem</p>
              <h2 id="publication-checklist" className="mt-2 text-2xl font-black tracking-[-0.035em]">Lista przed publikacją</h2>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-light-subtext sm:grid-cols-2 dark:text-subtext">
                {[
                  "Administrator i kontakt do IOD",
                  "Lista procesorów i umowy DPA",
                  "Inwentaryzacja danych i logów backendu",
                  "Podstawy prawne, cele i testy interesu",
                  "Harmonogram retencji i kopie zapasowe",
                  "Transfery poza EOG i zabezpieczenia",
                  "Cookies, analityka i banner zgód",
                  "Zasady dla osób małoletnich",
                  "Adres obsługi wniosków o prawa",
                  "Numer wersji i data obowiązywania",
                ].map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#c15a15] dark:bg-[#d56b24]" />{item}</li>)}
              </ul>
            </aside>
          </article>
        </div>
      </main>

      <footer className="border-t border-light-border/30 dark:border-border/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-light-subtext sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10 dark:text-subtext">
          <Link to="/" className="w-fit rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-border dark:focus-visible:outline-border" aria-label="Meowly — strona główna"><img src="/logo-marketing.png" alt="Meowly" className="h-8 w-auto object-contain" /></Link>
          <span className="font-bold">Polityka prywatności</span>
        </div>
      </footer>
    </div>
  );
}
