// Constants
const MAX_AGE_LIMIT_COVERAGE = 65;

// validations
export const hasCoverageByAge = ({ age }) => age < MAX_AGE_LIMIT_COVERAGE;

export default {
  hasCoverageByAge,
};
