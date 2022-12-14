import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import BoardSquare from "../components/boardSquare";
import DeleteData from "../components/deleteData";
import Intro from "../components/intro";
import Snowflakes from "../components/snowflakes";
import { useLocalStorage } from "../components/useLocalStorage";


const squares = [
  {
    name: "Gå eller løp ei rute du aldri har gjort før",
    description: "God tur!"
  },
  {
    name: "Gå en skitur",
    description: "Nå har det kommet snø (i Oslo, enn så lenge)!"
  },
  {
    name: "Øve på å stå på hendene eller hodet",
    description:
      "Nå er du i mål!",
  },
  {
    name: "Gå eller løp sammen med en kollega",
    description: "Frisk luft er godt for både kropp og sinn!",
  },
  { name: "Heis-fri dag", description: "Spar strøm og bli venn med trappa!" },
  { name: "15 kilometer til fots", description: "Heia heia!" },
  {
    name: "Gjør planken lengre enn forrige uke",
    description: "Dette klarer du!",
  },
  {
    name: "10 burpies eller spensthopp",
    description: "Du velger hvilken du vil gjøre selv!"
  },
  {
    name: "10 000 skritt på en dag",
    description: "Tilsvarer omtrent 8 kilometer, eller ca. 1 time og 40 minutter",
  },
  {
    name: "Ta et utendørsbad",
    description: "Hopp i havet! Eller ferskvannet!",
  },
  {
    name: "Terning-økt",
    description: <div className="flex flex-col gap-2">
      <p>Bruk én terning.</p>
      <p>Kast først for å finne ut hvilken øvelse du skal gjøre</p>
      <ul className="pl-4">
        <li>Terningkast 1: pushups</li>
        <li>Terningkast 2: situps</li>
        <li>Terningkast 3: knebøy</li>
        <li>Terningkast 4: spensthopp</li>
        <li>Terningkast 5: rygghev</li>
        <li>Terningkast 6: dips</li>
      </ul>
      <p>Så kast for å finne ut hvor mange repetisjoner du skal gjøre!</p>
      <ul className="pl-4">
        <li>Terningkast 1: 3 reps</li>
        <li>Terningkast 2: 6 reps</li>
        <li>Terningkast 3: 9 reps</li>
        <li>Terningkast 4: 12 reps</li>
        <li>Terningkast 5: 15 reps</li>
        <li>Terningkast 6: 18 reps</li>
      </ul>
      <p>Gjenta dette 5 ganger, eller så mange ganger du klarer!</p>
    </div>
  },
  {
    name: "Gå eller løp antallet km som datoen i dag",
    description:
      "Dersom du gjør dette 16. desember trenger du altså å gå eller løpe 16 kilometer for å kunne fullføre denne aktiviteten. God tur!",
    cancelled: false,
  },
  {
    name: "Bli med løpegruppa på tur, mandag",
    description: (
      <p>
        Vi møtes i resepsjonen i 1. etasje i Fyrstikkalleen 1,{" "}
        <b>mandag 19. desember klokken 16:30</b>, for alle nivåer! Bli med i{" "}
        <a href="https://nav-it.slack.com/archives/C02L82FACMN">#fa1-løping</a>{" "}
        på Slack hvis du vil!
      </p>
    ),
  },
  {
    name: "Trening med staver, fredag",
    description: <div className="flex flex-col gap-2">
      <p>Frode Lein tek oss med på hufsing, løping og gange med staver!</p>
      <p>
        Oppmøte ved hovudinngangen til Fyrstikkalleen 1 ferdig påkledd klar for løpetrening ute, <b>fredag 16. desember, kl 08:00</b>. 
      </p>
      <p>
        Ved bruk av stavene blir pulsen høgare, og kaloriforbrenninga øker fordi musklane i armane aktiveres og brukes til å skyve kroppen framover.
      </p>
      <p>
        Staver bør vere ca. 40 cm kortare enn kroppslengden din. Ta gjerne barnas skistaver. Frode tar med nokre ekstra sett med staver for testing.
      </p>
    </div>
  },
];

export default function Home() {
  const [boardState, setBoardState] = useState<string[]>([]);
  const [committedState, setCommittedState] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [openSquare, setOpenSquare] = useState(squares.map((_) => false));
  const [save, load] = useLocalStorage();

  const boards = ["board-1", "board-2", "board-3"];
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
            Aktivitetskalender (16. desember - 22. desember)
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
              i løpet av torsdag 22. desember. Vinnerne trekkes fredags morgen og
              blir kontaktet direkte. Så fort du har klart 7 aktiviteter kan du fylle ut skjemaet!
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-2 py-4 p-2 max-w-xl">
            {squares.map(({ name, description, cancelled }, index) => (
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
                    {!(cancelled !== undefined && cancelled) &&
                    <Button
                      onClick={() => {
                        performActivity(index.toString());
                        setOpenSquare(openSquare.map(() => false));
                      }}
                    >
                      Fullfør aktivitet
                    </Button>
                    }
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
