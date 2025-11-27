# Ako spustiť prototyp Receptára

## 📋 Príprava

### 1. Nainštaluj Node.js

Ak ešte nemáš Node.js nainštalovaný:

1. Choď na https://nodejs.org/
2. Stiahni **LTS verziu** (Long Term Support)
3. Spusti inštalátor a postupuj podľa inštrukcií
4. Po inštalácii over, že funguje:

```bash
node --version
# Mal by sa zobraziť: v18.x.x alebo vyššie

npm --version
# Mal by sa zobraziť: 9.x.x alebo vyššie
```

## 🚀 Spustenie prototypu

### Krok 1: Otvor terminál

**Mac:**
- Stlač `Cmd + Medzerník`
- Napíš "Terminal"
- Stlač Enter

**Windows:**
- Stlač `Win + R`
- Napíš "cmd"
- Stlač Enter

### Krok 2: Prejdi do projektu

```bash
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert
```

### Krok 3: Nainštaluj závislosti

```bash
# Root závislosti
npm install

# Backend závislosti
cd backend
npm install
cd ..

# Frontend závislosti
cd frontend
npm install
cd ..
```

**Toto môže trvať 2-5 minút.** npm sťahuje všetky potrebné knižnice.

### Krok 4: Spusti aplikáciu

**Jednoduchý spôsob (všetko naraz):**

```bash
npm run dev
```

Toto spustí backend aj frontend súčasne.

**Alternatíva (2 terminály):**

Terminál 1:
```bash
cd backend
npm run dev
```

Terminál 2 (otvor nový terminál):
```bash
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert/frontend
npm run dev
```

### Krok 5: Otvor aplikáciu v prehliadači

1. Otvor prehliadač (Chrome, Firefox, Safari...)
2. Choď na: **http://localhost:5173**

Hotovo! Mal by si vidieť prototyp Receptára.

## 🎉 Čo môžeš skúšať

1. **Prezerať recepty** - Na hlavnej stránke vidíš grid s receptami
2. **Filtrovať** - Klikni na kategóriu v sidebar-e (Raňajky, Obed, Večera...)
3. **Tagy** - Vyfiltruj recepty podľa tagov (vegan, meat, fish...)
4. **Hľadať** - Zadaj do search baru názov jedla alebo ingredienciu
5. **Detail receptu** - Klikni na recept pre detail s ingredienciami a postupom

## 🛠️ Ako zastaviť aplikáciu

V termináli stlač: **Ctrl + C**

Toto ukončí server.

## ❗ Časté problémy

### "command not found: npm"

**Riešenie:** Node.js nie je nainštalovaný. Prejdi na Krok 1 (Inštalácia Node.js).

### "EADDRINUSE: address already in use"

**Riešenie:** Port 3000 alebo 5173 je už obsadený.

```bash
# Mac/Linux
lsof -ti:3000 | xargs kill
lsof -ti:5173 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_číslo> /F
```

### "Cannot GET /api/recipes"

**Riešenie:** Backend nebeží. Uisti sa, že backend je spustený (`cd backend && npm run dev`).

### Prázdna stránka / biela obrazovka

**Riešenie:**

1. Otvor Developer Tools (F12)
2. Pozri si konzolu - sú tam chyby?
3. Skontroluj, či frontend beží na porte 5173
4. Skontroluj, či backend beží na porte 3000

## 📚 Ďalšie kroky

Po úspešnom spustení prototypu si prečítaj:

- **DEVELOPMENT_DOCS.md** - Kompletná dokumentácia projektu
- **UI_UX_DESIGN.md** - Dizajnový systém a komponenty

## 💡 Tipy

1. **Hot Reload** - Zmeny v kóde sa automaticky prejavia v prehliadači
2. **Backend logy** - Vidíš ich v termináli kde beží backend
3. **Frontend errors** - Vidíš ich v Browser Console (F12)
4. **Mock dáta** - Nachádzajú sa v `backend/src/data/recipes.json`

## 🎨 Čo ďalej implementovať?

Pozri si **DEVELOPMENT_DOCS.md**, sekciu "Implementačný plán" pre ďalšie fázy:

- Formulár na pridávanie receptov
- Upload obrázkov
- Úprava a mazanie receptov
- Export do PDF
- A viac...

---

**Potrebuješ pomoc?** Otvor issue alebo sa opýtaj!
