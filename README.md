Ide jön majd a telepítési és a 
Majd Át kell cserálnem a PriceListComp-ba a képeket

# Telepítési útmutató
- Az git clone paranccsal klónozzuk le a repót
- A backend mappában az .env.example fájlt átnevezzük .env-re és át kell állítani az adatbázis nevét, jelszavát és a portot
- A frontend mappában az .env.example fájlt átnevezzük .env-re és át kell állítani a backend url-jét

A backend API-hoz a leírás: localhost:3000/apidoc 

Térkép:
A helymeghatározáshoz a react leaflet open source apiját használtam

Biztonsági funkciók:
- Brute force elleni védelem throttler-el
- Bearer token autentikáció
- Clickjacking védelem, helmet frameguard-dal
- Web crawlers elleni védelem: /public/robots.txt

Meg nem valósult funkciók:
- Jelszó visszaállítás
- Token lejárati idejének beállítása (jelenleg nincs lejárati ideje a tokennek)
- Email-es autentikáció
- Email-es értesítés
- Mikor a felhasználó törli az időpontját akkor, nem kerül vissza a szabad időpontok közé az időpont
- Az admin nem tudja módosítani az árakat