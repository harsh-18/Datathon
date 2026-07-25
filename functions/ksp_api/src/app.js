const express = require('express');
const cors = require('cors');
const { errorResponse } = require('./utils/response');

// Route Imports
const overviewRoutes = require('./routes/overview.routes');
const districtsRoutes = require('./routes/districts.routes');
const casesRoutes = require('./routes/cases.routes');
const hotspotsRoutes = require('./routes/hotspots.routes');
const trendsRoutes = require('./routes/trends.routes');
const networkRoutes = require('./routes/network.routes');
const offendersRoutes = require('./routes/offenders.routes');
const alertsRoutes = require('./routes/alerts.routes');
const socioInsightsRoutes = require('./routes/socioInsights.routes');
const queryRoutes = require('./routes/query.routes');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/overview', overviewRoutes);
app.use('/api/districts', districtsRoutes);
app.use('/api/cases', casesRoutes);
app.use('/api/hotspots', hotspotsRoutes);
app.use('/api/trends', trendsRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/offenders', offendersRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/socio-insights', socioInsightsRoutes);
app.use('/api/query', queryRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', message: 'KSP API Service Operational on Zoho Catalyst' });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[KSP API Error]:', err);
  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  res.status(statusCode).json(errorResponse(err.message, errorCode));
});

module.exports = app;
