# PROTOTYPE BRIEF: CrimeLens Karnataka

**KSP Datathon 2026 Submission**  
**Project Name**: CrimeLens Karnataka  
**Zoho Catalyst Project**: `CrimeLens-Karnataka`  
**Chosen Problem Statement**: Problem Statement 2: AI-Driven Crime Analytics & Visualization Platform  
**Target Organization**: Karnataka State Police (KSP) / State Crime Records Bureau (SCRB)  
**Deployment Platform**: Zoho Catalyst  

---

## 1. Problem Statement Addressed
The Karnataka State Police maintains extensive crime records involving incidents, offenders, victims, locations, and police stations. Currently, much analysis is manual, Excel-based, fragmented across silos, and reactive. SCRB and police decision-makers need a modern crime intelligence platform that integrates crime records, enables interactive visual analytics, identifies crime hotspots, detects repeat offenders and criminal associations, and provides predictive or preventive intelligence.

The goal of this project is to build a state-of-the-art AI-driven crime analytics and visualization platform that helps investigators, analysts, and policymakers move from manual reporting to proactive, evidence-based policing.

---

## 2. Solution Overview
**CrimeLens Karnataka** is a Catalyst-powered AI crime analytics and visualization platform for the Karnataka State Police. It transforms fragmented crime records into interactive dashboards, geospatial hotspot maps, repeat offender profiles, criminal network link graphs, and explainable risk alerts to support proactive, evidence-based policing.

Built natively for **Zoho Catalyst** (Project: `CrimeLens-Karnataka`), the platform delivers real-time decision support, automated anomaly detection, criminal association network graphs, and explainable AI risk scoring.

---

## 3. Key Implemented Features

1. **Executive Overview Dashboard**: High-level command KPIs (Total FIRs, Active Hotspots, Repeat Offenders Tracked, Critical Risk Districts, Top Crime Categories, and Real-time Incident Feed).
2. **District & Police Station Analytics**: Granular drill-down across 10 key Karnataka districts (Bengaluru Urban, Mysuru, Mangaluru, Belagavi, Hubballi-Dharwad, Kalaburagi, Shivamogga, Udupi, Tumakuru, Ballari) with station-level metrics and MoM crime growth.
3. **Geospatial Crime Hotspot Map**: Interactive dark-themed Leaflet map of Karnataka with color-coded severity markers (Critical, High, Medium, Low), detailed station popups, and recommended tactical police responses.
4. **Spatiotemporal Trend Analysis**: Month-over-month trajectory charts, 24-hour time-of-day peak incident heat distribution, and automated analytical callout banners.
5. **Criminal Network & Link Graph**: Multi-entity interactive graph visualizing connections between Suspects, Registered FIRs, Hotspot Locations, and Shared Modus Operandi (MO) signatures with an interactive entity inspector.
6. **Repeat & Habitual Offender Profiles**: Comprehensive suspect intelligence cards tracking active jurisdictions, linked FIR numbers, known associates, MO tags, and SCRB investigation advisories.
7. **Explainable AI Predictive Risk Engine**: Interactive risk calculation model attributing weight factors to crime spikes, repeat offender density, night-time incident ratio, and socio-economic stress indices.
8. **Anomaly & Emerging Trend Alerts**: Prioritized emergency notifications for multi-station FIR spikes, APK phishing clusters, and highway dacoity gangs with evidence trails and recommended command actions.
9. **Socio-Demographic & Economic Insights**: Analytical correlation cards mapping urbanization, economic stress, migration, and unemployment against specific crime types.
10. **Natural Language "Ask Crime Data" Interface**: Natural language query input box with instant intelligence synthesis cards, future-ready for Catalyst QuickML RAG integration.

---

## 4. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS / Operational Dark Theme (`#0b0f19`)
- **Geospatial Mapping**: Leaflet, React-Leaflet (CARTO Dark Matter tiles)
- **Data Visualization**: Recharts (Line & Bar charts), SVG Force Link Network Renderer
- **Icons**: Lucide React
- **Backend APIs**: Node.js, Express (Zoho Catalyst Serverless Function)
- **Deployment Platform**: Zoho Catalyst (Web Client Hosting & Serverless Express Functions)

---

## 5. Zoho Catalyst Native Services Utilized & Architecture

- **Catalyst Web Client Hosting / Slate**: Hosts the React SPA frontend bundle (`client/dist`).
- **Catalyst Serverless Functions**: Serves the Node.js Express backend API (`functions/ksp_api`) under `/server/ksp_api/api/`.
- **Catalyst API Gateway**: Handles API routing, rate-limiting, and security throttling.
- **Catalyst Data Store** *(Future Enhancement)*: Relational relational schema mapped from the official Karnataka Police FIR ER Diagram (`CaseMaster`, `Accused`, `Victim`, `ActSectionAssociation`, `Unit`, `District`).
- **Catalyst QuickML & RAG** *(Future Enhancement)*: Vector storage and LLM inference for natural language FIR querying.
- **Catalyst Zia Services** *(Future Enhancement)*: OCR processing for scanned handwritten FIR PDFs.
- **Catalyst SmartBrowz** *(Future Enhancement)*: Automated PDF report generation for daily police briefing packets.

---

## 6. Proposed Impact for Karnataka State Police

- **Replaces Manual Excel Reporting**: Eliminates fragmented spreadsheets with a centralized, real-time intelligence feed.
- **Proactive Policing & Prevention**: Enables early patrol dispatch to emerging hotspots before crime spikes escalate.
- **Cross-Jurisdiction Offender Tracking**: Connects habitual offenders operating across boundary police stations.
- **Evidence-Based Policy Decisions**: Provides policymakers with empirical socio-economic correlation data.

---

## 7. Data Schema & Assumptions
The prototype utilizes realistic synthetic data constructed directly from the official **Karnataka State Police FIR ER Diagram** (`Police_FIR_ER_Diagram.pdf`), adhering to standard KSP identifier formats (e.g. `CrimeNo`: `104430006202600421`, `BNS` / `IPC` act-sections, `Heinous` / `Non-Heinous` gravity classifications). No real sensitive police data is exposed.

---

## 8. Future Roadmap & Catalyst Integration
1. **Catalyst Authentication**: Role-based access control for Constables, SHOs, DSPs, and SCRB Chiefs.
2. **Catalyst QuickML Integration**: Full vector database indexing of FIR brief facts for semantic search.
3. **Catalyst Cron & Job Scheduling**: Automated nightly risk score re-indexing and SMS/WhatsApp emergency alerts to patrolling officers.
