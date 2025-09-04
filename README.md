# Echo Tutorial – Monorepo

Monorepo basierend auf Turborepo und pnpm mit zwei Next.js 15 Apps (Web & Widget), einem gemeinsamen UI-Paket (shadcn/ui-basiert) sowie einem Convex Backend. Authentifizierung ist für die Web-App via Clerk vorbereitet.

- Apps
  - apps/web – Haupt-Webapp (Next.js 15, React 19)
  - apps/widget – Embeddable Widget App (Next.js 15, React 19)
- Packages
  - packages/ui – Zentrales UI-Paket (shadcn/ui, Radix, TailwindCSS 4)
  - packages/backend – Convex Backend (Funktionen/Serverlogik)
  - packages/eslint-config – Zentrale ESLint-Konfiguration
  - packages/typescript-config – Zentrale TS-Konfiguration


## Voraussetzungen
- Node.js >= 20
- pnpm (getestet mit pnpm 10)
- Optional: Convex CLI (für lokales Backend) – wird über Skripte aufgerufen


## Schnellstart
1) Abhängigkeiten installieren

```bash
pnpm install
```

2) Umgebungsvariablen einrichten (siehe Abschnitt „Umgebungsvariablen“)

3) Entwicklung starten (alle relevanten Prozesse via Turborepo)

```bash
pnpm dev
```

- Web-App läuft standardmäßig auf http://localhost:3000
- Widget-App läuft standardmäßig auf http://localhost:3001
- Convex-Entwicklungssession wird über das Backend-Package gestartet

Einzelne Apps/Packages gezielt starten:

```bash
# Nur Web-App
pnpm --filter web dev

# Nur Widget-App
pnpm --filter widget dev

# Nur Backend (Convex)
pnpm --filter @workspace/backend dev
```

Build (Monorepo-weit):

```bash
pnpm build
```

Lint & Format:

```bash
pnpm lint
pnpm format
```


## Umgebungsvariablen
Die Projektteile erwarten verschiedene Variablen. Lege pro App/Package eine `.env.local` im jeweiligen Verzeichnis an.

Beispiele (Platzhalter verwenden, keine Secrets committen):

- apps/web/.env.local

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://<your-convex-deployment>.convex.cloud

# Clerk
NEXT_PUBLIC_CLERK_FRONTEND_API_URL=https://<your-clerk-subdomain>.clerk.accounts.dev
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

- apps/widget/.env.local

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://<your-convex-deployment>.convex.cloud
```

- packages/backend/.env.local

```bash
# Convex Deployment used by `pnpm --filter @workspace/backend dev`
CONVEX_DEPLOYMENT=dev:<your-convex-slug>
CONVEX_URL=https://<your-convex-deployment>.convex.cloud

