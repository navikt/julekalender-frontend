import { Alert, BodyLong, Button, Heading, Modal } from "@navikt/ds-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import BoardSquare from "../components/boardSquare"

const squares = [
    "oppgave en",
    "oppgave to",
    "oppgave tre",
    "oppgave fire",
    "oppgave fem",
    "oppgave seks",
    "oppgave syv",
    "oppgave åtte",
    "oppgave ni",
    "oppgave ti (en oppgave med spesielt lang tekst, det kan se rart ut men kanskje ikke?)",
    "oppgave elleve",
    "oppgave tolv",
    "oppgave tretten",
    "oppgave fjorten",
    "oppgave femten",
    "oppgave seksten"
]

const load = (key: string): string | null => {
    if(typeof window !== 'undefined'){
         return window.localStorage.getItem(key)
    }
    return null
}

const save = (key: string, value: string) => {
    if(typeof window !== 'undefined'){
         return window.localStorage.setItem(key,value)
    }
}
    

export default function Home() {
    const router = useRouter()

    const [boardState, setBoardState] = useState<string[]>([])
    const [committedState, setCommittedState] = useState<string[]>([])
    const [score, setScore] = useState<number>(0)
    const [openSquare, setOpenSquare] = useState(squares.map(_ => false))
    const [requestDeletion, setRequestDeletion] = useState(false)

    useEffect(() => {
        Modal.setAppElement("#__next");
        const board = load("board-1")
        const parsed: string[] = board ? JSON.parse(board) : []
        setCommittedState(parsed)
        setBoardState(parsed)
    }, [])

    useEffect(() => {
        setScore(committedState.length)
    }, [committedState])

    const deleteData = () => {
        window.localStorage.removeItem("board-1")
        router.reload()
    }

    const commitState = (newState: string[]) => {
        save("board-1", JSON.stringify(newState))
        setCommittedState(newState)
    }

    const performActivity = (square: string) => {
        const newState = [...boardState, square]
        setBoardState(newState) // add square to board
        commitState(newState)
    }

    return (<div className="flex flex-col max-w-2xl gap-4 pb-48 p-4">
        <Modal
          open={requestDeletion}
          aria-label="Slett data"
          className="text-text"
          onClose={() => setRequestDeletion((x) => !x)}
          aria-labelledby="modal-heading"
        >
          <Modal.Content>
            <Heading spacing level="1" size="large" id="modal-heading">
              Slette data
            </Heading>
            <Heading spacing level="2" size="medium">
              Er du sikker på at du vil slette data?
            </Heading>
            <BodyLong spacing>
                Dataen finnes ikke utenfor enheten din. Sletting av data fører kun til at alle oppgaver markeres som ikke fullført.
            </BodyLong>
            <div className="flex gap-2">
                <Button onClick={() => setRequestDeletion((x) => !x)}>Nei, glem det</Button>
                <Button onClick={deleteData}>Ja, slett dataen min</Button>
            </div>
          </Modal.Content>
        </Modal>
        <h1 className="text-3xl">Aktivitetskalender (1. desember - 8. desember)</h1>
        <p className="text-text-muted p-2 border-l-2">
            Det er flere oppgaver her enn det er dager i perioden, det er ikke meningen at du skal gjøre alle (men du kan hvis du vil!).
            På torsdag 8. desember oppfordrer vi deg til å sende inn svar i Forms-skjemaet vårt (link her) for å kunne bli med i trekning av noe godt. :)
        </p>
        <div className="flex flex-row flex-wrap gap-2 py-4 p-2 max-w-xl">
            {squares.map((square, index) => 
                <div>
                    <Modal
                        open={openSquare[index]}
                        key={`modal-${index}`}
                        aria-label={`Informasjon om ${square}`}
                        className="text-text"
                        onClose={() => setOpenSquare(openSquare.map(() => false))}
                        aria-labelledby={`modal-heading-${index}`}
                    >
                        <Modal.Content>
                            <Heading spacing level="1" size="large" id={`modal-heading-${index}`}>{square}</Heading>
                            <Heading spacing level="2" size="medium">Informasjon om aktiviteten</Heading>
                            <BodyLong spacing>
                                hallo! dette er info om {square}
                            </BodyLong>
                            <Button onClick={() => {
                                performActivity(index.toString())
                                setOpenSquare(openSquare.map(() => false))
                            }}>Fullfør aktivitet</Button>
                        </Modal.Content>


                    </Modal>
                    <BoardSquare 
                        key={index}
                        value={square}
                        index={index}
                        committed={committedState.includes(index.toString())}
                        completed={boardState.includes(index.toString())}
                        onClick={() => setOpenSquare(openSquare.map((_, i) => index == i))} 
                    />
                </div>
            )}
        
    </div>
    <div className="text-xl">
        Utførte oppgaver: {score}
    </div>
    <div>
        <Button onClick={() => setRequestDeletion(true)}>
            Slett data
        </Button>
    </div>
    </div>)
}
