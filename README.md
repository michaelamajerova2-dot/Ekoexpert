# Receptár

Webová aplikácia na správu a organizáciu kulinárskych receptov.

## Funkcie

- Pridávanie, úprava a mazanie receptov
- Kategorizácia receptov (raňajky, obed, večera)
- Tagovanie receptov (vegan, veggie, meat)
- Upload obrázkov
- Detailné ingrediencie s množstvami
- Postupy prípravy
- Vyhľadávanie a filtrovanie

## Technológie

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Databáza:** SQLite / PostgreSQL / JSON (podľa výberu)
- **Styling:** Tailwind CSS

## Dokumentácia

Kompletná dokumentácia pre development je dostupná v súbore [DEVELOPMENT_DOCS.md](./DEVELOPMENT_DOCS.md).

## Quick Start

### Predpoklady
- Node.js 18+ ([Stiahni tu](https://nodejs.org/))
- npm (príde s Node.js)

### Inštalácia

```bash
# 1. Prejdi do adresára projektu
cd /Users/michaelamajerova/Documents/DEV/Ekoexpert

# 2. Nainštaluj root závislosti
npm install

# 3. Nainštaluj závislosti pre backend
cd backend
npm install
cd ..

# 4. Nainštaluj závislosti pre frontend
cd frontend
npm install
cd ..
```

### Spustenie prototypu

**Možnosť 1: Spustiť backend aj frontend naraz (odporúčané)**

```bash
# Z root adresára
npm run dev
```

**Možnosť 2: Spustiť samostatne v dvoch termináloch**

Terminál 1 - Backend:
```bash
cd backend
npm run dev
```

Terminál 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Prístup k aplikácii

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Health check:** http://localhost:3000/api/health

## Prototyp obsahuje

✅ Funkčný backend s REST API
✅ 6 vzorových receptov (Guláš, Palacinky, Quinoa šalát, Caesar šalát, Ovsená kaša, Losos)
✅ Moderný UI s Navbar a Sidebar
✅ Grid zobrazenie receptov s kartami
✅ Filtrovanie podľa kategórií
✅ Filtrovanie podľa tagov
✅ Vyhľadávanie receptov
✅ Detail receptu s ingredienciami a postupom
✅ Responzívny dizajn (mobile, tablet, desktop)
✅ Hover efekty a animácie

## Štruktúra projektu

```
ekoexpert/
├── frontend/          # React aplikácia
├── backend/           # Express API
├── database/          # Databázové scripty
├── docs/              # Dokumentácia
└── README.md
```

## Development Plán

Projekt je rozdelený do 6 fáz:

1. **Setup a základná štruktúra** - Inicializácia projektu
2. **Základná funkcionalita** - CRUD operácie, zoznam receptov
3. **Vytváranie a úprava** - Formuláre, upload obrázkov
4. **Filtrovanie** - Kategórie, tagy, vyhľadávanie
5. **UI/UX** - Styling, responsive design
6. **Testing** - Testy a optimalizácia

Detailný plán nájdeš v [DEVELOPMENT_DOCS.md](./DEVELOPMENT_DOCS.md).

## Prvé kroky implementácie

1. Inicializuj Git repozitár
2. Setup mono-repo s workspaces
3. Vytvor backend (Express + TypeScript)
4. Vytvor frontend (React + Vite)
5. Implementuj základné CRUD operácie
6. Vytvor UI komponenty

## License

MIT
