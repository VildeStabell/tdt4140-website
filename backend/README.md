# Backend

## Setup:
I terminalen:
- Kjør `pip install pipenv`
- Kjør `pipenv shell`
- Kjør `pipenv install` 
- cd til "backend"
- Kjør `python manage.py migrate` (oppdaterer databasen)

## Kjøre server
I terminalen:
- cd til "backend"
- Kjør `python manage.py runsever`


##Problem med server/migrations:
- Slett migrations-mappen i marketplace og slett databasefilen db.sqlite3
- Kjør `python manage.py makemigrations` og `python manage.py migrate`

## Hvordan gjøre http requests
Forsikre deg om at databasen er oppdatert med å kjøre `python manage.py migrate`
## Med postman:
-Last ned postman fra https://www.postman.com/downloads/
#### Opprette en bruker
- Skriv inn URL http://localhost:8000/auth/users/
- Velg "POST"
- I "Headers" velg key = Content-Type og Value = application/json
- I "Body" skriv 
```json
{ 

    "username": "bruker",
    "phone": "12345678",
    "first_name": "F_navn",
    "last_name": "E_navn",
    "email": "din@mail.no",
    "password": "passord123",
    "re_password": "passord123"

}
```

Dersom alt gikk som det skal, får du 
````json
{
    "username": "bruker",
    "phone": "12345678",
    "first_name": "F_navn",
    "last_name": "E_navn",
    "email": "din@mail.no",
    "id": 1,
    "is_blocked": false
}
````
Og en http melding `201 Created`

#### Logge inn / lage en token
- Skriv inn URL http://localhost:8000/auth/jwt/create

- Velg "POST"
- I "Headers" velg key = Content-Type og Value = application/json
- I "Body" skriv 
```json
{
	"email": "din@email.no",
	"password": "passord"
}
```
- Dersom alt gikk som det skal, får du en refresh og en access token.

```json
{
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU4MjY2NzEwMywianRpIjoiMDMxZDI0MjAyMDg1NGFmYTgyOGRhYTRiYTIzMWY3Y2IiLCJ1c2VyX2lkIjoxfQ.gMaUzhQ8mmHLQ5jt1MnB0jovyl77macgbU83u15w7ms",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgyNTgxMDAzLCJqdGkiOiJiZjI2NjhhMWRkZTM0NDFkYjcyNDEzNDBkNjJjMTMwNiIsInVzZXJfaWQiOjF9.FAL2ZQEBXaafAyFVAJn_BRp4z2EhZ7ZIybtiHTMW-XU"
}
```
- Access token varer en kort periode, og kan oppdateres ved å sende en post request til http://localhost:8000/auth/jwt/refresh

- I "Headers" velg key = Content-Type og Value = application/json
- I "Body" skriv 
```json
{
	 "refresh" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU4MjY2NzEwMywianRpIjoiMDMxZDI0MjAyMDg1NGFmYTgyOGRhYTRiYTIzMWY3Y2IiLCJ1c2VyX2lkIjoxfQ.gMaUzhQ8mmHLQ5jt1MnB0jovyl77macgbU83u15w7ms"
}
```
- Da skal du få tilbake en ny access token
```json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgyNTgxMTg5LCJqdGkiOiIzNDQ3ZWE1ZWNiY2U0OTE3ODE4ZjJjZWRkMTI5YjkyMiIsInVzZXJfaWQiOjF9.L3gEVnsLX05spHt8VX954ue4_669rg8ERleTkn9RKHM"
}
```

### Request som krever token-autentisering:
- De neste requestene krever at du har en gyldig token i header. Dette kan gjøres slik:
- I authorization-parameter, velg "bearer token", og lim inn en gyldig token

#### Få tak i / endre på innlogget bruker:
- Velg url http://localhost:8000/auth/users/me/
- Send GET request for å få tak i info om bruker, skal få tilbake dette:
```json
{
    "username": "josteiht",
    "phone": "9874565",
    "first_name": "Jostein",
    "last_name": "Tysse",
    "id": 1,
    "email": "jostein@mail.no",
    "is_staff": true,
    "is_blocked": false
}
```
- For å endre på info, velg PUT-request, og skriv inn endringene du vil gjøre på samme måte som når man lager en bruker. Alle felt trenger ikke deklareres, kun username og email.

#### Endre en annen bruker\*:
-  \*krever admin (is_staff) tilgang 
- Velg url http://localhost:8000/api/marketplace/profile/x/  , der x = id-nummer på user.
- Følg samme fremgangsmåte som i seksjonen over.

#### Få tak i en liste av alle brukere (som admin\*):
- Velg url http://localhost:8000/auth/users/
- Send en GET request 
- \*Om du ikke er admin får du bare info om din egen bruker.

### Admin actions:
- Vi har en egen url for å redigere brukere som admin: http://localhost:8000/api/marketplace/admin/
#### Blokkere bruker:
- For å blokkere en bruker sender du en PUT reguest til http://localhost:8000/api/marketplace/admin/x/ der x er id til brukeren du vil blokkere
- Skriv inn dette og send requesten
```json
{
    "username" : "*brukernavn*",
    "is_blocked" : "true"
}
```
- Vet ikke hvorfor, men username må være med.

#### Gjøre bruker til admin:
- Send følgende PUT request til http://localhost:8000/api/marketplace/admin/x/ der x er id til brukeren du vil gjøre til admin

```json
{
  "username" : "*brukernavn*",
  "is_admin" : "true"
}
```
- Du kan også endre på alle de andre feltene til brukeren når du har admin-tilgang (ikke ID). Her er alle feltene en bruker har:
```json
{
    "username": "brukernavn",
    "phone": "12345567",
    "first_name": "F_navn",
    "last_name": "E_navn",
    "email": "example@mail.no",
    "id": 2,
    "is_staff": false,
    "is_blocked": false,
    "password": "passord",
    "re_password": "passord en gang til"
}
```
## I nettleseren:

- Det meste er selvforklarende når man har kommet inn på sidene.
- Om du ikke har, lag en superuser med `python manage.py createsuperuser`
- Logg inn på http://127.0.0.1:8000/admin/
- Nå har vi tilgang til å se detaljer om APIen
- http://localhost:8000/auth/users/ - Se alle brukere og lage nye brukere
- http://localhost:8000/auth/users/me/ - Se info om innlogget bruker, og endre på brukernavn/phone/navn
- http://localhost:8000/auth/jwt/create - Lage tokens, "logg inn" med email + passord
- http://127.0.0.1:8000/auth/jwt/refresh - Refreshe access-token, lim inn en gyldig refresh token
- http://127.0.0.1:8000/api/marketplace/profile/x/ - Se bruker nr X, endre på brukernavn/phone/navn
 


## Lage annonse
Headers: 'content-type': 'mulitpart/form-data'
URL: http://127.0.0.1:8000/api/marketplace/saleItems/

fields:
- title
- creator  //id
- price
- description
- img     //legg til image, image.name. Kan være null

Se nederst på:
https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833

evt. uten img:
```json
{
    "title": "123"
    "creator": 1
    "price": 100
    "description": "456"
    "img": null
}
```

## Finne annonser
URL: http://127.0.0.1:8000/api/marketplace/saleItems/

eksempel på et entry:
```json
{
    "id": 1,
    "title": "Test",
    "creator": 1,
    "price": 50000,
    "description": "Dette er en test",
    "creation_date": "2020-02-26",
    "img": "http://127.0.0.1:8000/media/images/Prosjekt_ER1.png"
}
```
