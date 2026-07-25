# Zoho Catalyst Deployment & Emulation Guide

This document outlines how to test and deploy the **KSP Crime Intelligence & Analytics Platform** on **Zoho Catalyst**.

---

## 1. Prerequisites
- **Node.js**: v18+ or v24+
- **Zoho Catalyst CLI**: Installed globally via `npm install -g zcatalyst-cli`
- **Zoho Catalyst Account**: Signed up on Zoho Catalyst Console

---

## 2. CLI Authentication & Project Linking

```bash
# 1. Login to Catalyst CLI
catalyst login

# 2. Select Data Center (e.g. IN for India)
# Follow browser OAuth authentication prompt

# 3. Link existing Catalyst Project
catalyst project:use <your_catalyst_project_id>
```

---

## 3. Local Emulation (`catalyst serve`)

To test both the frontend React client and the serverless Express backend locally using Catalyst CLI:

```bash
# Build frontend first
cd client
npm run build
cd ..

# Run Catalyst local emulator
catalyst serve
```

Catalyst will launch:
- **Web Client Hosting**: `http://localhost:3000/app/`
- **Serverless Express API**: `http://localhost:3000/server/ksp_api/api/`

---

## 4. Production Cloud Deployment (`catalyst deploy`)

To publish your application to live Catalyst cloud servers:

```bash
catalyst deploy
```

Catalyst CLI will perform:
1. Uploading static bundle from `client/dist` to **Catalyst Web Client Hosting**.
2. Deploying `functions/ksp_api` Node.js environment to **Catalyst Serverless Functions**.

---

## 5. Catalyst Data Store Migration Roadmap

When transitioning from synthetic local seed JSON to **Catalyst Data Store**:

1. Create Data Store tables matching `docs/DATA_MODEL.md` (`CaseMaster`, `District`, `Accused`, `Victim`).
2. Update backend repository files in `functions/ksp_api/src/repositories/`:
   ```javascript
   // Replace JSON array lookup with Catalyst SDK ZCQL query:
   const catalyst = require('zcatalyst-sdk-node');
   const zql = catalyst.zcql();
   const queryResult = await zql.executeZCQLQuery("SELECT * FROM CaseMaster");
   ```
3. Because controllers and services depend on repository interfaces, **zero frontend or business logic code changes are required**!
