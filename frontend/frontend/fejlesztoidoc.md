Tesztek:

# Felhaználói felület tesztelése:

## Az input mezők kitöltése után a "Küldés" gombra kattintva a rendszer a következőket teszi:
- Ellenőrzi, hogy a mezők kitöltésre kerültek-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők formátuma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő hosszúságú-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő karaktereket tartalmaz-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy az mezők az sql injection támadás-e. Ha igen, hibaüzenetet jelenít meg.

## A regisztráció gombra kattintva a rendszer a következőket teszi:
- Ellenőrzi, hogy a mezők kitöltésre kerültek-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők formátuma megfelelő-e. Ha nem, hibaüzenetet jelenít meg. Pl.: email cím formátum.
- Ellenőrzi, hogy a mezők tartalma megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő hosszúságú-e. Ha nem, hibaüzenetet jelenít meg.
- Ellenőrzi, hogy a mezők tartalma megfelelő karaktereket tartalmaz-e. Ha nem, hibaüzenetet jelenít meg.

## A bejelentkezésnél a rendszer a következőket teszi:
- Ellenőrzi, hogy az email cím és jelszó megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ha a bejelentkezés sikeres, akkkor a rendszer a főoldalra irányítja a felhasználót.


# Adminisztrátori felület tesztelése:

## Bejelentkezéskor a rendszer a következőket teszi:
- Ellenőrzi, hogy az email cím és jelszó megfelelő-e. Ha nem, hibaüzenetet jelenít meg.
- Ha a bejelentkezés sikeres, akkkor a rendszer az adminisztrátori felületre irányítja a felhasználót.



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

