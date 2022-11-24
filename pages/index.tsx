import { BodyLong, Button, Chat, Heading, Modal } from "@navikt/ds-react"
import Head from "next/head"
import { useEffect, useState } from "react"
import BoardSquare from "../components/boardSquare"
import Countdown from "../components/countdown"
import DeleteData from "../components/deleteData"
import Intro from "../components/intro"
import Snowflakes from "../components/snowflakes"
import { useLocalStorage } from "../components/useLocalStorage"


const offset = (num: number, i: number) =>
  parseInt(num.toString().charAt(i % num.toString().length));

const scramble = (st: string, sa: number, d: number = 1) =>
  st
    .split("")
    .map((c, i) => String.fromCharCode(c.charCodeAt(0) + offset(sa, i) * d))
    .join("");

const unscramble = (str: string, salt: number) => scramble(str, salt, -1);

const squares = [
    { name: "Gå 10 000 skritt på en dag", description: "" },
    { name: "Gå eller løp 5 km", description: "" },
    { name: "Gå en tur med en kollega", description: "" },
    { name: "Gå eller løp antallet km som datoen i dag", description: "Dersom du gjør dette 1. desember trenger du kun å gå eller løpe en kilometer, men dersom du gjør dette 8. desember er distansen 8 kilometer." },
    { name: "Heis-fri dag", description: "" },
    { name: "Bli med løpegruppa på tur, mandag", description: "Vi møtes i resepsjonen i 1. etasje i Fyrstikkalleen 1 mandag 5. desember klokken 16:30, for alle nivåer!" },
    { name: "Øve på å stå på hendene eller hodet", description: "Øv på å stå på hendene eller hodet! Målet er å klare det innen 24. desember. Du har fullført aktiviteten om du har øvd litt." },
    { name: "Gå av kollektivtransport et stopp for tidlig", description: "Dersom du benytter buss, t-bane eller trikk må du gå av et stopp for tidlig og gå resten for å fullføre denne aktiviteten." },
    { name: "10 burpies / spensthopp", description: "" },
    { name: "Dans sammen med noen", description: "" },
    { name: "Besøk en etasje i FYA1 du ikke har vært i før", description: "" },
    { name: "Ta trappa opp til takterrassen og trekk litt frisk luft", description: "" },
    { name: "Kortstokk-økt (en øvelse per farge, spill deg gjennom kortstokken - eller deler av den)", description: "" },
    { name: "Ta et utendørsbad", description: "" },
    {
        name: "Morgenbuldring med klatregruppa, onsdag", description: <Chat avatar="K" name="Klatregruppa" timestamp="07.12.2022 07:00">
            <Chat.Bubble>Oppmøte 07:00, onsdag 7. desember</Chat.Bubble>
            <Chat.Bubble>Adresse: Brynsveien 3, Klatreverket Bryn (Buldreverket)</Chat.Bubble>
            <Chat.Bubble>Pris: 100 kr</Chat.Bubble>
            <Chat.Bubble>Mulighet for å leie sko</Chat.Bubble>
            <Chat.Bubble>Plass til alle, både n00b og pr0</Chat.Bubble>
            <Chat.Bubble>Kaffe :)</Chat.Bubble>
        </Chat>
    },
    {
        name: "Mensendieck, torsdag", description: `Skjer i Smeltedigelen i FYA1, alle har en gratis prøvetime. Husk treningstøy og sko til innebruk. Gi gjerne beskjed om at du kommer til ${unscramble("uru|oq1kpqyplCqhw1qv", 1337)}`,
    }
]


export default function Home() {

    const [boardState, setBoardState] = useState<string[]>([])
    const [committedState, setCommittedState] = useState<string[]>([])
    const [score, setScore] = useState<number>(0)
    const [openSquare, setOpenSquare] = useState(squares.map(_ => false))
    const [save, load] = useLocalStorage()
    
    const boards = ["board-1"]
    const introState = "intros"
    const currentBoard = boards.slice(-1)[0]


    useEffect(() => {
        Modal.setAppElement("#__next");
        const board = load(currentBoard)
        const parsed: string[] = board ? JSON.parse(board) : []
        setCommittedState(parsed)
        setBoardState(parsed)
    }, [])

    useEffect(() => {
        setScore(committedState.length)
    }, [committedState])


    const commitState = (newState: string[]) => {
        save(currentBoard, JSON.stringify(newState))
        setCommittedState(newState)
    }

    const performActivity = (square: string) => {
        const newState = [...boardState, square]
        setBoardState(newState) // add square to board
        commitState(newState)
    }

    const targetDate = new Date("2022-12-01")

    return (<div>
        <Head>
            <title>Juleaktivitetskalender!</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="shortcut icon" href="/julekule-tilted.png" />
        </Head>
        <Snowflakes flakes={10} />
        {targetDate >= new Date()
            ? <Countdown targetDate={new Date("2022-12-01")} />
            : <div className="min-h-screen flex items-center justify-center">
                <Intro currentBoard={currentBoard} />
                <div className="flex flex-col max-w-2xl gap-4 pb-48 p-4">

                    <h1 className="text-3xl">Aktivitetskalender (1. desember - 8. desember)</h1>
                    <p className="p-2 border-l-2 border-nav-red">
                        Lorem ipsum
                    </p>
                    <div className="flex flex-row flex-wrap gap-2 py-4 p-2 max-w-xl">
                        {squares.map(({ name, description }, index) =>
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
                                        <Heading spacing level="1" size="large" id={`modal-heading-${index}`}>{name}</Heading>
                                        <BodyLong spacing>
                                            {description}
                                        </BodyLong>
                                        <Button onClick={() => {
                                            performActivity(index.toString())
                                            setOpenSquare(openSquare.map(() => false))
                                        }}>Fullfør aktivitet</Button>
                                    </Modal.Content>
                                </Modal>
                                <BoardSquare
                                    key={index}
                                    value={name}
                                    index={index}
                                    committed={committedState.includes(index.toString())}
                                    completed={boardState.includes(index.toString())}
                                    onClick={() => setOpenSquare(openSquare.map((_, i) => index == i))}
                                />
                            </div>)}

                    </div>
                    <div className="text-xl">
                        Utførte oppgaver: {score}
                    </div>
                    <DeleteData items={[...boards, introState]} className="place-self-end" />
                </div>
            </div>}
    </div>)
}
