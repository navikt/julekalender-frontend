import { BodyLong, Button, Chat, Heading, Modal } from "@navikt/ds-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import BoardSquare from "../components/boardSquare";
import DeleteData from "../components/deleteData";
import Intro from "../components/intro";
import Snowflakes from "../components/snowflakes";
import { useLocalStorage } from "../components/useLocalStorage";

const offset = (num: number, i: number) =>
  parseInt(num.toString().charAt(i % num.toString().length));

const scramble = (st: string, sa: number, d: number = 1) =>
  st
    .split("")
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) + offset(sa, i) * d))
    .join("");

const unscramble = (str: string, salt: number) => scramble(str, salt, -1);

const squares = [
  {
    name: "Ta trappa opp til takterrassen og trekk litt frisk luft",
    description: "Fantastisk utsikt og frisk pust!",
  },
  {
    name: "Gå av kollektivtransport et stopp for tidlig",
    description: "Alle monner drar!",
  },
  {
    name: "10 000 skritt på en dag",
    description:
      "Tilsvarer omtrent 8 kilometer, eller ca. 1 time og 40 minutter",
  },
  {
    name: "Øve på å stå på hendene eller hodet",
    description:
      "Målet er å klare det innen 24. desember. Du har fullført aktiviteten om du har øvd litt.",
  },
  { name: "5 kilometer til fots", description: "Heia heia!" },
  {
    name: "Gå en tur med en kollega",
    description: "Frisk luft er godt for både kropp og sinn!",
  },
  {
    name: "Gå eller løp antallet km som datoen i dag",
    description:
      "Dersom du gjør dette 1. desember trenger du kun å gå eller løpe en kilometer, men dersom du gjør dette 8. desember er distansen 8 kilometer. God tur! PS: Dette er en av to identiske oppgaver.",
  },

  { name: "Dans sammen med noen", description: "Ta deg en svingom!" },
  {
    name: "Besøk en etasje i FYA1 du ikke har vært i før",
    description: "Har du vært i alle?  Velg den som er lengst unna deg nå!",
  },
  {
    name: "Gå eller løp antallet km som datoen i dag",
    description:
      "Dersom du gjør dette 1. desember trenger du kun å gå eller løpe en kilometer, men dersom du gjør dette 8. desember er distansen 8 kilometer. God tur! PS: Dette er en av to identiske oppgaver.",
  },
  {
    name: "Gå en morgentur",
    description: "Ta deg en tur før lunsj!",
  },
  { name: "Heis-fri dag", description: "Spar strøm og bli venn med trappa!" },

  {
    name: "Gå tur mens du hører en episode av IT Simpelthen",
    description: (
      <p>
        Du kan høre på den siste episoden, eller en valgfri episode!{" "}
        <a href="https://share.transistor.fm/e/it-simpelthen/playlist/dark">
          Her finner du en oversikt over episodene til IT Simpelthen.
        </a>
      </p>
    ),
  },

  {
    name: "Ta et utendørsbad",
    description: "Hopp i havet! Eller ferskvannet!",
  },
  {
    name: "Bli med løpegruppa på tur, mandag",
    description: (
      <p>
        Vi møtes i resepsjonen i 1. etasje i Fyrstikkalleen 1,{" "}
        <b>mandag 5. desember klokken 16:30</b>, for alle nivåer! Bli med i{" "}
        <a href="https://nav-it.slack.com/archives/C02L82FACMN">#fa1-løping</a>{" "}
        på Slack hvis du vil!
      </p>
    ),
  },
  {
    name: "Rolig yoga, tirsdag",
    description: (
      <p>
        Skjer i Smeltedigelen i FYA1 på <b>tirsdag 6. desember, 16:30–⁠17:30</b>
        . Alle har en gratis prøvetime. Husk komfortable klær du kan bevege deg
        fritt i og varm genser og sokker til avspenningen. Gi gjerne beskjed om
        at du kommer til ${unscramble("udm5ixo{ndurAqd}/qr", 1337)}
      </p>
    ),
  },
  {
    name: "Morgenbuldring med klatregruppa, onsdag",
    description: (
      <Chat avatar="K" name="Klatregruppa" timestamp="07.12.2022 07:00">
        <Chat.Bubble className="font-bold">
          Oppmøte 07:00, onsdag 7. desember
        </Chat.Bubble>
        <Chat.Bubble>
          Adresse: Brynsveien 3, Klatreverket Bryn (Buldreverket)
        </Chat.Bubble>
        <Chat.Bubble>Pris: 100 kr</Chat.Bubble>
        <Chat.Bubble>Mulighet for å leie sko</Chat.Bubble>
        <Chat.Bubble>Plass til alle, både n00b og pr0</Chat.Bubble>
        <Chat.Bubble>Kaffe :)</Chat.Bubble>
      </Chat>
    ),
  },
  {
    name: "Go-morgon med feittforbrenningsgaranti og auka kondisjon, torsdag",
    description: (
      <div className="flex flex-col gap-2">
        <p>Frode Lein tek oss med på intervalltrening!</p>
        <p>
          Oppmøte ved hovudinngangen til FYA1 ferdig påkledd klar for trening
          ute, <b>torsdag 8. desember, 07:00–08:00</b>. Vi starter med femten
          minutt roleg oppvarming og deretter intervall der vi samlast i
          pausane.
        </p>
        <p>
          Eksempel på ei intervalløkt er å springe ti gonger 60 sekund raskt med
          30 sekund kvile mellom kvart &ldquo;drag&rdquo; for deretter å ha ein 4 minutts
          pause for så å gjenta det heile ein gong til. Du skal klarer å halda
          farta oppe på alle drag inkluderte det siste.
        </p>
      </div>
    ),
  },

  {
    name: "Mensendieck, torsdag",
    description: (
      <p>
        Skjer i Smeltedigelen i FYA1 på <b>torsdag 8. desember, 16:30–⁠17:30</b>
        . Alle har en gratis prøvetime. Husk treningstøy og sko til innebruk. Gi
        gjerne beskjed om at du kommer til $
        {unscramble("uru|oq1kpqyplCqhw1qv", 1337)}
      </p>
    ),
  },
];

