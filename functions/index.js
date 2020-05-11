import * as Utils from "../utils";
import BigNumber from "bignumber.js";

export const getPolicy = async () => {
  const { bicePolicy } = Utils.urls;

  return fetch(bicePolicy)
    .then((res) => res.json())
    .then((data) => ({ data: data.policy, error: null }))
    .catch((error) => ({ data: null, error }));
};

export const calculateTotalPolicyCost = ({
  workers,
  has_dental_care,
  company_percentage,
}) => {
  const { calculateTotalHealthCost, calculateTotalDentalCost } = Utils.costs;
  let totalDentalCost = new BigNumber(0);

  console.log(workers);

  const totalHealthCost = calculateTotalHealthCost(workers);

  if (has_dental_care) {
    totalDentalCost = calculateTotalDentalCost(workers);
  }

  //return the total cost for the company
  return totalHealthCost
    .plus(totalDentalCost)
    .multipliedBy(company_percentage)
    .dividedBy(100)
    .toFixed(4);
};

export const calculateCopaymentWorkers = ({
  workers,
  has_dental_care,
  company_percentage,
}) => {
  const { healthCostPerChild, dentalCostPerChild } = Utils.costs;
  const { hasCoverageByAge } = Utils.validations;
  const maxPercentageCoverage = 100;

  const copaymentFactor = maxPercentageCoverage - company_percentage;
  const copayWorkers = workers.reduce((totalCopay, worker) => {
    let dentalCopayment;

    if (hasCoverageByAge(worker)) {
      const healthCopayment = new BigNumber(healthCostPerChild(worker))
        .multipliedBy(copaymentFactor)
        .dividedBy(maxPercentageCoverage)
        .toFixed(4);

      if (has_dental_care) {
        dentalCopayment = new BigNumber(dentalCostPerChild(worker))
          .multipliedBy(copaymentFactor)
          .dividedBy(maxPercentageCoverage)
          .toFixed(4);
      } else {
        dentalCopayment = "not covered";
      }
      return [
        ...totalCopay,
        {
          ...worker,
          healthCopayment,
          dentalCopayment,
        },
      ];
    } else {
      return [
        ...totalCopay,
        {
          ...worker,
          healthCopayment: "not covered",
          dentalCopayment: "not coverxed",
        },
      ];
    }
  }, []);

  return copayWorkers;
};
