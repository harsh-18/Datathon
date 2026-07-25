const offenderRepo = require('../repositories/offender.repository');

class AnomalyDetectionService {
  async getAlerts() {
    return offenderRepo.findAllAlerts();
  }
}

module.exports = new AnomalyDetectionService();
