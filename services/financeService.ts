import { Incentive, InterestRate, VehicleQuery, Condition } from "../types";

/**
 * Mocks financial data API.
 */
export const getInterestRates = (query: VehicleQuery): InterestRate[] => {
  const isNew = query.condition === Condition.New;
  
  // Base rates based on current economic environment (Mocked)
  const baseRate = isNew ? 5.9 : 7.5;

  return [
    {
      scoreTier: "Excellent (750+)",
      aprLow: baseRate,
      aprHigh: baseRate + 1.5
    },
    {
      scoreTier: "Good (700-749)",
      aprLow: baseRate + 1.5,
      aprHigh: baseRate + 3.0
    },
    {
      scoreTier: "Average (650-699)",
      aprLow: baseRate + 4.0,
      aprHigh: baseRate + 7.0
    }
  ];
};

export const getIncentives = (query: VehicleQuery): Incentive[] => {
  const incentives: Incentive[] = [];

  if (query.condition === Condition.New) {
    incentives.push({
      title: "Manufacturer Rebate",
      description: `Customer cash back on select ${query.year} ${query.make} models.`,
      type: 'Cash Back',
      amount: 1500
    });
    incentives.push({
      title: "Low APR Special",
      description: "Qualified buyers can get 2.9% APR for 36 months.",
      type: 'Finance'
    });
  } else {
    incentives.push({
      title: "Certified Pre-Owned Rate",
      description: "Special financing for CPO vehicles.",
      type: 'Finance'
    });
  }

  return incentives;
};