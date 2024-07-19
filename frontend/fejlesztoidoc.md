# Felhaználói felület tesztelése:

## A regisztráció gombra kattintva a rendszer a következőket teszi:
- Ellenőrzi, hogy a mezők kitöltésre kerültek-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők formátuma megfelelő-e. Ha nem, hibaüzenetet jelenít meg. Pl.: email cím formátum.
- Ellenőrzi, hogy a mezők tartalma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő hosszúságú-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő karaktereket tartalmaz-e. Ha nem, hibaüzenetet jelenít meg.

## A bejelentkezésnél a rendszer a következőket teszi:
- Ellenőrzi, hogy az email cím és jelszó megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ha a bejelentkezés sikeres, akkkor a rendszer a főoldalra irányítja a felhasználót.


## A főoldalon ha a felhasználó be van lépve és van lefoglalt időpontja, akkor a rendszer a következőket teszi:
- Megjeleníti a lefoglalt időpontot, és törlési lehetőséget biztosít 48 órán kívűl.
- Ha a törlés sikeres, akkor a rendszer törli a foglalást az adatbázisból és frissíti a főoldalt.

## Az árlista

## A foglalás oldalon a rendszer a következőket teszi:
- Megjeleníti a szabad napokat és időpontokat.
- Ha a felhasználónak van időpontja akkor a foglalást ellehetleníti és a gomb helyén egy szöveges üzenetet jelenít meg.
### Az időpont foglaláskor a mezők kitöltése után a "Küldés" gombra kattintva a rendszer a következőket teszi:
- Ellenőrzi, hogy a mezők kitöltésre kerültek-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők formátuma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő hosszúságú-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő karaktereket tartalmaz-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy az mezők az sql injection támadás-e. Ha igen, hibaüzenetet jelenít meg.


# Adminisztrátori felület tesztelése:

## Bejelentkezéskor a rendszer a következőket teszi:
- Ellenőrzi, hogy az email cím és jelszó megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ha a bejelentkezés sikeres, akkkor a rendszer az adminisztrátori felületre irányítja a felhasználót.

## A foglalások kezelése felületen a rendszer a következőket teszi:
### Megjeleníti a foglalásokat és a szabad időpontokat, valamint a rendszer a következőket teszi:
  - Ellenőrzi, hogy a foglalások és szabad időpontok megjelenítése sikeres-e. Ha nem, hibaüzenetet jelenít meg.
  - Ellenőrzi, hogy a foglalások és szabad időpontok megfelelő formátumban jelennek-e meg. Ha nem, hibaüzenetet jelenít meg.

### A törlés gombra kattintva a rendszer törli a foglalást az adatbázisból és frissíti az adminisztrátori felületet.
### Szabad időpont feltöltésekor a rendszer a következőket teszi:
  - Ellenőrzi, hogy a mezők kitöltésre kerültek-e. Ha nem, hibaüzenetet jelenít meg.
  - Ellenőrzi, hogy a mezők formátuma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
  - Ellenőrzi, hogy a mezők tartalma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
  - Ellenőrzi, hogy a mezők tartalma megfelelő hosszúságú-e. Ha nem, hibaüzenetet jelenít meg.
  - Ellenőrzi, hogy a mezők tartalma megfelelő karaktereket tartalmaz-e. Ha nem, hibaüzenetet jelenít meg.

## A kép feltöltésekor a rendszer a következőket teszi:
- Ellenőrzi, hogy a kép formátuma megfelelő-e. Ha nem, hibaüzenetet jelenít meg. (jpg, jpeg, png)
- Ellenőrzi, hogy a kép mérete megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ha a kép feltöltése sikeres, akkor a rendszer a képet elmenti az adatbázisba és a szerverre is, majd a képet megjeleníti az adminisztrátori felületen a galériában.

## A kép törlésekor a rendszer a következőket teszi:
- Ellenőrzi, hogy a kép az adatbázisban szerepel-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a kép a szerveren szerepel-e. Ha nem, hibaüzenetet jelenít meg.
- Ha a kép törlése sikeres, akkor a rendszer törli a képet az adatbázisból és a szerverről is, majd frissíti az adminisztrátori felületet.

## Profil módosításakor a rendszer a következőket teszi:
- Ellenőrzi, hogy a mezők kitöltésre kerültek-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők formátuma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.

