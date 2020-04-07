**SellYoShit (Gruppe 23 - TDT4140)**

[[_TOC_]]

# Installasjon

Etter å ha lest denne seksjonen skal det være mulig for en utenforstående å laste ned og kjøre prosjektet på kort tid.

## Avhengigheter

Følgende avhengigheter må installers for å kjøre prosjektet lokalt:

- [Node.js](https://nodejs.org/en/) (med npm)
- [Python 3.8](https://www.python.org/)
- [pipenv](https://pipenv.pypa.io/en/latest/) (Kan installeres fra terminalen med `pip install pipenv`)


## Hvordan kjøre prosjektet lokalt

Det aller første som må gjøres er å clone repoet fra git.

### Frontend:

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `cd frontend`
3. Skriv i terminalen: `npm install`
4. Skriv i terminalen `npm start`

### Backend:

1. Åpne rooten av repoet i terminalen/cmd
2. Kjør kommandoen `pipenv shell`. Denne kommandoen oppretter et virtuelt utviklingsmiljø, der vi kan installere nødvenige tillegspakker til python.
3. Kjør kommandoen `pipenv install`. Denne kommandoen installerer nødvengdige pakker som er spesifisert i [pipfile](pipfile) og [pipfile.lock](pipfile.lock)
4. Gå til backend-mappen ved å skrive `cd backend`
5. Kjør `python manage.py makemigretions`
6. Kjør `python manage.py migrate`
7. Start serveren ved å kjøre `python manage.py runserver` 


# Testing

Automatisert testing i dette prosjektet er for øyeblikket mangelfull, en dypere forklaring på hvordan vi gjennomfører testing og hvorfor vi har valgt å gjøre det slik finnes [her](docs/TESTING.md).

## Hvordan kjøre tester

### Frontend

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `cd frontend`
   - (2.5. Dersom du ikke allerde har gjort det, skriv i terminalen: `npm install`)
3. Skriv i terminalen: `npm test`

### Backend

TODO: Skrive hvordan man kjører backend tester.

## Testdekning

- Prosjektet inneholder en enkelt test som sjekker om App componenten renderes. Denne testen er generert automatisk av create-react-app og finnes under /frontend/src/tests/
- All funksjonalitet knyttet til fullførte brukerhistorier(GitLab Issues) er manuelt testet
- Alle rest-api kall som er nevnt i [backend-readme'en](backend/README.md) er manuelt testet med [Postman](https://www.postman.com/)

# Annen dokumentasjon

- [Hvordan vi gjennomfører testing](docs/TESTING.md)
- [Bidra til prosjektet](docs/CONTRIBUTING.md)
- [Lisens](LICENSE.md)
- [Utviklingsrutiner](docs/DEVELOPMENT.md)
