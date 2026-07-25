# KSP Crime Intelligence Platform - Developer Guide

Welcome to the development guide for the KSP Crime Intelligence & Analytics Platform codebase. This document helps developers extend, maintain, and contribute to the platform post-hackathon.

---

## 1. How to Add a New Feature Page

To add a new dashboard view (e.g. `VehicleTheftTracking`):

1. **Create Feature Directory**:
   Create `client/src/features/vehicleTheft/pages/VehicleTheftPage.jsx`.
2. **Add Route Constant**:
   In `client/src/shared/constants/routes.js`, add:
   ```javascript
   VEHICLE_THEFT: 'vehicleTheft'
   ```
3. **Register Sidebar Item**:
   In `client/src/shared/components/Sidebar.jsx`, add the item to `navItems`.
4. **Mount Page in App Shell**:
   In `client/src/app/App.jsx`, import `VehicleTheftPage` and add the conditional tab render block.

---

## 2. How to Add a New Backend API Endpoint

To add a new API endpoint (e.g. `GET /api/vehicles`):

1. **Repository Layer**: Add method to `crimeData.repository.js`:
   ```javascript
   async findVehicleThefts() { ... }
   ```
2. **Service Layer**: Create `vehicleAnalysis.service.js` under `src/services/`.
3. **Controller Layer**: Create `vehicle.controller.js` under `src/controllers/`.
4. **Route Definition**: Create `vehicle.routes.js` under `src/routes/`.
5. **Mount Route**: In `src/app.js`, add:
   ```javascript
   app.use('/api/vehicles', vehicleRoutes);
   ```

---

## 3. How to Update Synthetic Seed Data

All synthetic data is centrally managed in:
- `functions/ksp_api/data/seed_data.json`
- `client/src/shared/data/seedData.json`

To add a new district or FIR case, insert a new JSON object adhering to the schema defined in `docs/DATA_MODEL.md`.

---

## 4. Coding Conventions

- **Naming**: Use camelCase for variables/functions, PascalCase for React components and class names, UPPER_SNAKE_CASE for constants.
- **Error Handling**: Use `AppError` in backend controllers and `try/catch` with fallback in frontend API services.
- **Styling**: Use utility classes in Tailwind or design token classes (`.ksp-card`) in `index.css`.
