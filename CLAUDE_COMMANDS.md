# 🤖 Claude príkazy na správu serverov

Vytvoril som skripty, ktoré môžem používať na spúšťanie a zastavovanie serverov za teba!

## ✅ Riešenie PATH problému

Vytvoril som wrapper skripty v `scripts/` adresári, ktoré automaticky:
- Nastavujú správnu PATH cestu k Node.js
- Spúšťajú servery na pozadí
- Zapisujú logy do súborov

## 🎮 Príkazy ktoré môžem používať

### 🚀 Spustiť servery

```bash
./scripts/start-all.sh
```

Toto spustí:
- ✅ Backend na porte 3000
- ✅ Frontend na porte 5173
- ✅ Oboje beží na pozadí

### 📊 Skontrolovať stav

```bash
./scripts/check-status.sh
```

Ukáže mi:
- Či backend beží (PID, port)
- Či frontend beží (PID, port)
- Status oboch serverov

### ⏹️ Zastaviť servery

```bash
./scripts/stop-servers.sh
```

Zastaví všetky servery.

### 🔄 Reštartovať servery

```bash
./scripts/restart-servers.sh
```

Zastaví a znova spustí servery (užitočné po zmenách v kóde).

## 📋 Logy

Logy sa zapisujú do:
- **Backend:** `/tmp/receptar-backend.log`
- **Frontend:** `/tmp/receptar-frontend.log`

Môžem ich sledovať príkazom:

```bash
tail -f /tmp/receptar-backend.log
tail -f /tmp/receptar-frontend.log
```

## ✅ Aktuálny stav

**Servery BEŽIA!** 🎉

- ✅ Backend: http://localhost:3000 (PID: 22206)
- ✅ Frontend: http://localhost:5173 (PID: 22228)

**Otvor prehliadač:** http://localhost:5173

## 🎯 Čo teraz môžeš urobiť

1. **Otvor http://localhost:5173** - Uvidíš Receptár s 6 receptami
2. **Vyskúšaj funkcie:**
   - Klikni na recept → Detail
   - Vyfiltruj kategórie (Raňajky, Obed, Večera...)
   - Vyfiltruj tagy (vegan, meat, fish...)
   - Vyhľadávaj "šalát" alebo "guláš"
3. **Daj mi vedieť čo ďalej** - Môžeme začať pridávať ďalšie funkcie!

## 💬 Ako to používať v konverzácii

Jednoducho mi napíš:
- **"Spusti servery"** → Spustím `./scripts/start-all.sh`
- **"Zastav servery"** → Spustím `./scripts/stop-servers.sh`
- **"Reštartuj servery"** → Spustím `./scripts/restart-servers.sh`
- **"Skontroluj stav"** → Spustím `./scripts/check-status.sh`

A ja to urobím za teba! 🚀

## 📁 Štruktúra skriptov

```
scripts/
├── start-backend.sh     # Spustí len backend
├── start-frontend.sh    # Spustí len frontend
├── start-all.sh         # Spustí oboje
├── stop-servers.sh      # Zastaví všetko
├── restart-servers.sh   # Reštart
└── check-status.sh      # Status check
```

Všetky skripty majú nastavenou správnu PATH a fungujú! ✅
