# Telepítési és indítási útmutató

Telepítés:
install.bat elindítása
Ez a script telepít minden szükséges modult.
_____________________________
Elindítás:
A start.bat elindítása után a http://localhost:5173/ címen lehet elérni az oldalt

User fiók:

email: user@email.com
jelszó: test

__________________________

Az admin felülethez az URL:
http://localhost:5173/secret/adminlogin

Admin fiók:

email: admin@email.com
jelszó: admin01

### Backend

A backend API-hoz az elérés:
localhost:3000

A backend API-hoz a leírás: localhost:3000/apidoc 

Minden egyes komponens elején ott van az API_URL konstans, úgyhogy ha változás lenne a backend elérésnél, akkor mindegyiket át kellene írni.

### Térkép:
A helymeghatározáshoz a react leaflet open source apiját használtam

### Biztonsági funkciók:
- Brute force elleni védelem throttler-el
- Bearer token autentikáció
- Clickjacking védelem, helmet frameguard-dal
- Web crawlers elleni védelem: /public/robots.txt
- Az admin belépés másik elérésen van, mint a sima user belépés 

### Meg nem valósult funkciók:
- Jelszó visszaállítás
- Token lejárati idejének beállítása (jelenleg nincs lejárati ideje a tokennek)
- Email-es autentikáció
- Email-es értesítés
- Mikor a felhasználó törli az időpontját akkor, nem kerül vissza a szabad időpontok közé az időpont
- Az admin nem tudja módosítani az árakat
