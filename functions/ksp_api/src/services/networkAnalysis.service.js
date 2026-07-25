const offenderRepo = require('../repositories/offender.repository');

class NetworkAnalysisService {
  async getNetworkGraph() {
    return offenderRepo.getNetworkData();
  }
}

module.exports = new NetworkAnalysisService();
