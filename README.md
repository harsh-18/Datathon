# CrimeLens Karnataka

**KSP Datathon 2026 Submission** | **Problem Statement 2: AI-Driven Crime Analytics & Visualization Platform**  
**Project Name**: CrimeLens Karnataka  
**Zoho Catalyst Project**: `CrimeLens-Karnataka`  
**Target Organization**: Karnataka State Police (KSP) / State Crime Records Bureau (SCRB)  
**Deployment Target**: Zoho Catalyst (Web Client Hosting & Serverless Functions)  
**GitHub Repository**: [https://github.com/harsh-18/Datathon](https://github.com/harsh-18/Datathon)  

> **"CrimeLens Karnataka"** is a Catalyst-powered AI crime analytics and visualization platform for Karnataka State Police. It transforms fragmented crime records into interactive dashboards, hotspot maps, offender profiles, criminal network graphs, and explainable risk alerts to support proactive, evidence-based policing.

---

## 📄 Comprehensive Table of Contents
1. [Project Title & Problem Statement](#1-project-title--problem-statement)
2. [Problem Selection Rationale](#2-problem-selection-rationale)
3. [Solution Overview](#3-solution-overview)
4. [Key Implemented Features](#4-key-implemented-features)
5. [Architecture & Design Principles](#5-architecture--design-principles)
6. [Folder Structure Explanation](#6-folder-structure-explanation)
7. [Zoho Catalyst Services Utilized](#7-zoho-catalyst-services-utilized)
8. [Local Setup Guide](#8-local-setup-guide)
9. [Catalyst CLI Setup Guide](#9-catalyst-cli-setup-guide)
10. [Environment Variables](#10-environment-variables)
11. [How to Run Locally](#11-how-to-run-locally)
12. [How to Deploy on Catalyst](#12-how-to-deploy-on-catalyst)
13. [API Endpoint Documentation](#13-api-endpoint-documentation)
14. [Data Model Explanation](#14-data-model-explanation)
15. [Risk Scoring Methodology](#15-risk-scoring-methodology)
16. [Demo Workflow & Presentation Guide](#16-demo-workflow--presentation-guide)
17. [Troubleshooting Guide](#17-troubleshooting-guide)
18. [Future Enhancements](#18-future-enhancements)
19. [Catalyst Data Store Migration Plan](#19-catalyst-data-store-migration-plan)
20. [Documentation Index & Links](#20-documentation-index--links)

---

## 1. Project Title & Problem Statement
- **Project Title**: CrimeLens Karnataka
- **Zoho Catalyst Project**: `CrimeLens-Karnataka`
- **Chosen Challenge**: Problem Statement 2 - AI-Driven Crime Analytics & Visualization Platform
- **Host Organization**: Karnataka State Police (KSP) / State Crime Records Bureau (SCRB)

---

## 2. Problem Selection Rationale
Currently, crime records across Karnataka police stations are managed in fragmented silos, leading to reliance on manual Excel reporting. This reactive approach makes it difficult for SCRB analysts and station SHOs to spot cross-border crime spikes, track repeat offenders operating across district boundaries, or dispatch early patrols to emerging hotspots.

We selected Problem Statement 2 to build **CrimeLens Karnataka** — a modern, state-of-the-art visual analytics platform that transforms static FIR records into proactive, evidence-based policing capabilities.

---

## 3. Solution Overview
**CrimeLens Karnataka** is a high-contrast operational command dashboard designed for police leadership, SCRB analysts, and field investigators. Built for **Zoho Catalyst** (Project: `CrimeLens-Karnataka`), it combines geospatial hotspot maps, criminal network link graphs, spatiotemporal trend analysis, and explainable AI risk scoring into a unified decision support system.

---

## 4. Key Implemented Features
1. **Executive Overview Dashboard**: Real-time state KPIs, top crime distributions, crime spike alert banner, and recent FIR feed.
2. **District & Station Analytics**: Drill-down across 10 Karnataka districts with station counts and MoM crime growth.
3. **Geospatial Hotspot Map**: Interactive dark Leaflet map of Karnataka with color-coded severity markers and recommended tactical police actions.
4. **Spatiotemporal Trend Analysis**: Monthly crime trajectories, 24-hour time-of-day peak incident distribution, and automated analytical callouts.
5. **Criminal Network & Link Graph**: Interactive SVG network graph connecting Suspects, FIR Cases, Locations, and Modus Operandi (MO) signatures with an inspector side panel.
6. **Repeat & Habitual Offender Profiles**: Intelligence cards tracking active jurisdictions, linked FIR numbers, known associates, MO tags, and SCRB advisories.
7. **Explainable AI Predictive Risk Engine**: Interactive risk calculation engine allowing analysts to adjust factor weights (Spike %, Repeat Offender Weight, Night Crime Weight, Socio Index) with clear explanation factors.
8. **Anomaly & Emerging Trend Alerts**: Emergency alert feed highlighting multi-station FIR spikes, trojan APK phishing clusters, and highway cargo gangs.
9. **Socio-Demographic Correlations**: Analytical correlation cards mapping urbanization, economic stress, migration, and unemployment against specific crime types.
10. **Natural Language "Ask Crime Data"**: Natural language query input box with instant intelligence synthesis cards.

---

## 5. Architecture & Design Principles
The codebase strictly adheres to **SOLID design principles** and maintainable software engineering practices:
- **Single Responsibility**: Components, services, controllers, and repositories perform focused tasks.
- **Controller-Service-Repository Pattern**: Backend HTTP logic is decoupled from business analytics and data access layers.
- **Feature-Based Frontend Architecture**: Frontend views are organized by feature domain.
- **Interface & Storage Abstraction**: Local JSON seed access is isolated inside repository modules, enabling seamless future migration to **Catalyst Data Store**.

---

## 6. Folder Structure Explanation

```
Datathon/
├── catalyst.json                 # Zoho Catalyst configuration
├── .catalystrc                   # Catalyst CLI project configuration
├── Police_FIR_ER_Diagram.pdf     # Official Karnataka Police Department Database Schema
├── PROTOTYPE_BRIEF.md            # Evaluator prototype brief document
├── README.md                     # Central technical documentation
├── docs/                         # Comprehensive Engineering Documentation Suite
│   ├── ARCHITECTURE.md           # System architecture & design patterns
│   ├── API.md                    # Complete API endpoint specification
│   ├── DATA_MODEL.md             # Entity schemas & ER diagram mapping
│   ├── CATALYST_DEPLOYMENT.md    # Zoho Catalyst deployment guide
│   ├── DEMO_SCRIPT.md            # 3 to 5-minute judge demo script
│   └── DEVELOPMENT_GUIDE.md      # Developer extension & contribution guide
├── functions/                    # Zoho Catalyst Serverless Functions
│   └── ksp_api/                  # Node.js Express backend function
│       ├── package.json
│       ├── index.js              # Catalyst entry point
│       ├── catalyst-config.json
│       ├── tests/                # Automated backend sanity test suite
│       └── src/
│           ├── app.js            # Express app assembly & error middleware
│           ├── routes/           # 10 Route modules
│           ├── controllers/      # 10 Controller modules
│           ├── services/         # 6 Analytics logic services
│           ├── repositories/     # 3 Repository data access layers
│           ├── constants/        # Domain constants
│           └── utils/            # Response, error, & filter utilities
└── client/                       # Frontend SPA (React + Vite + Leaflet + Recharts)
    ├── package.json
    ├── client-package.json       # Catalyst web client manifest
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── app/                  # Layout shell (App.jsx)
        ├── features/             # 10 Feature Modules (overview, districts, hotspots, etc.)
        ├── shared/               # Shared components, services, constants, & CSS
        └── main.jsx              # React mounting entry point
```

---

## 7. Zoho Catalyst Services Utilized
- **Catalyst Web Client Hosting**: Serves the static React SPA frontend (`client/dist`).
- **Catalyst Serverless Express Functions**: Hosts the Node.js API (`functions/ksp_api`) under `/server/ksp_api/api/`.
- **Catalyst API Gateway**: Handles API routing, security, and rate limiting.
- **Catalyst Data Store** *(Future Migration Target)*: Mapped directly from `Police_FIR_ER_Diagram.pdf`.
- **Catalyst QuickML & RAG** *(Future Enhancement)*: Vector indexing for natural language FIR search.

---

## 8. Local Setup Guide
```bash
# Clone Repository
git clone https://github.com/harsh-18/Datathon.git
cd Datathon

# Install & Build Frontend
cd client
npm install
npm run build
cd ..

# Install Backend Dependencies
cd functions/ksp_api
npm install
node tests/sanity.test.js
```

---

## 9. Catalyst CLI Setup Guide
```bash
npm install -g zcatalyst-cli
catalyst login
catalyst project:use 42972000000042001
```

---

## 10. Environment Variables
No third-party API keys or external server dependencies are required! The platform runs zero-config using Catalyst native endpoints and local seed fallbacks.

---

## 11. How to Run Locally
```bash
# Run React Client Development Server (Port 5173)
cd client
npm run dev

# (Optional) Run Backend API Standalone (Port 3000)
cd functions/ksp_api
node index.js
```

---

## 12. How to Deploy on Catalyst
```bash
# Build client bundle
cd client && npm run build && cd ..

# Run Catalyst local emulator
catalyst serve

# Deploy to Catalyst Cloud
catalyst deploy
```

---

## 13. API Endpoint Documentation
Detailed request/response contracts are available in [docs/API.md](docs/API.md).
- `GET /api/overview` - State KPIs & recent FIRs
- `GET /api/districts` - Karnataka district list
- `GET /api/cases` - Registered FIR cases with filters
- `GET /api/hotspots` - Geospatial hotspot markers
- `GET /api/trends` - Spatiotemporal trend analysis
- `GET /api/network` - Criminal link graph nodes & edges
- `GET /api/offenders` - Habitual offender profiles
- `GET /api/alerts` - Anomaly alerts
- `GET /api/socio-insights` - Socio-demographic correlations
- `POST /api/query` - Natural language query matching

---

## 14. Data Model Explanation
Entity schemas for `CaseMaster`, `District`, `Accused`, `Victim`, and `Alert` are documented in [docs/DATA_MODEL.md](docs/DATA_MODEL.md).

---

## 15. Risk Scoring Methodology
Risk scores (0 - 100) are dynamically calculated by `riskScoring.service.js` using weighted attribution:
- **MoM Crime Spike %**: 30% Weight
- **Repeat Offender Density**: 25% Weight
- **Night Incident Ratio**: 20% Weight
- **Socio-Economic Stress Index**: 25% Weight

---

## 16. Demo Workflow & Presentation Guide
A complete 3 to 5-minute judge demonstration script is provided in [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md).

---

## 17. Troubleshooting Guide
- **Vite Build Error**: Ensure `npm run build` is run inside `client/`.
- **Catalyst Serve Error**: Verify `.catalystrc` is linked using `catalyst project:use`.
- **Port Conflict**: Default dev ports are 5173 (Vite) and 3000 (Express/Catalyst).

---

## 18. Future Enhancements
- **Catalyst Authentication**: Role-based access control for SHOs and SCRB Chiefs.
- **Catalyst QuickML**: LLM/RAG vector search across scanned FIR brief facts.
- **Catalyst SmartBrowz**: Automated PDF daily police briefing packet generation.

---

## 19. Catalyst Data Store Migration Plan
Replacing synthetic seed data with **Catalyst Data Store** requires modifying *only* the repository files in `functions/ksp_api/src/repositories/` to execute ZCQL queries. All controllers, services, and UI components remain 100% unchanged.

---

## 20. Documentation Index & Links
- 📘 [ARCHITECTURE.md](docs/ARCHITECTURE.md) — System design & layer patterns
- 📗 [API.md](docs/API.md) — Endpoint contracts & sample JSONs
- 📙 [DATA_MODEL.md](docs/DATA_MODEL.md) — KSP Database ER diagram mapping
- 📕 [CATALYST_DEPLOYMENT.md](docs/CATALYST_DEPLOYMENT.md) — Step-by-step Catalyst deployment guide
- 📓 [DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) — 3-5 minute hackathon judge presentation script
- 📓 [DEVELOPMENT_GUIDE.md](docs/DEVELOPMENT_GUIDE.md) — Codebase contribution & extension guide

---

## 📄 License
Licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.  
Copyright (c) 2026 **Harsh Verma**.
