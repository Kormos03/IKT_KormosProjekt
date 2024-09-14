
# Telepítési és indítási útmutató
A fő mappában ezzel parancssal lehet elindítani a fullstack webappot
```sh
npm run start
```
Ezen a címen tudjuk elérni a weboldalt

```sh
http://localhost:3000/
```
__________________________

# Használati útmutató

1. **Főoldal:**
    - Mikor az oldal betöltődik, a főoldalon lehetőség van a bejelentkezésre és a regisztrációra.
    - A főoldalon található egy rövid leírás az oldalról, és a lefoglalt időpontról, bejelentkezés után.

2. **Navigációssáv:**
    - Az oldal tetején található a navigációssáv, ahol a következő menüpontok érhetők el:
        - Főoldal
        - Galéria
        - Árak
        - Foglalás
        - Kapcsolat
        - Profil (lenyíló ablak, ahol lehetőség van választani a bejelentkezésre és a regisztrációra)

3. **Galéria:**
    - A galériában találhatók a képek, amiket a felhasználók megtekinthetnek.
    - Az admin képeket tud hozzáadni és törölni.

4. **Árak:**
    - Az árak menüpontban találhatók az árak.
    - Az egér fölé helyezve megjelenik egy gomb, amire kattintva lehetőség van a foglalásra.

5. **Foglalás:**
    - A foglalás menüpontban lehetőség van a foglalásra.
    - A felhasználó kiválaszthatja az időpontot és a szolgáltatást, amit szeretne igénybe venni.

6. **Kapcsolat:**
    - A kapcsolat menüpontban található az admin telefonszáma és email címe.
    - A felhasználók felvehetik a kapcsolatot az adminnal.
    - A szalon helyzetét is meg lehet nézni a térképen, amely szintén ezen az oldalon található.

7. **Profil:**
    - Ha a felhasználó be van jelentkezve:
        - Választhat a kijelentkezés és a profil szerkesztése között.
        - A profil szerkesztése menüpontban a felhasználó megváltoztathatja a nevét.
    - Ha a felhasználó nincs bejelentkezve:
        - Választhat a bejelentkezés és a regisztráció között.


Az admin felülethez az URL:
```sh
http://localhost:3000/secret/adminlogin
```

### Backend

A backend API-hoz a leírás: 
```sh
localhost:3000/apidoc 
```
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
- Email-es autentikáció
- Email-es értesítés
- Mikor a felhasználó törli az időpontját akkor, nem kerül vissza a szabad időpontok közé az időpont
- Az admin nem tudja módosítani az árakat

A Weboldal React, Nestjs és Sqlite felhasználásával készült

