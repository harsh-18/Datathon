# KSP Crime Intelligence Platform - Data Model Specification

The synthetic data schema directly reflects the official **Karnataka State Police Database Schema** (`Police_FIR_ER_Diagram.pdf`).

---

## Primary Entity Schemas

### 1. CaseMaster (Registered FIR)
- `id` / `caseMasterId`: Primary Key (INTEGER)
- `crimeNo`: Structured KSP Crime Number (VARCHAR) format: `Category(1) + DistrictID(4) + StationID(4) + Year(4) + Serial(5)` e.g., `104430006202600421`
- `caseNo`: Station level case number e.g. `202600421`
- `firNumber`: Display string e.g. `FIR: 104430006202600421`
- `district`: District Name (VARCHAR)
- `districtId`: FK to District table (INTEGER)
- `policeStation`: Police Station / Unit Name (VARCHAR)
- `policeStationId`: FK to Unit table (INTEGER)
- `caseCategory`: `FIR`, `UDR`, `Zero FIR`, `PAR`
- `gravityOffence`: `Heinous` | `Non-Heinous`
- `actSection`: Bharatiya Nyaya Sanhita (BNS) or IPC / IT Act Sections
- `crimeMajorHead`: Major classification (e.g. `Crimes Against Property`)
- `crimeMinorHead`: Minor sub-head (e.g. `Snatching & Robbery`)
- `caseStatus`: `Under Investigation`, `Charge Sheeted`, `Closed`, `Accused Detained`
- `crimeRegisteredDate`: DATE
- `incidentFromDate` / `incidentToDate`: DATETIME
- `timeOfDay` / `timeCategory`: String categorization
- `locationName`: Specific location string
- `lat` / `lng`: GPS Coordinates (DECIMAL)
- `severity`: `Critical` | `High` | `Medium` | `Low`
- `accusedIds` / `accusedNames`: Array of linked accused
- `victimIds` / `victimNames`: Array of linked victims
- `complainantName`: Full name of complainant
- `investigatingOfficer`: Name and KGID of IO
- `modusOperandi`: Description of offender MO
- `briefFacts`: Summary of the case

### 2. District
- `id` / `districtId`: Primary Key (INTEGER)
- `name`: District Name (VARCHAR)
- `lat` / `lng`: Geographic Center Coordinates
- `totalCases`: Count of registered FIRs
- `riskScore`: Computed Risk Index (0 - 100)
- `riskLevel`: `Critical` | `High` | `Medium` | `Low`
- `monthChangePercent`: MoM growth %
- `topCrime`: Dominant crime classification
- `policeStationCount`: Number of connected police stations
- `population`: District population
- `urbanizationIndex` / `economicStressIndex` / `unemploymentRate` / `migrationIndex`: Socio-economic indicators

### 3. Suspect (Accused)
- `id`: Primary Key (VARCHAR) e.g. `SUS-01`
- `name`: Full name & alias e.g. `Ravi Kumar @ Bullet Ravi`
- `age` / `gender`: Demographics
- `districtsActive`: Array of active district names
- `linkedCases`: Array of linked FIR numbers
- `knownAssociates`: Array of suspect aliases
- `modusOperandiTags`: Array of MO signatures
- `repeatOffender`: Boolean flag
- `riskScore`: Individual risk score (0 - 100)
- `status`: `Active / Absconding` | `Under Surveillance`
- `lastKnownLocation`: Location text
- `investigationRecommendation`: Advisory text for SHOs
