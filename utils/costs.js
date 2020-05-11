import BigNumber from "bignumber.js";
import { hasCoverageByAge } from "./validations";

const healthCostPerChild = ({ childs }) => {
  if (childs === 0) {
    return 0.279;
  }

  if (childs === 1) {
    return 0.4396;
  }

  // if none of above, then we can assume that the worker has more than 2 childs.
  return 0.5599;
};

const dentalCostPerChild = ({ childs }) => {
  if (childs === 0) {
    return 0.12;
  }

  if (childs === 1) {
    return 0.195;
  }

  // if none of above, then we can assume that the worker has more than 2 childs.
  return 0.248;
};

export const calculateTotalHealthCost = (workers) =>
  workers.reduce((totalCost, worker) => {
    if (hasCoverageByAge(worker)) {
      return totalCost.plus(healthCostPerChild(worker));
    } else {
      return totalCost;
    }
  }, new BigNumber(0));

export const calculateTotalDentalCost = (workers) =>
  workers.reduce((totalCost, worker) => {
    if (hasCoverageByAge(worker)) {
      return totalCost.plus(dentalCostPerChild(worker));
    } else {
      return totalCost;
    }
  }, new BigNumber(0));

export default {
  healthCostPerChild,
  dentalCostPerChild,
  calculateTotalHealthCost,
  calculateTotalDentalCost,
};
