
# Projekt Dokumentáció

## Telepítés

A csomagokat a `composer` és az `npm` csomagkezelőkkel kell telepíteni:

- **Laravel**: `laravel-src` könyvtárban futtasd a következő parancsot:  
  ```bash
  composer install
  ```

- **React**: `react-src` könyvtárban futtasd a következő parancsot:  
  ```bash
  npm install
  ```

A projekthez a konténerizációt a **Laravel Sail** segítségével valósítottam meg.

A konténerek elindításához futtasd az alábbi parancsot a gyökérmappában (`laravel-src`):
```bash
./vendor/bin/sail up -d
```

### Opcionális:
Az alábbi alias használatával egyszerűsíthetjük a Sail parancsok futtatását:
```bash
alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'
```

### Konfiguráció:
A `.env` fájlban az adatbázis kapcsolat beállítása szükséges.

## Artisan Parancsok:

- Laravel kulcs generálása:  
  ```bash
  sail artisan key:generate
  ```

- Adatbázis migrációk futtatása:  
  ```bash
  sail artisan migrate
  ```

- Adatbázis feltöltése tesztadatokkal:  
  ```bash
  sail artisan db:seed
  ```
  (Létrehoz 10 filmet, filmenként 1-5 vetítéssel az elkövetkező 2 hétben.)

A Laravel applikáció a `localhost:8000`, a React applikáció pedig a `localhost:3000` porton érhető el.

## Konténerek

- **laravel.test** és **mysql**: A Laravel Sail által létrehozott konténerek. További információkért lásd a [Laravel Sail dokumentációt](https://laravel.com/docs/11.x/sail).
  
- **react-src**: A React alkalmazás a `node:20` image alapján futó konténerben működik, amely az induláskor automatikusan futtatja az `npm start` parancsot.

## Volumeok

A React alkalmazás közvetlenül eléri a Laravel storage megosztott fájlrendszerét fájlnév alapján, így a fájlokat nem szükséges HTTP-n keresztül továbbítani, elegendő a fájlnevet megadni.

## Laravel Applikáció

### Movie és Projection felépítése

- **Modellek**: `Movie.php`, `Projection.php`
- **Controllerek**: `MovieController.php`, `ProjectionController.php`
- **Service-ek**: `MovieService.php`, `ProjectionService.php` (dependency injection segítségével kerülnek a kontrollerekbe)
- **Factoryk**: `MovieFactory.php`, `ProjectionFactory.php` (Seederben és esetleges unit tesztekhez használatosak)
- **Form Requestek**: `MovieStoreRequest.php`, `MovieUpdateRequest.php`, `ProjectionStoreRequest.php` (A beérkező kérések validációját végzik)

### Végpontok

#### Movie:
- `GET /cinema/movies/`: Visszaadja a filmek listáját  
  **Bemenet**: {}  
  **Kimenet**: JSON

- `GET /cinema/movies/{movie}`: Visszaad egy filmet  
  **Bemenet**: {}  
  **Kimenet**: JSON

- `POST /cinema/movies`: Új film létrehozása  
  **Bemenet**: `formData`  
  **Kimenet**: JSON

- `POST /cinema/movies/update/{movie}`: Film frissítése  
  **Bemenet**: `formData`  
  **Kimenet**: JSON

- `POST /cinema/movies/delete/{movie}`: Film törlése (és a hozzátartozó vetítések)  
  **Bemenet**: {}  
  **Kimenet**: Boolean

#### Projection:
- `POST /cinema/projections/`: Új vetítési időpont létrehozása  
  **Bemenet**: `formData`  
  **Kimenet**: JSON

- `POST /cinema/projections/delete/{projection}`: Vetítési időpont törlése  
  **Bemenet**: {}  
  **Kimenet**: Boolean

## Adatbázis Seeder

A Factory-ket használva hozza létre az adatokat.

## React Applikáció

### Komponensek

- `Header.js`: Az applikáció fejléce
- `Footer.js`: Az applikáció lábléce
- `App.js`: Gyökérkomponens és routing
- `MoviesGrid.js`: Filmkártyák megjelenítése
- `MovieCard.js`: Egy film rövidített megjelenítése
- `MovieDetails.js`: Egy film részletes megjelenítése
- `MoviesForm.js`: Filmek létrehozása és szerkesztése, valamint vetítések létrehozása és törlése

### Szervizek

- `movieService.js`: A filmek kezelésére szolgáló Axios függvények
- `projectionService.js`: A vetítések kezelésére szolgáló Axios függvények

## Csatolmányok

Az alkalmazás képei és logója AI segítségével generáltak, valamint a `style.css` túlnyomó része is (ezek nem képezték a feladat részét, de az átlátható megjelenés érdekében elkészítettem őket).
