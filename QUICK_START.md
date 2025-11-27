# 🚀 Rýchly Štart - Receptár

## Spustenie aplikácie (3 jednoduché kroky)

### 1️⃣ Otvor Terminál

**Mac:**
- Stlač `Cmd + Medzerník`
- Napíš "Terminal"
- Stlač Enter

### 2️⃣ Prejdi do projektu a spusti servery

Skopíruj a vlož tieto príkazy do terminálu:

```bash
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert
npm run dev
```

**alebo použiť môj skript:**

```bash
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert
./start.sh
```

### 3️⃣ Otvor v prehliadači

Otvor: **http://localhost:5173**

---

## ✅ Čo by si mala vidieť

### V Termináli:
```
[backend] 🚀 Server beží na http://localhost:3000
[backend] 📡 API endpoint: http://localhost:3000/api
[frontend]
[frontend]   ➜  Local:   http://localhost:5173/
```

### V prehliadači (http://localhost:5173):
- **Horný panel (Navbar)** - Logo "Receptár" + vyhľadávanie + tlačidlo "Nový recept"
- **Ľavý panel (Sidebar)** - Kategórie a tagy
- **Recepty** - 6 kariet s receptami:
  - Guláš s haluškami
  - Palacinky s nutellou
  - Quinoa šalát s avokádom
  - Kurací Caesar šalát
  - Ovsená kaša s ovocím
  - Losos s bylinkami

---

## 🎮 Vyskúšaj funkcie

1. **Klikni na recept** → Zobrazí sa detail
2. **Klikni na kategóriu** (napr. "Raňajky") → Filtruje recepty
3. **Klikni na tag** (napr. "vegan") → Filtruje podľa tagu
4. **Zadaj do vyhľadávania** "šalát" → Nájde recepty so šalátom
5. **Zmenši okno** → Responzívny dizajn

---

## ⏹️ Zastavenie serverov

V termináli stlač: **Ctrl + C**

---

## ❌ Ak niečo nefunguje

### "npm: command not found"

Reštartuj terminál a skús znova.

### "Port already in use"

Niečo už beží na porte. Zastav to:

```bash
# Zastav port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Zastav port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

Potom znova spusti `npm run dev`

### Prázdna stránka

1. Skontroluj, či terminál ukazuje, že servery bežia
2. Otvor http://localhost:3000/api/health - malo by to vrátiť JSON
3. Skontroluj console v prehliadači (F12)

---

## 📞 Potrebuješ pomoc?

Pošli mi:
- Screenshot terminálu
- Alebo text chyby

Pomôžem ti to vyriešiť! 😊

---

## 🎉 Keď to funguje

Daj mi vedieť a môžeme pokračovať v implementácii ďalších funkcií:
- Formulár na pridávanie receptov
- Upload obrázkov
- Úprava a mazanie receptov
- A viac...