export default function Home() {
  const [boardState, setBoardState] = useState<string[]>([]);
  const [committedState, setCommittedState] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [openSquare, setOpenSquare] = useState(squares.map((_) => false));
  const [save, load] = useLocalStorage();

  const boards = ["board-1"];
  const introState = "intros";
  const currentBoard = boards.slice(-1)[0];

  useEffect(() => {
    Modal.setAppElement("#__next");
    const board = load(currentBoard);
    const parsed: string[] = board ? JSON.parse(board) : [];
    setCommittedState(parsed);
    setBoardState(parsed);
  }, []);

  useEffect(() => {
    setScore(committedState.length);
  }, [committedState]);

  const commitState = (newState: string[]) => {
    save(currentBoard, JSON.stringify(newState));
    setCommittedState(newState);
  };

  const performActivity = (square: string) => {
    const newState = [...boardState, square];
    setBoardState(newState); // add square to board
    commitState(newState);
  };

  return (
    <div>
      <Head>
        <title>Juleaktivitetskalender!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/julekule-tilted.png" />
      </Head>
      <Snowflakes flakes={10} />
      <div className="min-h-screen flex items-center justify-center">
        <Intro currentBoard={currentBoard} />
        <div className="flex flex-col max-w-2xl gap-4 pb-48 p-4">
          <h1 className="text-3xl">
            Aktivitetskalender (1. desember - 8. desember)
          </h1>
          <div className="p-2 border-l-2 border-nav-red flex flex-col gap-2">
            <p>
              Julen nærmer seg med stormskritt, og mange kjenner kanskje
              skuldrene nærme seg ørene. Da kan det være fint med noen
              aktiviteter som kan løsne litt på både kropp og sinn.
            </p>
            <p>
              I aktivitetsjulekalender finner du aktiviteter som kan få deg
              gjennom julestria med masse energi og påfyll. Det spiller ingen
              rolle om du er sofasliter, supermosjonist eller sånn passe
              energisk, det er noe for alle her.
            </p>
            <Heading size="medium" level="2">
              Slik blir du med i trekningen
            </Heading>
            <p>
              For å delta i trekningene må du{" "}
              <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=NGU2YsMeYkmIaZtVNSedC7UZM7Z2a_tDhAO6kE2Ce0dUOTExT1Y3MTA1VFpTMlNPOElHVlpMWjNJSS4u">
                fylle ut dette skjemaet
              </a>{" "}
              i løpet av torsdag 8. desember. Vinnerne trekkes fredags morgen og
              blir kontaktet direkte.
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-2 py-4 p-2 max-w-xl">
            {squares.map(({ name, description }, index) => (
              <div key={`square-${index}`}>
                <Modal
                  open={openSquare[index]}
                  key={`modal-${index}`}
                  aria-label={`Informasjon om ${name}`}
                  className="text-text max-w-[32rem] pr-10 pb-12 md:pb-0"
                  onClose={() => setOpenSquare(openSquare.map(() => false))}
                  aria-labelledby={`modal-heading-${index}`}
                >
                  <Modal.Content>
                    <Heading
                      spacing
                      level="1"
                      size="large"
                      id={`modal-heading-${index}`}
                    >
                      {name}
                    </Heading>
                    <BodyLong spacing>{description}</BodyLong>
                    <Button
                      onClick={() => {
                        performActivity(index.toString());
                        setOpenSquare(openSquare.map(() => false));
                      }}
                    >
                      Fullfør aktivitet
                    </Button>
                  </Modal.Content>
                </Modal>
                <BoardSquare
                  key={index}
                  value={name}
                  index={index}
                  committed={committedState.includes(index.toString())}
                  completed={boardState.includes(index.toString())}
                  onClick={() =>
                    setOpenSquare(openSquare.map((_, i) => index == i))
                  }
                />
              </div>
            ))}
          </div>
          <div className="text-xl">Utførte oppgaver: {score}</div>
          <DeleteData
            items={[...boards, introState]}
            className="place-self-end"
          />
        </div>
      </div>
    </div>
  );
}
