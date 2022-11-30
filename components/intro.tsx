import { Heading, Modal } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const Intro = ({ currentBoard }: { currentBoard: string }) => {
  const [introStates, setIntroStates] = useState({ [currentBoard]: true });
  const [save, load] = useLocalStorage();

  useEffect(() => {
    Modal.setAppElement("#__next");
    const introStates = load("intros");
    const parsedStates =
      introStates?.length !== undefined && introStates?.length > 0
        ? JSON.parse(introStates)
        : { "board-1": false };
    setIntroStates(parsedStates);
  }, []);

  const seeIntro = () => {
    var newIntroState = Object.assign({}, introStates);
    newIntroState[currentBoard] = true;
    setIntroStates(newIntroState);
    save("intros", JSON.stringify(newIntroState));
  };

  return (
    <Modal
      open={!introStates[currentBoard]}
      aria-label="Intro til aktivitetskalenderen"
      onClose={seeIntro}
      className="text-text max-w-[32rem] pr-10 pb-12 md:pb-0"
    >
      <Modal.Content className="flex flex-col gap-2">
        <Heading size="large" level="1">
          Velkommen til første luke!
        </Heading>
        <p>
          Uansett om du er supermosjonist eller sofasliter, så har vi tenkt på
          deg. I kalenderen finner du aktiviteter som er tilpasset de aller
          fleste, uansett hvilket nivå du måtte befinne deg på.
        </p>
        <Heading size="medium" level="2">
          Så hvordan funker det?
        </Heading>
        <p>
          Hver fredag legger vi ut oppgaver du kan gjennomføre og markere i
          kalenderen den påfølgende uken. Du velger selv hvilke og hvor mange
          aktiviteter du gjennomfører, men for å være med i trekningen av fine
          premier må du gjennomføre minst 7 aktiviteter før neste trekning. Vi
          trekker 3 vinnere hver fredag, og første luke åpnes selvsagt torsdag
          1. desember.
        </p>
        <Heading size="medium" level="2">
          Slik holder du oversikt over dine fullførte aktiviteter
        </Heading>
        <p>
          Trykk på aktiviteten du er interessert i og deretter velg "Fullfør
          aktivitet". Fullførte aktiviteter er markerte som grå, og du kan se
          hvor mange du har fullført på bunnen av siden. Inne i hver aktivitet
          vises det ofte mer informasjon som kan være nyttig, og du kan lese de
          uten å fullføre aktiviteten. Aktivitetskalenderen er selvfølgelig 100%
          tillitsbasert.
        </p>
        <p>
          OBS! Vi anbefaler at du bruker enten mobil eller PC til å logge
          aktivitet, da det du legger inn er knyttet til enheten du bruker. Har
          du for eksempel brukt mobilen, vil det ikke komme opp dersom du går
          inn via PC neste gang.
        </p>
        <Heading size="medium" level="2">
          Slik blir du med i trekningen
        </Heading>
        <p>
          For å delta i trekningene må du{" "}
          <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=NGU2YsMeYkmIaZtVNSedC7UZM7Z2a_tDhAO6kE2Ce0dUOTExT1Y3MTA1VFpTMlNPOElHVlpMWjNJSS4u">
            fylle ut dette skjemaet
          </a>{" "}
          i løpet av torsdag. Vinnerne trekkes fredags morgen og blir kontaktet
          direkte.
        </p>
      </Modal.Content>
    </Modal>
  );
};

export default Intro;
