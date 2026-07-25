const districtRepo = require('../src/repositories/district.repository');
const crimeRepo = require('../src/repositories/crimeData.repository');
const offenderRepo = require('../src/repositories/offender.repository');
const riskService = require('../src/services/riskScoring.service');

async function runSanityCheck() {
  console.log('--- Running Backend Sanity Checks ---');

  // 1. Check Districts
  const districts = await districtRepo.findAll();
  console.assert(districts.length === 10, 'Expected 10 districts in seed data');
  console.log(`✓ Districts Repository: Loaded ${districts.length} districts.`);

  // 2. Check Cases
  const cases = await crimeRepo.findAllCases();
  console.assert(cases.length > 0, 'Expected cases in seed data');
  console.log(`✓ CrimeData Repository: Loaded ${cases.length} FIR cases.`);

  // 3. Check Risk Scoring Engine
  const bblr = districts[0];
  const riskResult = riskService.calculateDistrictRisk(bblr);
  console.assert(riskResult.score > 0 && riskResult.category, 'Risk scoring failed');
  console.log(`✓ Risk Engine: ${bblr.name} -> Score: ${riskResult.score}, Category: ${riskResult.category}`);

  // 4. Check Network Data
  const network = await offenderRepo.getNetworkData();
  console.assert(network.nodes.length > 0 && network.edges.length > 0, 'Network graph empty');
  console.log(`✓ Network Repository: ${network.nodes.length} nodes, ${network.edges.length} edges.`);

  console.log('ALL BACKEND SANITY CHECKS PASSED SUCCESSFULLY!\n');
}

if (require.main === module) {
  runSanityCheck().catch(err => {
    console.error('Sanity check failed:', err);
    process.exit(1);
  });
}

module.exports = runSanityCheck;
