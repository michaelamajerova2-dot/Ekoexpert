# 📝 Formulár na pridávanie receptov - Implementácia

## ✅ ČO SOM VYTVORIL

### 1. **RecipeForm komponent**
`frontend/src/components/Recipe/RecipeForm.tsx`

Kompletný formulár s:
- ✅ **React Hook Form** - Správa stavu formulára
- ✅ **Zod validácia** - Validácia všetkých polí
- ✅ **Dynamické ingrediencie** - Pridávanie/odoberanie ingrediencií
- ✅ **Multi-select tagy** - Výber viacerých tagov
- ✅ **Toast notifikácie** - Feedback po uložení
- ✅ **API integrácia** - Ukladanie do backendu
- ✅ **Moderný dizajn** - Tailwind CSS styling

### 2. **Validačná schéma**
`frontend/src/schemas/recipeSchema.ts`

Zod schéma s validáciou pre:
- Názov (min 3 znaky)
- Kategória (povinná)
- Tagy (min 1)
- Ingrediencie (min 1)
- Postup (min 10 znakov)
- URL obrázka (validácia URL)

### 3. **Toast notifikácie**
`frontend/src/App.tsx`

Pridaný Toaster z `sonner` pre:
- ✅ Success správy
- ❌ Error správy
- Zobrazenie v pravom hornom rohu

## 🎨 AKO VYZERÁ FORMULÁR

### Sekcie:

1. **📋 Základné informácie**
   - Názov receptu *
   - Krátky popis
   - Kategória * (dropdown)
   - Časy (príprava, varenie)
   - Porcie
   - Náročnosť
   - URL obrázka

2. **🏷️ Tagy** *
   - Multi-select tlačidlá
   - 10 preddefinovaných tagov
   - Vizuálny feedback (zelené = selected)

3. **📝 Ingrediencie** *
   - Dynamický zoznam
   - Polia: Množstvo, Jednotka, Názov, Poznámka
   - Tlačidlo "Pridať ingredienciu"
   - Tlačidlo odstrániť (trash ikona)

4. **👨‍🍳 Postup prípravy** *
   - Veľká textarea
   - Monospace font
   - Placeholder s príkladom

5. **Akčné tlačidlá**
   - Zrušiť (navigácia späť)
   - Uložiť recept (submit)

## 🔧 AKO TO FUNGUJE

### Tok pri ukladaní receptu:

```
1. Užívateľ vyplní formulár
   ↓
2. Klikne "Uložiť recept"
   ↓
3. React Hook Form validuje cez Zod schému
   ↓
4. Ak je validácia OK:
   ↓
5. POST request na /api/recipes
   ↓
6. Backend uloží do recipes.json
   ↓
7. Toast notifikácia: "Recept bol úspešne pridaný!"
   ↓
8. Navigácia na hlavnú stránku
   ↓
9. Nový recept sa zobrazí v zozname
```

### Príklad validácie:

```typescript
// Názov musí mať min 3 znaky
title: z.string().min(3, 'Názov musí mať aspoň 3 znaky')

// Kategória je povinná
category: z.nativeEnum(RecipeCategory)

// Aspoň jeden tag
tags: z.array(z.string()).min(1, 'Vyberte aspoň jeden tag')

// Aspoň jedna ingrediencia
ingredients: z.array(ingredientSchema).min(1, 'Pridajte aspoň jednu ingredienciu')
```

## 🎯 AKO TO VYSKÚŠAŤ

### 1. Otvor aplikáciu:
http://localhost:5173

### 2. Klikni na "Nový recept" (zelené tlačidlo vpravo hore)

### 3. Vyplň formulár:

**Príklad receptu:**
- **Názov:** Zemiakové placky
- **Popis:** Chrumkavé zemiakové placky s kyslou smotanou
- **Kategória:** Obed
- **Čas prípravy:** 15 min
- **Čas varenia:** 20 min
- **Porcie:** 4
- **Náročnosť:** Ľahké
- **Obrázok:** https://images.unsplash.com/photo-1568158879083-c42860933ed7?w=800
- **Tagy:** veggie, traditional, quick
- **Ingrediencie:**
  - 500 g zemiaky (nastrúhané)
  - 100 g múka (hladká)
  - 2 ks vajcia
  - 1 štipka soľ
- **Postup:**
  ```
  1. Nastrúhaj zemiaky na jemno
  2. Pridaj múku, vajcia a soľ
  3. Zmiešaj na cesto
  4. Smaž na panvici do zlatista
  5. Podávaj s kyslou smotanou
  ```

### 4. Klikni "Uložiť recept"

### 5. Uvidíš toast: ✅ "Recept bol úspešne pridaný!"

### 6. Budeš presmerovaný na hlavnú stránku

### 7. Tvoj nový recept sa zobrazí v zozname! 🎉

## 📁 SÚBORY KTORÉ SOM VYTVORIL/UPRAVIL

### Nové súbory:
- `frontend/src/schemas/recipeSchema.ts` - Zod validačná schéma
- `frontend/src/components/Recipe/RecipeForm.tsx` - Formulár komponent

### Upravené súbory:
- `frontend/src/pages/CreateRecipe.tsx` - Pridaný RecipeForm
- `frontend/src/App.tsx` - Pridaný Toaster
- `frontend/package.json` - Pridaná uuid závislost

## 🎨 DIZAJN FEATURES

### Validačné chyby:
- Červený border na chybných poliach
- Červený text pod poliami s chybou
- Real-time validácia

### UX detaily:
- Disabled submit button počas odosielania
- "Ukladám..." text pri odosielaní
- Smooth transitions
- Hover efekty
- Focus states (zelený ring)

### Responzivita:
- Mobile: 1 stĺpec
- Desktop: Grid 4 stĺpce pre časy/porcie
- Touch-friendly targets

## 🔮 ČO MÔŽEŠ PRIDAŤ NESKÔR

### Fáza 4 (Voliteľné rozšírenia):
- [ ] **Drag & drop upload obrázkov** (namiesto URL)
- [ ] **Image preview** po zadaní URL
- [ ] **Markdown editor** s preview pre postup
- [ ] **Auto-save** draft každých 30s
- [ ] **Edit mode** - úprava existujúcich receptov
- [ ] **Delete** - mazanie receptov s confirm dialogom
- [ ] **Duplikácia** receptu
- [ ] **Import** receptu z URL (web scraping)

## 💾 AKO SÚ RECEPTY ULOŽENÉ

### Backend:
```
backend/src/data/recipes.json
```

Keď pridáš nový recept:
1. Backend načíta recipes.json
2. Pridá nový recept do array
3. Zapíše array späť do súboru
4. Vráti vytvorený recept s ID

### Príklad JSON:
```json
{
  "id": "auto-generated-uuid",
  "title": "Zemiakové placky",
  "description": "Chrumkavé...",
  "category": "lunch",
  "tags": ["veggie", "traditional"],
  "ingredients": [...],
  "instructions": "1. ...",
  "createdAt": "2025-11-20T...",
  "updatedAt": "2025-11-20T..."
}
```

## ✅ TESTOVANÉ

- ✅ Vytvorenie nového receptu
- ✅ Validácia všetkých polí
- ✅ Dynamické pridávanie ingrediencií
- ✅ Multi-select tagy
- ✅ Toast notifikácie
- ✅ Navigácia po uložení
- ✅ Zobrazenie nového receptu v zozname
- ✅ API integrácia

## 🎉 HOTOVO!

Formulár je **plne funkčný** a pripravený na používanie!

Otvor: http://localhost:5173 a klikni na "Nový recept"! 🚀
