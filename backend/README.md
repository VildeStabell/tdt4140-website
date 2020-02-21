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


## Hvordan gjøre http requests
Forsikre deg om at databasen er oppdatert med å kjøre `python manage.py migrate`
## Med postman:
-Last ned postman fra https://www.postman.com/downloads/
#### Opprette en bruker
- Skriv inn URL http://localhost:8000/marketplace/users/create
- Velg "POST"
- I "Headers" velg key = Content-Type og Value = application/json
- I "Body" skriv 
```json
{ 
      "user" : {
		"username": "brukernavn",
                "email": "you@mail.yahoo",
		"password": "passord",
		"first_name": "Fornavn",
		"last_name": "Etternavn"
		}
}
```

Dersom alt gikk som det skal, får du 
````json
{
    "response": "success",
    "message": "user created succesfully"
}
````
Og en http melding `200 OK`

#### Få tak i JWT - Token
- Skriv inn URL http://localhost:8000/token-auth/
- Velg "POST"
- I "Headers" velg key = Content-Type og Value = application/json
- I "Body" skriv 
```json
{
	"username": "brukernavn",
	"password": "passord"
}
```
Dersom alt gikk som det skal, får du en token og informasjon om brukeren

```json
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Impvc3RlaWh0IiwiZXhwIjoxNTgyMTA5OTU5LCJlbWFpbCI6IiJ9.J6uuTxUnDPfMDSd-xW2AYAdImzC9OXV0_5IWogSzXco",
    "user": {
        "id": 3,
        "username": "josteiht",
        "email": "your@mail.no",
        "is_superuser": false,
        "first_name": "Jostein",
        "last_name": "Tysse"
    }
}
```
## I nettleseren:
#### Opprette en bruker
- Gå til http://127.0.0.1:8000/marketplace/users/create
- Velg Media type `aplication/json`
- Skriv inn i content:
```json
{ 
      "user" : {
		"username": "brukernavn",
                "email": "din@mail.no",
		"password": "passord",
		"first_name": "Fornavn",
		"last_name": "Etternavn"
		}
}
```
- Trykk POST

#### Få tak i JWT - Token
- Gå til http://127.0.0.1:8000/token-auth/
- Skriv inn brukernavn og passord
- Trykk POST


