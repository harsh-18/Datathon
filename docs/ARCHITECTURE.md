# KSP Crime Intelligence & Analytics Platform - Architecture Document

## Overview
The platform uses a clean, maintainable, layered architecture designed for production readiness on **Zoho Catalyst**. It follows SOLID design principles, separating concerns between UI presentation, business analytics services, and data access repositories.

---

## Frontend Architecture (`client/src/`)

The frontend follows a **feature-based structure** for modular maintainability:

```
client/src/
├── app/
│   └── App.jsx                 # Global Layout Shell & State Provider
├── features/                   # Feature Modules
│   ├── overview/               # Executive Overview feature
│   ├── districts/              # District Analytics feature
│   ├── hotspots/               # Geospatial Hotspot Map feature
│   ├── trends/                 # Spatiotemporal Trend Analysis feature
│   ├── network/                # Criminal Link Network feature
│   ├── offenders/              # Repeat Offender Intelligence feature
│   ├── riskScoring/            # Explainable AI Risk Engine feature
│   ├── alerts/                 # Anomaly Alert Dispatch feature
│   ├── socioInsights/          # Socio-Economic Correlation feature
│   └── askData/                # Natural Language Query feature
└── shared/                     # Reusable Shared Assets
    ├── components/             # Header, Sidebar, StatCard, RiskBadge, FilterBar
    ├── constants/              # crimeTypes, riskLevels, routes, districts
    ├── services/               # apiClient with Catalyst routing & local seed fallback
    ├── data/                   # Synthetic KSP seed JSON dataset
    └── styles/                 # Operational Dark Theme CSS
```

---

## Backend Architecture (`functions/ksp_api/src/`)

The Node.js Express backend function strictly adheres to a **Controller-Service-Repository** pattern:

```
functions/ksp_api/src/
├── app.js                      # Express App Initialization & Error Middleware
├── routes/                     # Endpoint Route Declarations
│   ├── overview.routes.js
│   ├── districts.routes.js
│   ├── cases.routes.js
│   ├── hotspots.routes.js
│   ├── trends.routes.js
│   ├── network.routes.js
│   ├── offenders.routes.js
│   ├── alerts.routes.js
│   ├── socioInsights.routes.js
│   └── query.routes.js
├── controllers/                # Request & Response Handlers
│   ├── overview.controller.js
│   ├── districts.controller.js
│   ├── cases.controller.js
│   ├── hotspots.controller.js
│   ├── trends.controller.js
│   ├── network.controller.js
│   ├── offenders.controller.js
│   ├── alerts.controller.js
│   ├── socioInsights.controller.js
│   └── query.controller.js
├── services/                   # Core Business & Analytics Logic
│   ├── riskScoring.service.js
│   ├── trendAnalysis.service.js
│   ├── hotspotAnalysis.service.js
│   ├── networkAnalysis.service.js
│   ├── anomalyDetection.service.js
│   └── queryInterpreter.service.js
├── repositories/               # Isolated Data Access Layer (Catalyst Data Store ready)
│   ├── district.repository.js
│   ├── crimeData.repository.js
│   └── offender.repository.js
├── data/
│   └── seedData.js             # Synthetic Seed Data Store
└── utils/                      # Pure Helper Utilities
    ├── response.js             # Standardized JSON response formatting
    ├── errors.js               # AppError exception definitions
    └── filters.js              # Pure array filter utilities
```

---

## Key Design Patterns & SOLID Compliance

1. **Single Responsibility Principle (SRP)**:
   - Controllers handle HTTP req/res.
   - Services execute domain calculations (risk scoring, anomaly filtering).
   - Repositories manage raw data querying.

2. **Dependency Inversion Principle (DIP)**:
   - Frontend UI components depend on `shared/services/apiClient.js`, not raw seed JSON.
   - Controllers call Service methods; Services query Repository abstractions.

3. **Data Layer Interchangeability**:
   - The `Repository` layer abstracts storage details. Replacing synthetic JSON with **Catalyst Data Store ZCQL queries** requires editing *only* the repository files, leaving controllers, services, and UI components completely untouched.
