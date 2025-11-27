# Nasadenie na Render.com

## Príprava

Všetky potrebné súbory sú už pripravené:
- ✅ Backend servuje frontend v produkcii
- ✅ Produkčné scripty v `package.json`
- ✅ `.env.production` pre frontend
- ✅ `render.yaml` konfigurácia
- ✅ Recepty sú v Git repozitári

## Kroky nasadenia

### 1. Commitnite zmeny do Git

```bash
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert

git add .
git commit -m "Priprava pre produkciu - backend servuje frontend"
git push origin main
```

### 2. Vytvorte Web Service na Render

1. Prejdite na https://dashboard.render.com
2. Kliknite na **"New +"** → **"Web Service"**
3. Pripojte váš GitHub repozitár
4. Použite tieto nastavenia:

**Základné nastavenia:**
- **Name**: `smakociny-receptar` (alebo ako chcete)
- **Region**: Frankfurt (alebo najbližší)
- **Branch**: `main`
- **Root Directory**: nechajte prázdne
- **Runtime**: `Node`
- **Build Command**:
  ```
  npm install && npm run build
  ```
- **Start Command**:
  ```
  npm start
  ```

**Environment Variables:**
- `NODE_ENV` = `production`
- `PORT` = `10000` (Render automaticky nastaví)

**Advanced:**
- **Auto-Deploy**: `Yes` (automatické nasadenie pri push do Git)

### 3. Pridajte Persistent Disk (voliteľné)

Ak chcete aby sa recepty zachovali aj po reštarte:

1. V nastaveniach služby → **Disks**
2. **Add Disk**:
   - Name: `recipes-data`
   - Mount Path: `/opt/render/project/src/backend/src/data`
   - Size: 1 GB (Free tier)

**POZNÁMKA**: Recepty sú už v Git repozitári, takže disk nie je nutný pre základnú funkčnosť.

### 4. Deploy

1. Kliknite na **"Create Web Service"**
2. Render začne automaticky budovať aplikáciu
3. Proces trvá 5-10 minút
4. Po dokončení dostanete URL ako: `https://smakociny-receptar.onrender.com`

## Problémy a riešenia

### "Cannot GET /"
- ✅ **OPRAVENÉ**: Backend teraz servuje frontend v produkcii

### Recepty sa nenačítajú
- Skontrolujte, či je `recipes.json` v Git repozitári
- Skontrolujte Console logs na Render: **"Logs"** v menu

### Build zlyhá
- Skontrolujte, či sú v `package.json` správne scripty
- Skontrolujte Render build logs

## Testovanie lokálne

Pred nasadením otestujte build lokálne:

```bash
# Build projektu
npm run build

# Spustite produkčný server
npm start
```

Otvorte: `http://localhost:3000`

## Aktualizácia na Render

Po každej zmene kódu:

```bash
git add .
git commit -m "Popis zmien"
git push origin main
```

Render automaticky nasadí novú verziu.

## Free Tier limity

- 750 hodín/mesiac (dostačujúce pre 1 službu)
- Aplikácia "zaspí" po 15 minútach nečinnosti
- Prvé načítanie po spánku trvá ~30 sekúnd
- 1 GB persistent disk zadarmo

## Poznámky

- Backend beží na porte z `process.env.PORT` (Render nastaví automaticky)
- Frontend volá API na `/api` (relatívna cesta)
- Všetky React routes fungujú vďaka catch-all v backen de `app.get('*')`