# Clerk
CLERK_JWT_ISSUER_DOMAIN=https://<your-clerk-subdomain>.clerk.accounts.dev
```

Hinweise:
- Die Web-App nutzt Clerk (Frontend und Server-Secret). Stelle sicher, dass alle Clerk-Variablen korrekt gesetzt sind.
- Convex wird sowohl im Backend-Package (Server) als auch in den Apps (Client) verwendet. `NEXT_PUBLIC_CONVEX_URL` muss in den Apps verfügbar sein.


## Repository-Struktur
- apps/
  - web/ – Next.js App (Port 3000)
  - widget/ – Next.js App (Port 3001)
- packages/
  - ui/ – Zentrale UI-Bibliothek (shadcn/ui, TailwindCSS 4)
  - backend/ – Convex Backend (Serverfunktionen)
  - eslint-config/ – Shared ESLint-Konfiguration
  - typescript-config/ – Shared TS-Konfiguration
- turbo.json – Turborepo Pipeline-Konfiguration
- pnpm-workspace.yaml – pnpm Workspace-Konfiguration


## Tech-Stack
- Next.js 15, React 19 (Apps)
- Convex (Backend/Serverfunktionen)
- Clerk (Auth in der Web-App)
- shadcn/ui + Radix UI + TailwindCSS 4 (im UI-Package)
- TypeScript, ESLint, Prettier
- Turborepo (Tasks & Caching)
- pnpm (Workspaces & Paketverwaltung)


## UI-Komponenten (shadcn/ui)
Die Komponenten leben zentral im Package `packages/ui` und werden von den Apps konsumiert.

Verwendung in einer App:

```tsx
import { Button } from "@workspace/ui/components/button"
```

Komponenten hinzufügen/generieren (Beispiel):

```bash
# Beispiel: Button-Komponente ins UI-Package hinzufügen
pnpm dlx shadcn@latest add button -c packages/ui
```

Tailwind ist im UI-Package konfiguriert. Die Apps sind so eingerichtet, dass sie Styles aus dem UI-Package konsumieren können.


## Backend (Convex)
- Entwicklungsstart: `pnpm --filter @workspace/backend dev`
- Server-Funktionen liegen unter `packages/backend/convex`
- Exporte werden über das `exports`-Feld des Packages bereitgestellt (z. B. `@workspace/backend/convex`)

Stelle sicher, dass `CONVEX_DEPLOYMENT` und `CONVEX_URL` in `packages/backend/.env.local` gesetzt sind. Für lokale Entwicklung reicht in der Regel `convex dev` (wird vom Skript ausgeführt).


## Authentifizierung (Clerk)
- Die Web-App verwendet Clerk. Für lokale Entwicklung benötigst du die `PUBLISHABLE_KEY` und `SECRET_KEY` sowie die `FRONTEND_API_URL`.
- Achte darauf, die Clerk-Domain-URL (Issuer) im Backend korrekt zu setzen, damit Serverfunktionen JWTs validieren können (`CLERK_JWT_ISSUER_DOMAIN`).


## Nützliche Skripte
Root-Skripte (siehe `package.json` im Root):
- `pnpm dev` – Startet alle Dev-Tasks via Turborepo
- `pnpm build` – Baut alle Projekte
- `pnpm lint` – Lint über alle Pakete/Apps
- `pnpm format` – Prettier Write über relevante Dateien

App-/Package-spezifische Skripte:
- Web-App: `pnpm --filter web dev|build|start|lint|typecheck`
- Widget-App: `pnpm --filter widget dev|build|start|lint|typecheck`
- Backend: `pnpm --filter @workspace/backend dev`


## Ports & Konflikte
- web: 3000
- widget: 3001

Bei Port-Konflikten die `dev`-Skripte in den jeweiligen `package.json`-Dateien anpassen (`--port <PORT>`), z. B. in `apps/web/package.json`.


## Deployment (Überblick)
- Next.js Apps: z. B. Vercel (oder andere Next-kompatible Plattformen). Stelle die nötigen Umgebungsvariablen im Zielsystem bereit.
- Convex: Über Convex Cloud deployen. Die resultierende `CONVEX_URL` in den Apps eintragen.
- Clerk: Projekt & Umgebungen (Development/Production) in Clerk konfigurieren und die Keys/Domains setzen.

Build-Befehle:

```bash
# App-spezifisch
pnpm --filter web build
pnpm --filter widget build

# Monorepo-weit
pnpm build
```

Start (Production):

```bash
pnpm --filter web start
pnpm --filter widget start
```


## Code-Qualität & Konventionen
- ESLint: Zentrale Regeln unter `packages/eslint-config`
- TypeScript: Gemeinsame TS-Configs unter `packages/typescript-config`
- Prettier: Root-Konfiguration mit `pnpm format`


## Häufige Probleme
- Falsche Node-Version: Stelle sicher, dass Node >= 20 installiert ist.
- Fehlende `.env.local`: Ohne gültige Variablen schlagen Build/Runtime-Aufrufe ggf. fehl.
- Port-Konflikte: Siehe Abschnitt „Ports & Konflikte“.
- Convex/Clerk: Prüfe URL-, Domain- und Key-Konfigurationen sorgfältig für jede Umgebung.


## Lizenz
Dieses Repository ist proprietär. Interne Verwendung vorbehalten.
