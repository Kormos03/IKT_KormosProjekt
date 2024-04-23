# Telepítési és indítási útmutató

Telepítés:
1. A fálj kezelőben `SHIFT + jobb klikk` a mappán belül, majd rá kell kattintani az `Powershell megnyitása itt` opcióra
2. Be kell másolni: `git clone https://github.com/Kormos03/IKT_KormosProjekt.git`
3. Az IKT_KormosProjekt mappán belül, `install.bat` elindítása
Ez a script telepít minden szükséges modult.

__________________________

### Használati útmutató
Először is a start.bat fájlt kell elindítani, hogy elinduljon a backend és a frontend is. A backend a 3000-es porton, a frontend pedig a 5173-as porton fog futni. A frontend elindítása után a http://localhost:5173/ címen lehet elérni az oldalt.
- Mikor az oldal betöltődik, akkor a főoldalon lehetőség van a bejelenkezésre, regisztrációra.
- Az oldal tetején található a navigációssáv, ahol a főoldal, a galéria, az árak, foglalás, a kapcsolat és a profil találhtó, ami egy lenyíló ablak, ahol lehetőség van választani a bejelentkezésre és a regisztrációra.
- A főoldalon található egy rövid leírás az oldalról, és a lefoglalt időpontról, bejelentkezés után.
- A galériában találhatóak a képek, amiket a felhasználók megtekinthetnek. Az admin tud képeket hozzáadni és törölni.
- Az árak menüpontban találhatóak az árak, amelyekre az egér fölé helyezve megjelenik egy gomb, amire kattintva lehetőség van a foglalásra.
- A foglalás menüpontban lehetőség van a foglalásra, ahol a felhasználó kiválaszthatja az időpontot és a szolgáltatást, amit szeretne igénybe venni.
- A kapcsolat menüpontban található az admin telefonszáma és email címe, ahol a felhasználók felvehetik a kapcsolatot az adminnal. A szalon helyzetét is meg lehet nézni a térképen, amely szintén ezen az oldalon található.
. A profil fülre kattintva, ha a felhasználó be van jelentkezve, választhat a kijelentkezés és a profil szerkesztése között. A profil szerkesztése menüpontban a felhasználó megváltoztathatja a nevét.
- A profil fülre kattintva, ha a felhasználó nincs be jelentkezve, választhat a bejelentkezés és a regisztráció között.

Az admin felülethez az URL:
http://localhost:5173/secret/adminlogin

__________________________

User fiók:
email: user@email.com
jelszó: test


Admin fiók:
email: admin@email.com
jelszó: admin01


__________________________

### Backend

A backend API-hoz az elérés:
localhost:3000

A backend API-hoz a leírás: localhost:3000/apidoc 

Minden egyes komponens elején ott van az API_URL konstans, úgyhogy ha változás lenne a backend elérésnél, akkor mindegyiket át kellene írni.

__________________________

### Biztonsági funkciók:
- Brute force elleni védelem throttler-el
- Bearer token autentikáció
- Clickjacking védelem, helmet frameguard-dal
- Web crawlers elleni védelem: /public/robots.txt
- Az admin belépés másik elérésen van, mint a sima user belépés 

__________________________

### Meg nem valósult funkciók:
- Jelszó visszaállítás
- Token lejárati idejének beállítása (jelenleg nincs lejárati ideje a tokennek)
- Email-es autentikáció
- Email-es értesítés
- Mikor a felhasználó törli az időpontját akkor, nem kerül vissza a szabad időpontok közé az időpont
- Az admin nem tudja módosítani az árakat

A .env fáljt alapesetben nem szabad feltölteni, viszont most az egyszerűség kedvéért fel lett rakva.
