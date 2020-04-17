**SellYoShit (Gruppe 23 - TDT4140)**

[[_TOC_]]

# Installasjon

Etter å ha lest denne seksjonen skal det være mulig for en utenforstående å laste ned og kjøre prosjektet på kort tid.

## Avhengigheter

Følgende avhengigheter må installers for å kjøre prosjektet lokalt:

- [Node.js](https://nodejs.org/en/) (med npm)
- [Python 3.8](https://www.python.org/)
- [pipenv](https://pipenv.pypa.io/en/latest/) (Kan installeres fra terminalen med `pip3 install pipenv`)


## Hvordan kjøre prosjektet lokalt

Det aller første som må gjøres er å clone repoet fra git.
- Kan gjøres med `git clone https://gitlab.stud.idi.ntnu.no/tdt4140-2020/23.git` i terminalen.

For at applikasjonen skal kjøre i sin helhet, må frontend og backend kjøre i hver sin terminal.

### Backend:
(For Mac OS X, erstatt `python` med `python3`)

1. Åpne rooten av repoet i terminalen/cmd
2. Kjør kommandoen `pipenv shell`. Denne kommandoen oppretter et virtuelt utviklingsmiljø, der vi kan installere nødvenige tillegspakker til python.
3. Kjør kommandoen `pipenv install`. Denne kommandoen installerer nødvengdige pakker som er spesifisert i [pipfile](pipfile) og [pipfile.lock](pipfile.lock)
4. Gå til backend-mappen ved å kjøre `cd backend` i terminalen.
5. Kjør `python manage.py migrate`. Denne kommandoen lager databasen med modellene spesifisert i [migrations](backend/marketplace/migrations/)
6. Kjør `python manage.py loaddata demodata.json`. Denne kommandoen laster inn annonser og brukere som er definert i filen [demodata.json](backend/demodata.json). Dette inkluderer blant annet en admin-bruker som kan brukes til testing av admin-spesifikke funksjoner under utvikling. For å logge inn, bruk email: `admin@mail.no`, passord: `admin`
7. Start serveren ved å kjøre `python manage.py runserver` 

Serveren stoppes med `ctr+c` i terminalen.

(Etter å ha gjort alle disse stegene én gang, trenger man bare punkt 1, 2, 4 og 7 for å starte backend-serveren igjen.)
### Frontend:

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `cd frontend`
3. Skriv i terminalen: `npm install`
4. Skriv i terminalen: `npm start`


Serveren stoppes med `ctr+c` i terminalen.



# Testing

Automatisert testing i dette prosjektet er for øyeblikket mangelfull, en dypere forklaring på hvordan vi gjennomfører testing og hvorfor vi har valgt å gjøre det slik finnes [her](docs/TESTING.md).

## Hvordan kjøre tester

### Frontend

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `cd frontend`
   - (2.5. Dersom du ikke allerde har gjort det, skriv i terminalen: `npm install`)
3. Skriv i terminalen: `npm test`

### Backend
(For Mac OS X, erstatt `python` med `python3`)

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `cd backend`
   - (2.5. Dersom du ikke allerde har gjort det, aktiver `pipenv shell` og installer pakkene som beskrevet tidligere. Da må man `cd backend` igjen.)
3. Skriv i terminalen: `python manage.py test`

## Testdekning

- Prosjektet inneholder en enkelt test som sjekker om App componenten renderes. Denne testen er generert automatisk av create-react-app og finnes under /frontend/src/tests/
- All funksjonalitet knyttet til fullførte brukerhistorier(GitLab Issues) er manuelt testet
- Alle rest-api kall som er nevnt i [backend_instructions](backend/Backend_instructions.md) er manuelt testet med [Postman](https://www.postman.com/)

# Annen dokumentasjon

- [Hvordan vi gjennomfører testing](docs/TESTING.md)
- [Bidra til prosjektet](docs/CONTRIBUTING.md)
- [Lisens](LICENSE.md)
- [Utviklingsrutiner](docs/DEVELOPMENT.md)
