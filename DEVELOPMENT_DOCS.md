# Receptár - Development Dokumentácia

## 📋 Prehľad projektu

Receptár je webová aplikácia na správu a organizáciu receptov. Umožňuje používateľom vytvárať, upravovať a prezerať recepty s obrázkami, ingredienciami a postupom prípravy.

## 🎯 Hlavné funkcie

### Core Features
- ✅ Pridávanie a úprava receptov
- ✅ Kategorizácia receptov (raňajky, obed, večera)
- ✅ Tagovanie receptov (vegan, veggie, meat, atď.)
- ✅ Upload obrázkov pre recepty
- ✅ Zoznam ingrediencií s množstvami
- ✅ Detailný postup prípravy
- ✅ Vyhľadávanie a filtrovanie receptov

### Budúce rozšírenia (Nice to have)
- ⏳ Hodnotenie receptov (hviezdičky)
- ⏳ Čas prípravy a varenia
- ⏳ Počet porcií
- ⏳ Náročnosť receptu
- ⏳ Nutričné informácie
- ⏳ Export receptov (PDF, print)
- ⏳ Zdieľanie receptov

## 🏗️ Navrhovaná architektúra

### Variant A: Full-Stack s databázou (Odporúčaný pre škálovateľnosť)

```
Frontend (React + TypeScript + Vite)
          ↓
Backend API (Node.js + Express + TypeScript)
          ↓
Database (PostgreSQL / MongoDB)
          ↓
File Storage (lokálne / cloud storage pre obrázky)
```

**Výhody:**
- Škálovateľné riešenie
- Rýchle vyhľadávanie
- Možnosť multi-user funkcií v budúcnosti
- Profesionálna štruktúra

**Nevýhody:**
- Komplexnejší setup
- Vyžaduje databázový server

### Variant B: Jednoduchšie riešenie pre rýchly štart

```
Frontend (React + TypeScript + Vite)
          ↓
Backend API (Node.js + Express + TypeScript)
          ↓
JSON súbory / SQLite (pre dáta)
          ↓
Lokálne uloženie obrázkov
```

**Výhody:**
- Jednoduchší setup
- Žiadne externé závislosti
- Ľahko prenosné

**Nevýhody:**
- Obmedzená škálovateľnosť
- Pomalšie vyhľadávanie pri väčšom množstve dát

## 🎨 UI/UX Design

**Kompletný dizajn guide:** [UI_UX_DESIGN.md](./UI_UX_DESIGN.md)

