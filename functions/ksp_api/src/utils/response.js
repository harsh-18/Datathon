/**
 * Standardized API Response Utilities
 */

function successResponse(data, meta = {}) {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  };
}

function errorResponse(message = 'An unexpected error occurred', code = 'INTERNAL_ERROR', details = null) {
  return {
    success: false,
    error: {
      message,
      code,
      details
    }
  };
}

module.exports = {
  successResponse,
  errorResponse
};
