# KSP Crime Intelligence Platform - API Reference

Base Endpoint (Local): `http://localhost:3000/api`  
Base Endpoint (Catalyst Cloud): `/server/ksp_api/api`  

All responses follow a consistent JSON shape:

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-07-25T21:00:00.000Z"
  }
}
```

Error responses follow:
```json
{
  "success": false,
  "error": {
    "message": "Resource not found",
    "code": "NOT_FOUND"
  }
}
```

---

## Endpoint Catalog

### 1. GET `/api/overview`
Returns state-wide KPIs, active hotspots, repeat offender counts, top crime categories, and recent FIR records.

### 2. GET `/api/districts`
Returns all 10 Karnataka districts with case counts, risk scores, and police station counts.

### 3. GET `/api/cases`
Returns registered FIR cases. Supports query parameters:
- `district`: Filter by district name (e.g. `Bengaluru Urban`)
- `crimeType`: Filter by crime classification
- `severity`: Filter by severity (`Critical`, `High`, `Medium`)

### 4. GET `/api/hotspots`
Returns geospatial hotspot coordinates, severity markers, and recommended police tactical actions.

### 5. GET `/api/trends`
Returns monthly YTD crime trends and 24-hour time-of-day peak distributions.

### 6. GET `/api/network`
Returns graph nodes and edges linking suspects, cases, locations, and modus operandi.

### 7. GET `/api/offenders`
Returns habitual offender intelligence profiles, active jurisdictions, and investigation recommendations.

### 8. GET `/api/alerts`
Returns emergency anomaly alerts with evidence trails.

### 9. GET `/api/socio-insights`
Returns district socio-demographic indicators mapped against crime correlations.

### 10. POST `/api/query`
Natural language query interface.
**Request Body**:
```json
{
  "query": "Show robbery hotspots in Bengaluru"
}
```
