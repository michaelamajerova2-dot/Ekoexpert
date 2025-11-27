# Receptár - UI/UX Design Guide

## 🎨 Dizajnová Koncepcia

Moderný, čistý a prehľadný dizajn s dôrazom na:
- **Jednoduchosť** - intuitívne ovládanie bez zbytočných prvkov
- **Vizuálnu príťažlivosť** - veľké fotky jedál, príjemné farby
- **Responzivitu** - perfektne fungovať na mobile aj desktope
- **Rýchlosť** - okamžitá odozva, smooth transitions

## 🎯 Design Principles

1. **Content First** - Fotky jedál sú hlavný vizuálny prvok
2. **Minimalizmus** - Čisté biele pozadie, vzdušný layout
3. **Accessibility** - Dobré kontrasty, čitateľné fonty
4. **Intuitivita** - Všetko tam kde to používateľ očakáva

## 🖌️ Color Palette

### Hlavné farby
```css
/* Primárna farba - teplá zelená (eko téma) */
--primary-50:  #f0fdf4;
--primary-100: #dcfce7;
--primary-500: #22c55e;  /* Hlavná akcentová */
--primary-600: #16a34a;
--primary-700: #15803d;

/* Sekundárna - oranžová (teplá, jedlo) */
--secondary-500: #f97316;
--secondary-600: #ea580c;

/* Neutrálne */
--gray-50:  #fafafa;
--gray-100: #f5f5f5;
--gray-200: #e5e5e5;
--gray-300: #d4d4d4;
--gray-500: #737373;
--gray-700: #404040;
--gray-900: #171717;

/* Semantické farby */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;
```

### Kategórie - farebné odlíšenie
```css
--breakfast: #fbbf24;  /* Žltá - raňajky */
--lunch:     #3b82f6;  /* Modrá - obed */
--dinner:    #8b5cf6;  /* Fialová - večera */
--snack:     #ec4899;  /* Ružová - desiata */
--dessert:   #f97316;  /* Oranžová - dezert */
```

## 📐 Layout Structure

### Desktop (1200px+)
```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                                 │
├────────────┬────────────────────────────────────────────┤
│            │                                            │
│  SIDEBAR   │           MAIN CONTENT                     │
│  (Filters) │           (Recipe Grid)                    │
│            │                                            │
│  240px     │           Flexible                         │
└────────────┴────────────────────────────────────────────┘
```

### Tablet (768px - 1199px)
```
┌─────────────────────────────────────────┐
│  NAVBAR                                 │
├─────────────────────────────────────────┤
│  FILTERS (Collapsible)                  │
├─────────────────────────────────────────┤
│                                         │
│  MAIN CONTENT                           │
│  (Recipe Grid - 2 columns)              │
│                                         │
└─────────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌─────────────────┐
│  NAVBAR         │
│  [☰] Receptár   │
├─────────────────┤
│  [Search...]    │
│  [Filters ▾]    │
├─────────────────┤
│                 │
│  RECIPE CARDS   │
│  (1 column)     │
│                 │
└─────────────────┘
```

## 🧭 Navigation Bar (Navbar)

### Desktop Navbar
```
┌──────────────────────────────────────────────────────────────┐
│  🍳 Receptár        [Search receptov...]        [+ Nový]  👤 │
└──────────────────────────────────────────────────────────────┘
```

**Prvky:**
- **Logo + Názov** (ľavá strana)
  - Ikona: 🍳 alebo vlastné logo
  - Názov: "Receptár" / "Moje Recepty"
  - Kliknuteľné → Home

- **Search Bar** (stred)
  - Výrazný, široký (400-600px)
  - Placeholder: "Hľadaj recepty, ingrediencie..."
  - Ikona 🔍 vľavo
  - Live search suggestions

- **Primary Actions** (pravá strana)
  - Tlačidlo "+ Nový recept" (primárna farba)
  - User avatar/menu (budúce)

### Mobile Navbar
```
┌──────────────────────────────────┐
│  [☰]  🍳 Receptár      [🔍] [+]  │
└──────────────────────────────────┘
```

**Prvky:**
- Hamburger menu [☰] (filters)
- Logo + názov (stred)
- Search ikona [🔍] (otvára search)
- Add button [+] (nový recept)

## 📱 Sidebar (Desktop)

