import { Heading, Modal } from "@navikt/ds-react"
import { useEffect, useState } from "react"
import { useLocalStorage } from "./useLocalStorage"

const Intro = ({currentBoard}: {currentBoard: string}) => {
    const [introStates, setIntroStates] = useState({[currentBoard]: true})
    const [save, load] = useLocalStorage()

    useEffect(() => {
        Modal.setAppElement("#__next");
        const introStates = load("intros")
        const parsedStates = introStates?.length !== undefined && introStates?.length > 0 ? JSON.parse(introStates) : {"board-1": false}
        setIntroStates(parsedStates)
    }, [])


    const seeIntro = () => {
        var newIntroState = Object.assign({}, introStates)
        newIntroState[currentBoard] = true
        setIntroStates(newIntroState)
        save("intros", JSON.stringify(newIntroState))
    }


    return <Modal
        open={!introStates[currentBoard]}
        aria-label="Intro til aktivitetskalenderen"
        onClose={seeIntro}
        className="text-text pr-8"
    >
         <Modal.Content>
            <Heading size="large" level="1">Velkommen til første luke!</Heading>
            Lorem ipsum og sånne greier
         </Modal.Content>

    </Modal>
}

export default Intro