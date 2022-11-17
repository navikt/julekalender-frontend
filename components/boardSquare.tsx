import { Button } from "@navikt/ds-react"

const BoardSquare = ({value, index, onClick, completed, committed}: {value: string, index: number, completed: boolean, committed: boolean, onClick: (value: string) => void}) => {
    return <Button
            className={`rounded-md p-4 text-lg border disabled:opacity-50 ${(completed || committed) && "bg-red-600 text-white"}`}
            value={index.toString()}
            disabled={committed}
            onClick={() => onClick(index.toString())}>
            {value}
        </Button>
}

export default BoardSquare