```
┌────────────────────────┐
│  🔍 Vyhľadávanie       │
│  [Search...]           │
│                        │
│  📂 Kategórie          │
│  ○ Všetky (125)        │
│  ○ Raňajky (24)        │
│  ○ Obed (48)           │
│  ○ Večera (39)         │
│  ○ Desiata (8)         │
│  ○ Dezert (6)          │
│                        │
│  🏷️ Tagy               │
│  [vegan] [veggie]      │
│  [meat] [fish]         │
│  [quick] [healthy]     │
│  [gluten-free]         │
│                        │
│  ⏱️ Čas prípravy       │
│  ☐ Do 15 min           │
│  ☐ 15-30 min           │
│  ☐ 30-60 min           │
│  ☐ Nad 60 min          │
│                        │
│  [Vyčistiť filtre]     │
└────────────────────────┘
```

**Vlastnosti:**
- Sticky position (zostáva pri scrollovaní)
- Svetlé pozadie (gray-50)
- Jemné tiene
- Collapse na tablet/mobile

## 🎴 Recipe Card Design

### Grid Layout
```css
/* Desktop: 3-4 stĺpce */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 24px;

/* Tablet: 2-3 stĺpce */
grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
gap: 20px;

/* Mobile: 1 stĺpec */
grid-template-columns: 1fr;
gap: 16px;
```

### Karta Receptu - Variant A (Odporúčaný)
```
┌─────────────────────────────┐
│                             │
│      [Recipe Image]         │
│      (16:9 aspect)          │
│                             │
├─────────────────────────────┤
│  🏷️vegan  🏷️quick          │
│                             │
│  Guláš s haluškami          │ ← Bold, väčší font
│  🕐 30 min  👨‍🍳 Stredné      │ ← Menší, gray
│                             │
│  Tradičný slovenský...      │ ← Krátky popis (2 riadky)
│                             │
│  [👁️ Detail]  [✏️]  [❤️ 12] │ ← Akcie
└─────────────────────────────┘
```

**Vlastnosti:**
- Hover efekt: mierne zdvihnutie (transform: translateY(-4px))
- Shadow: rozmazaný tieň pri hoveri
- Border radius: 12px
- Obrázok: object-fit: cover, lazy loading
- Smooth transitions (200ms)

### Karta Receptu - Variant B (Minimalistická)
```
┌─────────────────────────────┐
│                             │
│                             │
│      [Recipe Image]         │
│      (1:1 aspect)           │
│                             │
│  Guláš s haluškami          │
│  🏷️vegan  30 min            │
└─────────────────────────────┘
```

## 📄 Recipe Detail Page

