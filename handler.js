"use strict";

import {
  getPolicy,
  calculateTotalPolicyCost,
  calculateCopaymentWorkers,
} from "./functions";

export const hello = async (event) => {
  const { data, error } = await getPolicy();

  if (error !== null) {
    return JSON.stringify(
      {
        status: 400,
        message: "ERROR",
        error,
      },
      null,
      2
    );
  } else {
    return JSON.stringify(
      {
        status: 200,
        message: "OK",
        data: {
          totalPolicyCost: calculateTotalPolicyCost(data),
          workersPolicy: calculateCopaymentWorkers(data),
        },
      },
      null,
      2
    );
  }
};
