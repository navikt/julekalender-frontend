import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react"
import { useRouter } from "next/router"
import { useState } from "react"

const DeleteData = ({ items, className }:  {items: string[], className?: string | undefined}) => {
    const router = useRouter()
    const [requestDeletion, setRequestDeletion] = useState(false)

    const deleteData = () => {
        items.forEach((item) => window.localStorage.removeItem(item))
        router.reload()
    }

    return <div className={className}>
        <Modal
            open={requestDeletion}
            aria-label="Slett data"
            className="text-text w-full md:w-96"
            onClose={() => setRequestDeletion(false)}
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
                    <Button onClick={() => setRequestDeletion(false)}>Nei, glem det</Button>
                    <Button onClick={deleteData}>Ja, slett dataen min</Button>
                </div>
            </Modal.Content>
        </Modal>
        <a href="#" onClick={() => setRequestDeletion(true)}>
            Jeg vil slette dataen min
        </a>
    </div>

}

export default DeleteData