### Layout
```
┌──────────────────────────────────────────────────────┐
│  ← Späť                           [✏️ Edit] [🗑️ Zmazať]│
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │                                              │   │
│  │         [Hero Image - veľká fotka]          │   │
│  │              (16:9, max 1200px)             │   │
│  │                                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Guláš s haluškami                                   │ ← H1
│  🏷️ vegan  🏷️ veggie  🏷️ quick                      │
│                                                      │
│  ⏱️ Príprava: 15 min  👨‍🍳 Varenie: 30 min  🍽️ 4 porcie│
│  📊 Náročnosť: Stredná                               │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  [TAB: Ingrediencie] [TAB: Postup] [TAB: Info]      │
│                                                      │
│  ┌─────────────────────┐  ┌─────────────────────┐  │
│  │ 📝 Ingrediencie     │  │ 👨‍🍳 Postup          │  │
│  │                     │  │                     │  │
│  │ ☐ 500g mäso        │  │ 1. Nakrájaj        │  │
│  │ ☐ 2 ks cibuľa      │  │    cibuľu na       │  │
│  │ ☐ 1 PL paprika     │  │    kocky...        │  │
│  │ ☐ 300ml voda       │  │                     │  │
│  │ ☐ soľ, korenie     │  │ 2. Rozohrej        │  │
│  │                     │  │    olej...         │  │
│  │ [📋 Kopírovať]     │  │                     │  │
│  └─────────────────────┘  │ 3. Opraž...        │  │
│                           │                     │  │
│                           │ [✓ Hotovo]         │  │
│                           └─────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

**Vlastnosti:**
- Hero image na celú šírku
- Checkboxy pri ingredienciách (zaškrtávacie)
- Číslované kroky v postupe
- Option na print view
- Share button (budúce)

## ✏️ Create/Edit Recipe Form

### Layout - Multi-step alebo Single page?
**Odporúčam: Single page form s sekciami** (lepšie pre malý počet polí)

```
┌──────────────────────────────────────────────────────┐
│  [✕] Nový recept                     [Uložiť] [Zrušiť]│
├──────────────────────────────────────────────────────┤
│                                                      │
│  📸 Obrázok                                          │
│  ┌────────────────────────────────────────────────┐ │
│  │                                                │ │
│  │        [+] Pridať obrázok                      │ │
│  │     alebo presuň sem (drag & drop)            │ │
│  │                                                │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  📋 Základné informácie                              │
│                                                      │
│  Názov receptu *                                     │
│  [________________________________]                  │
│                                                      │
│  Krátky popis                                        │
│  [________________________________]                  │
│  [________________________________]                  │
│                                                      │
│  Kategória *              Náročnosť                  │
│  [Obed ▾]                [Stredná ▾]                │
│                                                      │
│  ⏱️ Časy (voliteľné)                                 │
│  Príprava: [15] min   Varenie: [30] min   [4] porcie│
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  🏷️ Tagy                                             │
│  [☑ vegan] [☐ veggie] [☑ meat] [☐ fish]            │
│  [☐ gluten-free] [☑ quick] [☐ healthy]             │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  📝 Ingrediencie                                     │
│                                                      │
│  ┌─────┬──────┬───────────────────────────┬────┐   │
│  │ 500 │ g    │ mäso (hovädzie)          │ [×]│   │
│  ├─────┼──────┼───────────────────────────┼────┤   │
│  │ 2   │ ks   │ cibuľa                   │ [×]│   │
│  ├─────┼──────┼───────────────────────────┼────┤   │
│  │ 1   │ PL   │ mletá paprika            │ [×]│   │
│  └─────┴──────┴───────────────────────────┴────┘   │
│                                                      │
│  [+ Pridať ingredienciu]                            │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│  👨‍🍳 Postup prípravy                                 │
│                                                      │
│  [Markdown editor s toolbar]                         │
│  ┌────────────────────────────────────────────────┐ │
│  │ 1. Nakrájaj cibuľu na drobno...              │ │
│  │                                                │ │
│  │ 2. Rozohrej olej na panvici...               │ │
│  │                                                │ │
│  │ 3. Opraž cibuľu do zlatista...               │ │
│  │                                                │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ─────────────────────────────────────────────────  │
│                                                      │
│                       [Zrušiť]  [Uložiť recept]     │
└──────────────────────────────────────────────────────┘
```

**Features:**
- Drag & drop pre obrázok
- Image preview po uploade
- Real-time validácia
- Auto-save (draft) každých 30s
- Markdown preview pre postup
- Dynamické pridávanie ingrediencií

## 🎭 Components Library

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms;
}
.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: white;
  border: 2px solid var(--gray-300);
  color: var(--gray-700);
}

/* Icon Button */
.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Tag/Badge

```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  gap: 4px;
}

.tag-vegan {
  background: #dcfce7;
  color: #15803d;
}

.tag-meat {
  background: #fee2e2;
  color: #dc2626;
}
```

### Input Field

```css
.input {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid var(--gray-200);
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 200ms;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}
```

### Card

```css
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 200ms;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
/* Extra small devices */
@media (min-width: 0px) { }

/* Small devices (phones) */
@media (min-width: 640px) { }

/* Medium devices (tablets) */
@media (min-width: 768px) { }

/* Large devices (desktops) */
@media (min-width: 1024px) { }

/* Extra large devices */
@media (min-width: 1280px) { }

/* 2K screens */
@media (min-width: 1536px) { }
```

## ✨ Interactions & Animations

### Hover Effects
- **Cards:** Zdvihnutie (translateY) + shadow
- **Buttons:** Farba + mierne zdvihnutie
- **Images:** Slight zoom (scale: 1.05)

### Transitions
```css
/* Smooth transitions všade */
transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* Loading skeleton */
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

### Loading States
- **Skeleton screens** pre cards
- **Spinner** pre tlačidlá
- **Progress bar** pre upload

## 🖼️ Typography

