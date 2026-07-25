# KSP Crime Intelligence & Analytics Platform

**KSP Datathon 2026 Submission** | **Problem Statement 2: AI-Driven Crime Analytics & Visualization Platform**  
**Target Organization**: Karnataka State Police (KSP) / State Crime Records Bureau (SCRB)  
**Deployment Platform**: Zoho Catalyst  
**GitHub Repository**: [https://github.com/harsh-18/Datathon](https://github.com/harsh-18/Datathon)  

---

## 📌 Project Overview
The **KSP Crime Intelligence & Analytics Platform** is a state-of-the-art web application designed to transition Karnataka State Police operations from manual, siloed Excel reporting to a proactive, evidence-based crime intelligence ecosystem.

The platform integrates FIR incident records, offender profiles, geospatial hotspots, and spatiotemporal trends into an operational command dashboard. Built specifically for **Zoho Catalyst**, it leverages Catalyst Web Client Hosting and Serverless Functions to provide SCRB analysts, district supervisors, and field investigators with real-time decision support.

---

## 🌟 Key Features

1. **Executive Overview Dashboard**: Real-time state-wide KPIs (Total FIRs, Active Hotspots, Repeat Offenders, Critical Risk Districts, Top Crime Categories, and Incident Feed).
2. **District & Police Station Analytics**: District-level drill-downs across 10 key Karnataka districts (Bengaluru Urban, Mysuru, Mangaluru, Belagavi, Hubballi-Dharwad, Kalaburagi, Shivamogga, Udupi, Tumakuru, Ballari) with station counts and MoM crime growth.
3. **Geospatial Crime Hotspot Map**: Interactive dark-mode Leaflet map of Karnataka with color-coded severity circles (Critical, High, Medium, Low), detailed station popups, and recommended tactical police actions.
4. **Spatiotemporal Trend Analysis**: Monthly crime trajectories, 24-hour time-of-day peak incident distribution, and automated analytical callout banners.
5. **Criminal Network & Link Graph**: Interactive SVG network graph connecting Suspects, FIR Cases, Locations, and Modus Operandi (MO) signatures with an interactive entity inspector.
6. **Repeat & Habitual Offender Profiles**: Intelligence cards tracking active jurisdictions, linked FIR numbers, known associates, MO tags, and investigation advisories.
7. **Explainable AI Predictive Risk Engine**: Interactive risk calculation engine allowing analysts to adjust weight factors (Spike %, Repeat Offender Density, Night Crime Ratio, Socio-Economic Index) with clear explanation factors.
8. **Anomaly & Emerging Trend Alerts**: Emergency alert feed highlighting multi-station FIR spikes, trojan APK phishing clusters, and highway cargo gangs.
9. **Socio-Demographic & Economic Insights**: Analytical correlation cards mapping urbanization, economic stress, migration, and unemployment against specific crime types.
10. **Natural Language "Ask Crime Data" Interface**: Natural language query input box with instant intelligence synthesis cards.

---

## 🏗️ System Architecture & Zoho Catalyst Integration

The platform is structured specifically for Zoho Catalyst deployment:

```
Datathon/
├── catalyst.json                 # Zoho Catalyst configuration mapping client & serverless functions
├── .catalystrc                   # Catalyst CLI project configuration
├── Police_FIR_ER_Diagram.pdf     # Official Karnataka Police Department Database Schema
├── PROTOTYPE_BRIEF.md            # Evaluator prototype brief document
├── README.md                     # Technical documentation & run guide
├── functions/                    # Zoho Catalyst Serverless Functions
│   └── ksp_api/                  # Node.js Express backend function
│       ├── package.json
│       ├── index.js              # Express API endpoints (/overview, /districts, /cases, /hotspots, etc.)
│       ├── catalyst-config.json  # Catalyst function manifest
│       └── data/
│           └── seed_data.json    # KSP ER Schema synthetic dataset
└── client/                       # Frontend Application
    ├── package.json
    ├── client-package.json       # Catalyst web client manifest
    ├── vite.config.js            # Vite configuration & proxy settings
    ├── index.html                # Leaflet & font imports
    └── src/
        ├── index.css             # Operational Dark Theme (#0b0f19)
        ├── App.jsx               # Main Dashboard Shell & Navigation
        ├── api/client.js         # API Client with Catalyst routing & local offline fallback
        ├── components/           # Header, Sidebar, StatCard, RiskBadge, FilterBar
        └── views/                # 10 Dedicated Operational Views
```

### Zoho Catalyst Native Services:
- **Catalyst Web Client Hosting**: Serves the static React SPA frontend (`client/dist`).
- **Catalyst Serverless Express Functions**: Hosts the Node.js API (`functions/ksp_api`) handling requests at `/server/ksp_api/api/`.
- **Catalyst API Gateway**: Manages API routing, CORS, security, and throttling.
- **Catalyst Data Store** *(Future Enhancement)*: Mapped directly from `Police_FIR_ER_Diagram.pdf` (`CaseMaster`, `Accused`, `Victim`, `ActSectionAssociation`, `Unit`, `District`).
- **Catalyst QuickML & RAG** *(Future Enhancement)*: Vector indexing for natural language FIR querying.
- **Catalyst Authentication** *(Future Enhancement)*: Role-based login for Constables, SHOs, DSPs, and SCRB Chiefs.

---

## 🛠️ Local Setup & Execution Guide

### Prerequisites
- **Node.js**: v18+ or v24+
- **npm**: v10+
- **Zoho Catalyst CLI**: Installed (`npm install -g zcatalyst-cli`) and logged in (`catalyst login`).

### Step 1: Clone Repository
```bash
git clone https://github.com/harsh-18/Datathon.git
cd Datathon
```

### Step 2: Run Client Frontend (Development Mode)
```bash
cd client
npm install
npm run dev
```
The dashboard will launch on `http://localhost:5173`. It includes a built-in offline fallback to synthetic KSP seed data so it works seamlessly zero-config!

### Step 3: Run Backend API (Optional Standalone Mode)
```bash
cd functions/ksp_api
npm install
node index.js
```
The backend API will run on `http://localhost:3000/api`.

---

## 🚀 Zoho Catalyst Deployment Guide

To test or deploy using the Zoho Catalyst CLI:

### 1. Catalyst Login & Project Context
```bash
catalyst login
catalyst project:use <your_catalyst_project_id>
```

### 2. Build Frontend Client
```bash
cd client
npm run build
cd ..
```

### 3. Local Catalyst Emulation
```bash
catalyst serve
```
This serves both the React Web Client at `http://localhost:3000/app/` and the serverless Express API at `http://localhost:3000/server/ksp_api/api/`.

### 4. Deploy to Zoho Catalyst Cloud
```bash
catalyst deploy
```
This uploads the static build to Catalyst Client Web Hosting and deploys `ksp_api` to Catalyst Serverless Functions!

---

## 🎬 Recommended Demo Workflow for Presentation / Video

1. **Executive Overview**: Open dashboard at `Overview` tab. Highlight total FIRs, active hotspots, repeat offender count, state threat level, and the automated crime spike alert banner.
2. **District Drill-down**: Click on `District Analytics`. Select **Bengaluru Urban** or **Hubballi-Dharwad** to show station counts, FIR volume, and MoM growth.
3. **Geospatial Hotspot Map**: Switch to `Geospatial Hotspots`. Zoom in on Karnataka districts, click on the **Bengaluru Urban** or **Tumakuru** red markers to show FIR details and recommended police actions.
4. **Spatiotemporal Trends**: Switch to `Spatiotemporal Trends`. Point out monthly crime trajectory lines and the 20:00 - 24:00 night peak incident concentration.
5. **Criminal Network Analysis**: Open `Network Link Graph`. Click on suspect **Ravi Kumar @ Bullet Ravi** or FIR **104430006202600421** to display node associations and shared MO tags in the inspector panel.
6. **Repeat Offender Profiles**: Open `Repeat Offenders`. Review suspect intelligence cards, active jurisdictions, and SCRB investigation advisories.
7. **Explainable AI Risk Engine**: Switch to `AI Risk Engine`. Move factor weight sliders (MoM Spike %, Repeat Offender Weight) to demonstrate explainable risk calculation.
8. **Anomaly Alerts**: Open `Anomaly Alerts`. Review evidence trails and recommended command actions for the transit-hub snatching spike.
9. **Socio-Economic Insights**: Switch to `Socio Insights`. Highlight correlations between urbanization, economic stress, and crime classifications.
10. **Ask Crime Data**: Go to `Ask Crime Data`. Click quick prompt *"Show robbery hotspots in Bengaluru"* to see natural language response generation.
11. **Catalyst Deployment Highlight**: Conclude by emphasizing that the entire platform is built for deployment on **Zoho Catalyst**.

---

## 📄 License
This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details.  
Copyright (c) 2026 **Harsh Verma**.
