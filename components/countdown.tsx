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
        <Heading level="1" size="large">
            {countdown[0]} {countdown[0] == 1 ? 'dag, ' : 'dager, '}
            {countdown[1]} {countdown[1] == 1 ? 'time, ' : 'timer, '} 
            {countdown[2]} {countdown[2] == 1 ? 'minutt og ' : 'minutter og '} 
            {countdown[3]} {countdown[3] == 1 ? 'sekund' : 'sekunder'} til luka åpnes!
        </Heading>
        <div className="px-8 w-full md:max-w-2xl grid gap-2">
            <Heading level="2" size="medium">Hva er dette?</Heading>
            <p>For å få dagene til å gå litt fortere har vi satt sammen en julekalender med små aktiviteter du kan fylle dagen med. Enten du er supermosjonist eller foretrekker mindre krevende aktiviteter, så vil du finne noe som passer for deg.</p>
            <p>Hver fredag legger vi ut oppgaver du kan gjennomføre påfølgende uke. Det er både oppgaver med veldig lav terskel for gjennomføring og noen litt mer utfordrende. Du velger selv hvilke og hvor mange oppgaver du gjør. For å delta i trekningen av fine premier må du gjøre minst 7 aktiviteter før neste trekning. Vi trekker tre vinnere hver fredag!</p>
            <p><span className="font-bold hover:glowy transition-all">Torsdag 1. desember</span> åpnes første luke!</p>
        </div>
    </div>
}

export default Countdown