# ✅ Kontrola inštalácie - Checklist

## Krok 1: Over Node.js a npm

Otvor **Terminál** a zadaj tieto príkazy:

```bash
node --version
```
**Očakávaný výsledok:** `v18.0.0` alebo vyššie (ty máš v25.2.1 ✅)

```bash
npm --version
```
**Očakávaný výsledok:** `9.0.0` alebo vyššie

Ak vidíš verzie, všetko je OK! ✅

---

## Krok 2: Skontroluj, či sú nainštalované závislosti

```bash
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert
```

### Skontroluj root
```bash
ls node_modules
```
**Mal by si vidieť:** `concurrently` alebo iné adresáre

**Ak NIE:** Spusti `npm install`

### Skontroluj backend
```bash
cd backend
ls node_modules
```
**Mal by si vidieť:** `express`, `cors`, `typescript` a ďalšie adresáre

**Ak NIE:** Spusti `npm install`

### Skontroluj frontend
```bash
cd ../frontend
ls node_modules
```
**Mal by si vidieť:** `react`, `vite`, `tailwindcss` a ďalšie adresáre

**Ak NIE:** Spusti `npm install`

---

## Krok 3: Nainštaluj všetko (ak chýba)

Ak niektoré `node_modules` chýbajú, spusti:

```bash
# Vráť sa do root adresára
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert

# Nainštaluj root závislosti
npm install

# Nainštaluj backend závislosti
cd backend
npm install

# Nainštaluj frontend závislosti
cd ../frontend
npm install

# Vráť sa do root
cd ..
```

⏱️ **Trvanie:** 3-5 minút (sťahuje sa veľa balíčkov)

---

## Krok 4: Skontroluj, či všetko funguje

### Test 1: Backend

```bash
cd backend
npm run dev
```

**Očakávaný výsledek:**
```
🚀 Server beží na http://localhost:3000
📡 API endpoint: http://localhost:3000/api
```

Ak vidíš toto, backend funguje! ✅

Zastav server: **Ctrl + C**

### Test 2: Frontend

```bash
cd ../frontend
npm run dev
```

**Očakávaný výsledok:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Ak vidíš toto, frontend funguje! ✅

Zastav server: **Ctrl + C**

---

## Krok 5: Spusti všetko naraz

```bash
# Vráť sa do root
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert

# Spusti backend aj frontend súčasne
npm run dev
```

**Očakávaný výsledok:**
- V termináli vidíš logy z backendu aj frontendu
- Otvoríš **http://localhost:5173** v prehliadači
- Vidíš Receptár aplikáciu so 6 receptami

---

## ✅ Checklist - Čo musí fungovať

- [ ] `node --version` zobrazí verziu
- [ ] `npm --version` zobrazí verziu
- [ ] `node_modules` existuje v root/
- [ ] `node_modules` existuje v backend/
- [ ] `node_modules` existuje v frontend/
- [ ] `npm run dev` v backend/ spustí server na porte 3000
- [ ] `npm run dev` v frontend/ spustí Vite na porte 5173
- [ ] http://localhost:5173 zobrazí aplikáciu
- [ ] V aplikácii vidíš 6 receptov
- [ ] Filtrovanie funguje (kategórie, tagy)
- [ ] Vyhľadávanie funguje
- [ ] Kliknutím na recept vidíš detail

---

## ❌ Časté problémy

### "command not found: npm"

**Riešenie:** Reštartuj terminál alebo pridaj do PATH:

```bash
export PATH="/opt/homebrew/bin:$PATH"
```

Alebo pridaj do `~/.zshrc`:
```bash
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### "EACCES: permission denied"

**Riešenie:** Nepoužívaj `sudo`. Ak máš problém s právami:

```bash
sudo chown -R $(whoami) ~/.npm
```

### "Port 3000 already in use"

**Riešenie:** Niečo už beží na porte 3000:

```bash
lsof -ti:3000 | xargs kill -9
```

### "Port 5173 already in use"

**Riešenie:**

```bash
lsof -ti:5173 | xargs kill -9
```

### Prázdna stránka / biela obrazovka

**Riešenie:**

1. Otvor Developer Tools (F12)
2. Pozri Console - sú tam chyby?
3. Uisti sa, že backend beží (http://localhost:3000/api/health)
4. Uisti sa, že frontend beží (port 5173)

---

## 📸 Ako to má vyzerať

### Terminál pri spustení `npm run dev`:

```
[backend] 🚀 Server beží na http://localhost:3000
[backend] 📡 API endpoint: http://localhost:3000/api
[frontend]
[frontend]   VITE v5.0.8  ready in 1234 ms
[frontend]
[frontend]   ➜  Local:   http://localhost:5173/
```

### V prehliadači na http://localhost:5173:

- **Navbar** s logom "Receptár" a search barom
- **Sidebar** (ľavá strana) s kategóriami a tagmi
- **Grid** s receptami (karty s fotkami):
  - Guláš s haluškami
  - Palacinky s nutellou
  - Quinoa šalát
  - Caesar šalát
  - Ovsená kaša
  - Losos s bylinkami

---

## 🎯 Po kontrole

Keď overíš, že všetko funguje, daj mi vedieť:

✅ "Všetko funguje!" - Potom môžeme začať pracovať na ďalších funkciách

alebo

❌ "Mám problém: [popis]" - Pomôžem ti to vyriešiť

---

**Potrebuješ pomoc?** Pošli mi:
1. Screenshot chyby z terminálu
2. Alebo výstup z príkazu, kde máš problém
