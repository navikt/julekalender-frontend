import { Button } from "@navikt/ds-react"
import { useEffect, useState } from "react"
import BoardSquare from "../components/boardSquare"

// get these from the backend?
const squares = [
    "noe gøy",
    "noe litt vanskelig",
    "dra på kontoret",
    "ta et artig bilde",
    "drikk vann",
    "hør på julemusikk",
    "spis en klementin",
    "noe umulig",
    "før i minwintid at du starter, når du starter (umulig)",
    "noe vanskelig",
    "noe koselig",
    "ta bilde av noe kult ute",
    "stå på hendene",
    "dra til sunnmøre",
    "spill et (brett/video)spill",
    "rydd skrivebordet hjemme :)",
    "dans en dans",
    "gå 1000 skritt hver 3. time",
    "vaske golvet",
    "bære ved",
    "sett opp fugglebånd",
    "pynt tre",
    "sett deg ned og hvil",
    "rugge vogna",
]

export default function Home() {

    const [disabled, setDisabled] = useState(false)
    const [boardState, setBoardState] = useState<string[]>([])
    const [committedState, setCommittedState] = useState<string[]>([])

    useEffect(() => {
        // fetch committed state from backend
        // setCommittedState(remoteBoardState)
        setBoardState(committedState) // put committed state into our "hot" state for easier comparisons later
    }, [])


    const commitState = () => {
        // post state to backend
        setCommittedState(boardState) // we might as well just set committed state the same as the bingo state
    }

    const handleChange = (square: string) => {
        !boardState.includes(square)
            ? setBoardState([...boardState, square]) // add square to board
            : setBoardState(boardState.filter(item => item != square)) // remove square :)
    }

    return (<div className="flex flex-col max-w-2xl gap-4 pb-48">
        <div className="flex flex-row flex-wrap gap-2 px-2 max-w-xl">
            {squares.map((square, index) => 
                <BoardSquare 
                    key={index}
                    value={square}
                    index={index}
                    disabled={disabled}
                    committed={committedState.includes(index.toString())}
                    completed={boardState.includes(index.toString())}
                    onClick={handleChange} 
                />
            )}
        
    </div>
    <Button onClick={commitState} 
        className="bg-green-800 hover:bg-green-900 transition-all duration-300 opacity-90 h-24 text-xl self-auto fixed bottom-0 left-0 w-full">
            lagre
    </Button>
    </div>)
}
