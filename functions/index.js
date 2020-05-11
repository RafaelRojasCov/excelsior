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
  const totalHealthCost = calculateTotalHealthCost(workers);

  if (has_dental_care) {
    totalDentalCost = calculateTotalDentalCost(workers);
  }

  return totalHealthCost
    .plus(totalDentalCost)
    .multipliedBy(company_percentage)
    .dividedBy(100)
    .toFixed(4);
};
