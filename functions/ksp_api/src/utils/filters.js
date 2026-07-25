function filterCases(cases, { district, crimeType, severity }) {
  let result = [...cases];

  if (district && district !== 'All') {
    result = result.filter(c => c.district.toLowerCase() === district.toLowerCase());
  }

  if (crimeType && crimeType !== 'All Categories') {
    result = result.filter(c => c.crimeType.toLowerCase().includes(crimeType.toLowerCase()));
  }

  if (severity && severity !== 'All') {
    result = result.filter(c => c.severity.toLowerCase() === severity.toLowerCase());
  }

  return result;
}

module.exports = {
  filterCases
};
