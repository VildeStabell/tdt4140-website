**SellYoShit - Gruppe 23**

[[_TOC_]]

# Installasjon

Etter å ha lest denne seksjonen skal det være mulig for en utenforstående å laste ned og kjøre prosjektet på kort tid.

## Avhengigheter

Følgende avhengigheter må installers for å kjøre prosjektet lokalt:

- [Node.js](https://nodejs.org/en/) (med npm)
- [Python](https://www.python.org/)
- [pipenv](https://pipenv.pypa.io/en/latest/)

## Hvordan kjøre prosjektet lokalt

Det aller første som må gjøres er å clone repoet fra git.

### Frontend:

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `npm install`
3. Skriv i terminalen `npm start`

### Backend:

TODO: Skrive backend fremgangsmåte

# Testing

## Hvordan vi gjennomfører testing

I skrivende stund (02.04.2020) har vi ingen automatiserte tester. Teamet har gjort en vurdering om at vi ikke har ressurser til dette. Vi gjennomfører derimot grundig manuell testing, og gjennomfører code reviews ved merge requests. Ved en ny merge request må både utvikler og reviewer teste både ny og gammel funksjonalitet, og sjekke at alt fungerer som forventet. Ettersom applikasjonen blir mer kompleks vil dette ta mer tid, og teamet ønsker derfor å starte bruk av automatisert testing snarest mulig.

## Testdekning

- All funksjonalitet knyttet til fullførte brukerhistorier(GitLab Issues) er manuelt testet
- Alle rest-api kall som er nevnt i backend-readmen er grundig testet manuelt med postman

# Annen dokumentasjon

- [Bidra til prosjektet](docs/CONTRIBUTING.md)
- [Lisens](LICENSE.md)
- [Utviklingsrutiner](docs/DEVELOPMENT.md)
