**Testing**

[[_TOC_]]

# Hvordan vi gjennomfører testing

I skrivende stund (06.04.2020) har vi ingen automatiserte tester utover den ene rendertesten som genereres automatisk ved create-react-app (denne ligger under frontend/src/test). Teamet har gjort en vurdering om at vi ikke har ressurser til å gjennomføre automatisert testing. Vi gjennomfører derimot grundig manuell testing, og gjennomfører code reviews ved merge requests. Ved en ny merge request må både utvikler og reviewer teste både ny og gammel funksjonalitet, og sjekke at alt fungerer som forventet. Ettersom applikasjonen blir mer kompleks vil dette ta mer tid, og teamet ønsker derfor å starte bruk av automatisert testing snarest mulig.

# Hvordan kjøre tester

## Frontend

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: `cd frontend`
   - (2.5. Dersom du ikke allerde har gjort det, skriv i terminalen: `npm install`)
3. Skriv i terminalen: `npm test`

## Backend

(For Mac OS X, erstatt python med python3)

1. Åpne rooten av repoet i terminalen/cmd
2. Skriv i terminalen: cd backend
    - (2.5. Dersom du ikke allerde har gjort det, aktiver pipenv shell og installer pakkene som beskrevet i [README](README.md). Da må man cd backend igjen etter installasjon.)
3. Skriv i terminalen: python manage.py test

# Testdekning

- Prosjektet inneholder en enkelt test som sjekker om App componenten renderes. Denne testen er generert automatisk av create-react-app og finnes under /frontend/src/tests/
- All funksjonalitet knyttet til fullførte brukerhistorier(GitLab Issues) er manuelt testet
- Alle rest-api kall som er nevnt i [backend-readme'en](backend/README.md) er manuelt testet med [Postman](https://www.postman.com/)
