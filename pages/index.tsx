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
    name: "Øve på å stå på hendene eller hodet",
    description:
      "Målet er å klare det innen 24. desember. Du har fullført aktiviteten om du har øvd litt.",
  },
  {
    name: "Gå eller løp antallet km som datoen i dag",
    description:
      "Dersom du gjør dette 1. desember trenger du kun å gå eller løpe en kilometer, men dersom du gjør dette 8. desember er distansen 8 kilometer. God tur!",
  },
  { name: "Heis-fri dag", description: "Spar strøm og bli venn med trappa!" },
  {
    name: "10 000 skritt på en dag",
    description: "Tilsvarer omtrent 8 kilometer, eller ca. 1 time og 40 minutter",
  },
  {
    name: "Gjør planken så lenge du klarer",
    description: "Målet er å kunne gjøre det enda lengre neste uke!",
  },
  { name: "10 kilometer til fots", description: "Heia heia!" },  
  {
    name: "10 burpies eller spensthopp",
    description: ""
  },
  {
    name: "Gå eller løp ei rute du aldri har gjort før",
    description: "God tur!"
  },
  {
    name: "Ta et utendørsbad",
    description: "Hopp i havet! Eller ferskvannet!",
  },
  {
    name: "Gå eller løp sammen med en kollega",
    description: "Frisk luft er godt for både kropp og sinn!",
  },

  {
    name: "Bli med på morgenmeditasjon, mandag",
    description: (
      <p>
        Vi møtes i B110 Svovelstikken i Fyrstikkaleen 1, <b>mandag 12. desember klokken 08:45</b>. Varighet: 5 minutter!
      </p>
    )
  },
  {
    name: "Bli med løpegruppa på tur, mandag",
    description: (
      <p>
        Vi møtes i resepsjonen i 1. etasje i Fyrstikkalleen 1,{" "}
        <b>mandag 12. desember klokken 16:30</b>, for alle nivåer! Bli med i{" "}
        <a href="https://nav-it.slack.com/archives/C02L82FACMN">#fa1-løping</a>{" "}
        på Slack hvis du vil!
      </p>
    ),
  },
  {
    name: "Rolig yoga, tirsdag",
    description: (
      <p>
        Skjer i Smeltedigelen i FYA1 på <b>tirsdag 13. desember, 16:30–⁠17:30</b>
        . Alle har en gratis prøvetime. Husk komfortable klær du kan bevege deg
        fritt i og varm genser og sokker til avspenningen. Gi gjerne beskjed om
        at du kommer til {unscramble("udm5ixo{ndurAqd}/qr", 1337)}
      </p>
    ),
  },
  {
    name: "Go-morgon med fettforbrenningsgaranti, torsdag",
    description: (
      <div className="flex flex-col gap-2">
        <p>Frode Lein tek oss med på intervalltrening!</p>
        <p>
          Oppmøte ved hovudinngangen til Fyrstikkalleen 1 ferdig påkledd klar for løpetrening ute, <b>torsdag 15. desember, 07:00–08:00</b>. 
          Vi starter med femten minutt roleg oppvarming og deretter intervall der vi samlast i pausane.
        </p>
        <p>
          Intervalløkt den 15. desember vil vere:
        </p>
        <ul className="list-disc pl-4">
          <li>Oppvarming (15 minutt)</li>
          <li>Springe raskt 2 gonger 4 minutt med 120 sekund kvile mellom kvart &ldquo;drag&rdquo;</li>
          <li>Springe raskt 2 gonger 3 minutt med 90 sekund kvile mellom kvart &ldquo;drag&rdquo;</li>
          <li>Springe raskt 2 gonger 2 minutt med 60 sekund kvile mellom kvart &ldquo;drag&rdquo;</li>
          <li>Springe raskt 4 gonger 1 minutt med 30 sekund kvile mellom kvart &ldquo;drag&rdquo;</li>
          <li>Nedvarming (15 minutt)</li>
        </ul>
        <p>Ikkje start for hardt. Du skal klare å halda farta oppe på alle drag inkludert det siste. Dette er ein effektiv treningsform som aukar både uthald og kaloriforbruk. I tillegg forbrenn du meir feitt og reduserer risikoen for mange kroniske sjukdommar.</p>
      </div>
    )
  },
  {
    name: "Mensendieck, torsdag",
    description: (
      <p>
        Skjer i Smeltedigelen i FYA1 på <b>torsdag 15. desember, 16:30–⁠17:30</b>
        . Alle har en gratis prøvetime. Husk treningstøy og sko til innebruk. Gi
        gjerne beskjed om at du kommer til {unscramble("uru|oq1kpqyplCqhw1qv", 1337)}
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

  const boards = ["board-1", "board-2"];
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
            Aktivitetskalender (9. desember - 15. desember)
          </h1>
          <div className="p-2 border-l-2 border-nav-red flex flex-col gap-2">
            <p>
              Julen nærmer seg med stormskritt, og mange kjenner kanskje
              skuldrene nærme seg ørene. Da kan det være fint med noen
              aktiviteter som kan løsne litt på både kropp og sinn.
            </p>
            <p>
              I aktivitetsjulekalenderen finner du aktiviteter som kan få deg
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
              i løpet av torsdag 15. desember. Vinnerne trekkes fredags morgen og
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
