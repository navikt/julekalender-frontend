import { Heading } from "@navikt/ds-react"
import { useEffect, useState } from "react"

const useCountdown = (targetDate: Date) => {
    const countdownDate = targetDate.getTime()
    const [countdown, setCountdown] = useState(
        countdownDate - new Date().getTime()
    )
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(countdownDate - new Date().getTime())
        }, 1000)
        return () => clearInterval(interval)
    }, [countdownDate])
    return getReturnValues(countdown);
}

const getReturnValues = (countdown: number) => {
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000)
  
    return [days, hours, minutes, seconds]
}

const Countdown = ({targetDate}: {targetDate: Date}) => {
    const countdown = useCountdown(targetDate)
    return <div className="flex flex-col gap-8 h-screen items-center justify-center">
        <Heading level="1" size="large" className="flex flex-col md:flex-row gap-2">
            <span>{countdown[0]} {countdown[0] == 1 ? 'dag,' : 'dager, '}</span>
            <span>{countdown[1]} {countdown[1] == 1 ? 'time,' : 'timer, '}</span> 
            <span>{countdown[2]} {countdown[2] == 1 ? 'minutt og' : 'minutter og '}</span>
            <span>{countdown[3]} {countdown[3] == 1 ? 'sekund' : 'sekunder'} til luka åpnes!</span>
        </Heading>
        <div className="px-8 w-full md:max-w-2xl grid gap-2">
            <p>Julen nærmer seg med stormskritt, og vi kan selvfølgelig ikke gå inn i desember uten vår helt egen julekalender. Vi vet at de neste ukene blir travle for mange. Julegaver skal handles, julebord skal gjennomføres og utallige sammenkomster planlegges. Derfor har vi satt sammen en fullspekket julekalender med aktiviteter som skal få deg gjennom julestria med masse energi og påfyll.</p>
            <p>Uansett om du er supermosjonist eller sofasliter, så har vi tenkt på deg. I kalenderen finner du aktiviteter som er tilpasset de aller fleste, uansett hvilket nivå du måtte befinne deg på.</p>
            <p>Første luke åpner <span className="font-bold hover:glowy transition-all">torsdag 1. desember</span>!</p>
        </div>
    </div>
}

export default Countdown