import { Alert, Button, Heading } from "@navikt/ds-react"
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

    const [boardState, setBoardState] = useState<string[]>([])
    const [committedState, setCommittedState] = useState<string[]>([])
    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        const board = load("board-1")
        const parsed: string[] = board ? JSON.parse(board) : []
        setCommittedState(parsed)
        setBoardState(parsed)
    }, [])

    useEffect(() => {
        setScore(committedState.length)
    }, [committedState])


    const commitState = () => {
        save("board-1", JSON.stringify(boardState))
        setCommittedState(boardState)
    }

    const handleChange = (square: string) => {
        !boardState.includes(square)
            ? setBoardState([...boardState, square]) // add square to board
            : setBoardState(boardState.filter(item => item != square)) // remove square :)
    }

    return (<div className="flex flex-col max-w-2xl gap-4 pb-48 p-4">
        <h1 className="text-3xl">Aktivitetskalender (1. desember - 8. desember)</h1>
        <p className="text-text-muted p-2 border-l-2">
            Det er flere oppgaver her enn det er dager i perioden, det er ikke meningen at du skal gjøre alle (men du kan hvis du vil!).
            På torsdag 8. desember oppfordrer vi deg til å sende inn svar i Forms-skjemaet vårt (link her) for å kunne bli med i trekning av noe godt. :)
        </p>
        <div className="flex flex-row flex-wrap gap-2 py-4 p-2 max-w-xl">
            {squares.map((square, index) => 
                <BoardSquare 
                    key={index}
                    value={square}
                    index={index}
                    committed={committedState.includes(index.toString())}
                    completed={boardState.includes(index.toString())}
                    onClick={handleChange} 
                />
            )}
        
    </div>
    <div className="text-xl">
        Utførte oppgaver: {score}
    </div>
    { committedState.length != squares.length &&
    <Button onClick={commitState} 
        className="bg-green-800 hover:bg-green-900 transition-all duration-300 opacity-90 h-24 text-xl self-auto fixed bottom-0 left-0 w-full">
            lagre
    </Button>
    }
    </div>)
}
