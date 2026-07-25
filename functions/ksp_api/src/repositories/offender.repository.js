const seedData = require('../data/seedData');

class OffenderRepository {
  async findAllOffenders() {
    return seedData.suspects || [];
  }

  async findRepeatOffenders() {
    return (seedData.suspects || []).filter(s => s.repeatOffender);
  }

  async findAllAlerts() {
    return seedData.alerts || [];
  }

  async getNetworkData() {
    return {
      nodes: seedData.networkNodes || [],
      edges: seedData.networkEdges || []
    };
  }
}

module.exports = new OffenderRepository();
