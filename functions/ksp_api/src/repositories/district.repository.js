const seedData = require('../data/seedData');

class DistrictRepository {
  async findAll() {
    return seedData.districts || [];
  }

  async findByName(name) {
    if (!name) return null;
    return (seedData.districts || []).find(
      d => d.name.toLowerCase() === name.toLowerCase()
    ) || null;
  }

  async findById(id) {
    return (seedData.districts || []).find(
      d => d.id === id || d.districtId === id
    ) || null;
  }
}

module.exports = new DistrictRepository();