```css
/* Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Heading Scale */
h1: 32px / 2rem / font-weight: 700
h2: 24px / 1.5rem / font-weight: 600
h3: 20px / 1.25rem / font-weight: 600
h4: 18px / 1.125rem / font-weight: 600

/* Body */
body: 16px / 1rem / font-weight: 400
small: 14px / 0.875rem / font-weight: 400
tiny: 12px / 0.75rem / font-weight: 400

/* Line height */
headings: 1.2
body: 1.5
```

## 🎯 Empty States

### Žiadne recepty
```
┌─────────────────────────────┐
│                             │
│         🍳                  │
│                             │
│   Zatiaľ žiadne recepty     │
│                             │
│   Pridaj svoj prvý recept   │
│   a začni varovať!          │
│                             │
│   [+ Pridať recept]         │
│                             │
└─────────────────────────────┘
```

### Žiadne výsledky vyhľadávania
```
┌─────────────────────────────┐
│         🔍                  │
│                             │
│   Nenašli sa žiadne recepty │
│                             │
│   Skús iné kľúčové slovo    │
│   alebo filter              │
│                             │
│   [Vyčistiť filtre]         │
└─────────────────────────────┘
```

## 🚨 Error States & Toasts

### Toast Notifications
```
┌─────────────────────────────────┐
│ ✓ Recept bol úspešne uložený!  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ⚠️ Prosím vyplň všetky polia    │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ❌ Nepodarilo sa uložiť recept  │
└─────────────────────────────────┘
```

**Pozícia:** Top-right alebo top-center
**Duration:** 3-5 sekúnd
**Animation:** Slide in from top

## 🎨 Icons

**Odporúčam: Lucide Icons** (React)
- Moderne, čisté
- Lightweight
- Konzistentné
- Open source

```bash
npm install lucide-react
```

**Alternatívy:**
- Heroicons
- Feather Icons
- Phosphor Icons

## 🌙 Dark Mode (Optional - Fáza 2)

```css
/* Light mode (default) */
--bg-primary: white;
--bg-secondary: #fafafa;
--text-primary: #171717;
--text-secondary: #737373;

/* Dark mode */
@media (prefers-color-scheme: dark) {
  --bg-primary: #0a0a0a;
  --bg-secondary: #171717;
  --text-primary: #fafafa;
  --text-secondary: #a3a3a3;
}
```

## 📐 Spacing System

```css
/* Konzistentný spacing */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

## ✅ UX Best Practices

1. **Feedback** - Vždy potvrď akciu (toast, animácia)
2. **Loading** - Ukaž progress pri čakaní
3. **Errors** - Jasné chybové hlášky
4. **Validation** - Real-time validácia formy
5. **Accessibility** - Keyboard navigation, ARIA labels
6. **Performance** - Lazy loading obrázkov
7. **Mobile** - Touch-friendly targets (min 44px)
8. **Consistency** - Rovnaké patterns všade

## 🎬 Micro-interactions

- ✓ Checkbox animation pri zaškrtnutí ingrediencie
- ❤️ Heart animation pri like
- 📋 "Skopírované!" tooltip pri copy
- 🗑️ Confirm modal pri delete
- 📤 Upload progress bar
- ⌛ Skeleton screens pri loadingu

## 📚 Recommended Libraries

### Styling
- **Tailwind CSS** - Utility-first CSS (ODPORÚČANÉ)
- Alternative: Styled Components, CSS Modules

### Components
- **Headless UI** - Accessible components (dropdown, modal...)
- **Radix UI** - Primitives for React
- Alternative: Vlastné komponenty s Tailwind

### Form Management
- **React Hook Form** - Performant forms
- **Zod** - Validation schema

### Image Upload
- **React Dropzone** - Drag & drop upload
- **React Image Crop** - Crop uploaded images

### Toast/Notifications
- **Sonner** - Beautiful toast notifications
- **React Hot Toast** - Minimalist alternative

### Routing
- **React Router v6** - Standard

## 🎨 Figma/Design Mock?

Ak chceš, môžem ti navrhnúť:
- Presné rozmery komponentov
- Detailný design system
- Interaktívny prototyp
- Component library pre React

**Odporúčenie:** Začni s Tailwind CSS a postupne vytváraj komponenty podľa tohto guide. Design môžeš iterovať počas vývoja.

---

**Tento dizajn je:**
- ✅ Moderný a čistý
- ✅ User-friendly
- ✅ Responzívny
- ✅ Accessible
- ✅ Škálovateľný
- ✅ Pripravený na implementáciu
