**WIP - Hvordan bidra til prosjektet**

Denne siden er et forslag til hvordan en CONTRIBUTING dokumentasjon kan se ut. TDT4140 - Gruppe 23 ser det ikke nødvendig å fullføre denne dokumentasjonen, og etterlater dette til utviklingsteamet som tar over produktet etter oss, ettersom de har indikert at de ønsker at repoet skal følge en open-source prosjektmodell, og vi ikke kjenner til hvordan de ønsker at bidragsprosessen skal gjennomføres. Utviklingsteamet som tar over oppfordres til å gjøre de endringene de ser nødvendig.

[[_TOC_]]

# Introduksjon

TODO: Skrive en introduksjon med en generell oversikt over hva seg som må gjennomføres for å kunne bidra til prosjektet.

1. Klone repoet
2. Installasjon
3. Osv...

# Klone repoet

Repoet kan klones direkte i visual studio code, eller ved å skrive `git clone https://gitlab.stud.idi.ntnu.no/tdt4140-2020/23/` i terminalen/cmd, dette krever at du har git installert.

# Installasjon

Vi anbefaler at du installer både frontend og backend for å bidra til prosjektet.

## Avhengigheter

Følgende avhengigheter må installers for å kjøre prosjektet lokalt:

- [Node.js](https://nodejs.org/en/) (med npm)
- [Python](https://www.python.org/)
- [pipenv](https://pipenv.pypa.io/en/latest/)

## Hvordan kjøre prosjektet lokalt

### Frontend:

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `cd frontend`
3. Skriv i terminalen: `npm install`
4. Skriv i terminalen `npm start`

### Backend:

(For Mac OS X, erstatt `python` med `python3`)

1. Åpne rooten av repoet i terminalen/cmd
2. Kjør kommandoen `pipenv shell`. Denne kommandoen oppretter et virtuelt utviklingsmiljø, der vi kan installere nødvenige tillegspakker til python.
3. Kjør kommandoen `pipenv install`. Denne kommandoen installerer nødvengdige pakker som er spesifisert i [pipfile](pipfile) og [pipfile.lock](pipfile.lock)
4. Gå til backend-mappen ved å kjøre `cd backend` i terminalen.
5. Kjør `python manage.py migrate`. Denne kommandoen lager databasen med modellene spesifisert i [migrations](backend/marketplace/migrations/)
6. Kjør `python manage.py loaddata demodata.json`. Denne kommandoen laster inn annonser og brukere som er definert i filen [demodata.json](backend/demodata.json).
7. Start serveren ved å kjøre `python manage.py runserver` 

(Etter å ha gjort alle disse stegene én gang, trenger man bare punkt 1, 2, 4 og 7 for å starte backend-serveren igjen.)

# Osv...
