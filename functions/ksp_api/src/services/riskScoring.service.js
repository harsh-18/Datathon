const districtRepo = require('../repositories/district.repository');

class RiskScoringService {
  calculateDistrictRisk(district, weights = {}) {
    const spikeWeight = weights.spike || 30;
    const offenderWeight = weights.offender || 25;
    const nightWeight = weights.night || 20;
    const socioWeight = weights.socio || 25;

    const spikeFactor = Math.min(100, Math.max(0, (district.monthChangePercent || 15) * 2));
    const offenderFactor = Math.min(100, (district.activeRepeatOffenders || 5) * 7);
    const nightFactor = 70;
    const socioFactor = district.economicStressIndex || 50;

    const totalWeight = spikeWeight + offenderWeight + nightWeight + socioWeight;
    const score = Math.round(
      ((spikeFactor * spikeWeight) +
       (offenderFactor * offenderWeight) +
       (nightFactor * nightWeight) +
       (socioFactor * socioWeight)) / (totalWeight || 100)
    );

    let category = 'Low';
    if (score >= 85) category = 'Critical';
    else if (score >= 70) category = 'High';
    else if (score >= 50) category = 'Medium';

    return {
      score,
      category,
      explanationFactors: [
        `Month-over-month crime growth: ${district.monthChangePercent}%`,
        `Active repeat offenders in jurisdiction: ${district.activeRepeatOffenders}`,
        `Economic Stress Index: ${district.economicStressIndex}/100`
      ]
    };
  }
}

module.exports = new RiskScoringService();