**Dizajnová koncepcia:**
- Moderný, čistý a minimalistický dizajn
- Navigačný panel (horný navbar + sidebar pre filtre)
- Grid layout pre recepty s veľkými fotkami
- Responzívny design (mobile-first)
- Teplá zelená farba (#22c55e) ako primárna téma
- Tailwind CSS pre styling

**Hlavné UI komponenty:**
- Navbar s vyhľadávaním a tlačidlom "+ Nový recept"
- Sidebar s filtrami (kategórie, tagy, čas)
- Recipe Cards s hover efektami
- Detail page s hero image
- Formulár s drag & drop upload

## 🛠️ Technológie

### Frontend
- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API / Zustand
- **Form Handling:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Routing:** React Router
- **Toast Notifications:** Sonner
- **Image Upload:** React Dropzone

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Validation:** Zod / Joi
- **File Upload:** Multer
- **Image Processing:** Sharp (na optimalizáciu obrázkov)

### Databáza (Variant A)
- **Databáza:** PostgreSQL 15+
- **ORM:** Prisma / TypeORM
- **Alternative:** MongoDB + Mongoose

### Databáza (Variant B)
- **SQLite** s better-sqlite3
- **JSON files** s fs-extra

## 📊 Dátový model

### Recipe (Recept)
```typescript
interface Recipe {
  id: string;                    // UUID
  title: string;                 // Názov receptu
  description?: string;          // Krátky popis
  image?: string;                // URL/path k obrázku
  category: RecipeCategory;      // Kategória
  tags: string[];                // Tagy (vegan, veggie, meat, ...)
  ingredients: Ingredient[];     // Zoznam ingrediencií
  instructions: string;          // Postup prípravy (markdown support)
  prepTime?: number;             // Čas prípravy v minútach
  cookTime?: number;             // Čas varenia v minútach
  servings?: number;             // Počet porcií
  difficulty?: Difficulty;       // Náročnosť
  createdAt: Date;               // Dátum vytvorenia
  updatedAt: Date;               // Dátum poslednej úpravy
}

enum RecipeCategory {
  BREAKFAST = 'breakfast',       // Raňajky
  LUNCH = 'lunch',               // Obed
  DINNER = 'dinner',             // Večera
  SNACK = 'snack',               // Desiata/Olovrant
  DESSERT = 'dessert'            // Dezert
}

interface Ingredient {
  id: string;
  name: string;                  // Názov ingrediencie
  amount: number;                // Množstvo
  unit: string;                  // Jednotka (g, kg, ml, l, ks, PL, ČL, ...)
  note?: string;                 // Poznámka (napr. "nakrájané na kocky")
}

enum Difficulty {
  EASY = 'easy',                 // Ľahké
  MEDIUM = 'medium',             // Stredné
  HARD = 'hard'                  // Náročné
}
```

### Tag (štítok)
```typescript
interface Tag {
  id: string;
  name: string;                  // Názov tagu (vegan, veggie, meat, ...)
  color?: string;                // Farba pre vizualizáciu
}

// Preddefinované tagy
const DEFAULT_TAGS = [
  'vegan',
  'veggie',
  'meat',
  'fish',
  'gluten-free',
  'dairy-free',
  'quick',
  'healthy'
];
```

## 🗂️ Štruktúra projektu

```
ekoexpert/
├── docs/                      # Dokumentácia
│   └── DEVELOPMENT_DOCS.md
├── frontend/                  # React aplikácia
│   ├── public/
│   │   └── uploads/          # Nahrané obrázky (dev)
│   ├── src/
│   │   ├── components/       # React komponenty
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── MainLayout.tsx
│   │   │   ├── Recipe/
│   │   │   │   ├── RecipeCard.tsx
│   │   │   │   ├── RecipeDetail.tsx
│   │   │   │   ├── RecipeForm.tsx
│   │   │   │   └── RecipeList.tsx
│   │   │   ├── Filters/
│   │   │   │   ├── CategoryFilter.tsx
│   │   │   │   ├── TagFilter.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   └── Common/
│   │   │       ├── Button.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── ImageUpload.tsx
│   │   │       ├── Tag.tsx
│   │   │       └── Toast.tsx
│   │   ├── pages/            # Stránky
│   │   │   ├── Home.tsx
│   │   │   ├── RecipeDetailPage.tsx
│   │   │   ├── CreateRecipe.tsx
│   │   │   └── EditRecipe.tsx
│   │   ├── services/         # API calls
│   │   │   └── api.ts
│   │   ├── types/            # TypeScript typy
│   │   │   └── recipe.types.ts
│   │   ├── hooks/            # Custom hooks
│   │   │   └── useRecipes.ts
│   │   ├── utils/            # Utility funkcie
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/                   # Node.js API
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   │   └── recipeController.ts
│   │   ├── routes/           # API routes
│   │   │   └── recipeRoutes.ts
│   │   ├── models/           # Data models
│   │   │   └── Recipe.ts
│   │   ├── services/         # Business logic
│   │   │   ├── recipeService.ts
│   │   │   └── imageService.ts
│   │   ├── middleware/       # Express middleware
│   │   │   └── upload.ts
│   │   ├── utils/            # Utility funkcie
│   │   ├── types/            # TypeScript typy
│   │   └── index.ts          # Entry point
│   ├── uploads/              # Nahrané súbory
│   ├── data/                 # JSON databáza (variant B)
│   │   └── recipes.json
│   ├── package.json
│   └── tsconfig.json
├── database/                  # Databázové scripty (variant A)
│   ├── migrations/
│   └── seeds/
├── .gitignore
├── README.md
└── package.json              # Root package.json (workspaces)
```

## 🔌 API Endpoints

### Recepty

| Method | Endpoint              | Popis                           |
|--------|----------------------|----------------------------------|
| GET    | `/api/recipes`       | Zoznam všetkých receptov        |
| GET    | `/api/recipes/:id`   | Detail konkrétneho receptu      |
| POST   | `/api/recipes`       | Vytvorenie nového receptu       |
| PUT    | `/api/recipes/:id`   | Úprava existujúceho receptu     |
| DELETE | `/api/recipes/:id`   | Vymazanie receptu               |

### Query parametere pre filtrovanie
- `?category=lunch` - Filtrovanie podľa kategórie
- `?tags=vegan,veggie` - Filtrovanie podľa tagov
- `?search=guláš` - Vyhľadávanie v názve a ingredienciách

### Obrázky
| Method | Endpoint              | Popis                           |
|--------|----------------------|----------------------------------|
| POST   | `/api/upload`        | Upload obrázka                  |
| GET    | `/api/uploads/:filename` | Získanie obrázka            |

## 📝 Implementačný plán

### Fáza 1: Setup a základná štruktúra (1-2 dni)
1. ✅ Inicializácia projektu
   - Setup mono-repo s workspaces
   - Vytvorenie frontend a backend zložiek
   - Konfigurácia TypeScript

2. ✅ Backend základy
   - Express server setup
   - Basic routing
   - CORS konfigurácia
   - Error handling middleware

3. ✅ Frontend základy
   - React + Vite setup
   - React Router konfigurácia
   - Základná štruktúra komponentov
   - API service layer

### Fáza 2: Základná funkcionalita (2-3 dni)
4. ✅ Dátový model a storage
   - Vytvorenie TypeScript interfacov
   - Implementácia storage layer (JSON/SQLite/Prisma)
   - CRUD operácie pre recepty

5. ✅ Recipe List & Detail
   - Zoznam receptov (RecipeList)
   - Karta receptu (RecipeCard)
   - Detail receptu (RecipeDetail)
   - API integrácia

### Fáza 3: Vytváranie a úprava receptov (2-3 dni)
6. ✅ Formulár na vytváranie receptov
   - RecipeForm komponent
   - Validácia (React Hook Form)
   - Dynamické pridávanie ingrediencií
   - Markdown editor pre postup

7. ✅ Upload obrázkov
   - Multer middleware
   - Image upload komponent
   - Image preview
   - Optimalizácia obrázkov (Sharp)

### Fáza 4: Filtrovanie a vyhľadávanie (1-2 dni)
8. ✅ Kategórie a tagy
   - CategoryFilter komponent
   - TagFilter komponent
   - Multi-select tagy
   - Backend filtrovacia logika

9. ✅ Vyhľadávanie
   - Search bar komponent
   - Full-text search v názvoch a ingredienciách
   - Kombinácia filtrov

### Fáza 5: UI/UX vylepšenia (1-2 dni)
10. ✅ Styling
    - Responsive design
    - Tailwind CSS komponenty
    - Dark mode (optional)
    - Loading states & error handling

11. ✅ User experience
    - Toast notifikácie
    - Confirm dialógy
    - Prázdne stavy (empty states)
    - Skeleton loadery

### Fáza 6: Testing a optimalizácia (1-2 dni)
12. ✅ Testovanie
    - Unit testy (backend)
    - Component testy (frontend)
    - E2E testy základných funkcií

13. ✅ Optimalizácia
    - Image lazy loading
    - Code splitting
    - Caching stratégie

## 🚀 Prvé kroky (Quick Start)

### Krok 1: Inicializácia projektu
```bash
# Root package.json s workspaces
npm init -y

# Git inicializácia
git init
```

### Krok 2: Setup Backend
```bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv
npm install -D typescript @types/express @types/cors @types/node ts-node-dev
npx tsc --init
```

### Krok 3: Setup Frontend
```bash
cd ..
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install react-router-dom axios
```

### Krok 4: Vytvorenie základných súborov
- Backend: index.ts, routes, controllers
- Frontend: pages, components, services

### Krok 5: Spustenie dev serverov
```bash
# Backend (port 3000)
cd backend && npm run dev

# Frontend (port 5173)
cd frontend && npm run dev
```

## 🎨 UI/UX Návrh (Wireframe koncept)

### Hlavná stránka (Home)
```
┌─────────────────────────────────────┐
│  Receptár                    [+New] │
├─────────────────────────────────────┤
│  [Search...]                        │
│  [Všetky ▾] [Tagy: All ▾]          │
├─────────────────────────────────────┤
│  ┌────────┐  ┌────────┐  ┌────────┐│
│  │ [img]  │  │ [img]  │  │ [img]  ││
│  │ Guláš  │  │ Palacinky│ │ Šalát ││
│  │ 🏷vege │  │ 🏷veggie │  │ 🏷vegan││
│  │ Obed   │  │ Raňajky  │  │ Večera││
│  └────────┘  └────────┘  └────────┘│
└─────────────────────────────────────┘
```

### Detail receptu
```
┌─────────────────────────────────────┐
│  ← Späť                    [Edit]   │
├─────────────────────────────────────┤
│  Guláš                              │
│  🏷 veggie 🏷 meat                  │
│                                     │
│  [────────────────]                 │
│  │  Recipe Image  │                 │
│  [────────────────]                 │
│                                     │
│  📝 Ingrediencie:                   │
│  • 500g mäso                        │
│  • 2 ks cibuľa                      │
│  • 1 PL paprika                     │
│                                     │
│  👨‍🍳 Postup:                         │
│  1. Nakrájaj cibuľu...              │
│  2. Opraž mäso...                   │
└─────────────────────────────────────┘
```

### Formulár (Create/Edit)
```
┌─────────────────────────────────────┐
│  Nový recept                        │
├─────────────────────────────────────┤
│  Názov: [_________________]         │
│  Kategória: [Obed ▾]                │
│  Tagy: [☑veggie ☐vegan ☑meat]      │
│                                     │
│  Obrázok: [Upload] alebo drag&drop │
│  [────────────────]                 │
│                                     │
│  Ingrediencie:                      │
│  [500] [g] [mäso]           [×]     │
│  [2]   [ks][cibuľa]         [×]     │
│  [+ Pridať ingredienciu]            │
│                                     │
│  Postup:                            │
│  [_____________________________]    │
│  [_____________________________]    │
│  [_____________________________]    │
│                                     │
│  [Zrušiť]              [Uložiť]     │
└─────────────────────────────────────┘
```

## 📦 Dependencies

### Backend dependencies
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.3",
    "ts-node-dev": "^2.0.0"
  }
}
```

### Frontend dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "react-hook-form": "^7.48.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.2",
    "lucide-react": "^0.294.0",
    "sonner": "^1.2.0",
    "react-dropzone": "^14.2.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16"
  }
}
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=3000
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## 📖 Ďalšie zdroje

- [React dokumentácia](https://react.dev)
- [Express.js dokumentácia](https://expressjs.com)
- [TypeScript dokumentácia](https://www.typescriptlang.org)
- [Vite dokumentácia](https://vitejs.dev)

## 🤝 Contributing

Pre príspevky do projektu:
1. Vytvor feature branch
2. Commit zmeny s popisnými správami
3. Push do branchu
4. Vytvor Pull Request

## 📄 License

MIT
