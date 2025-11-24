import { Fee, FeeType, VehicleQuery } from "../types";

/**
 * Mocks a database of typical dealer fees by region/state.
 * 
 * API INTEGRATION POINT:
 * Connect to a database of state-specific fees (e.g., Title/Registration averages).
 */
export const getFeeBreakdown = (query: VehicleQuery): Fee[] => {
  const fees: Fee[] = [
    {
      name: "Sales Tax",
      amountLow: 0, // Calculated as % usually, but mocking absolute numbers here
      amountHigh: 0,
      type: FeeType.NonNegotiable,
      description: "State and local government tax. Non-negotiable."
    },
    {
      name: "Title & Registration",
      amountLow: 50,
      amountHigh: 200,
      type: FeeType.NonNegotiable,
      description: "State DMV fees for vehicle registration."
    },
    {
      name: "Destination Charge",
      amountLow: 995,
      amountHigh: 1695,
      type: FeeType.NonNegotiable,
      description: "Manufacturer's delivery fee. Rarely negotiable on new cars."
    }
  ];

  // Add negotiable fees
  fees.push({
    name: "Doc Fee (Documentation)",
    amountLow: 85,
    amountHigh: 899, // Differs wildly by state (e.g., FL vs NY)
    type: FeeType.Negotiable,
    description: "Dealer profit center. Capped by law in some states, unlimited in others. ASK TO REDUCE."
  });

  fees.push({
    name: "Dealer Prep / Admin",
    amountLow: 0,
    amountHigh: 500,
    type: FeeType.Negotiable,
    description: "Often a junk fee for cleaning the car. Highly negotiable."
  });

  fees.push({
    name: "Add-ons (Nitrogen, Etch)",
    amountLow: 0,
    amountHigh: 1200,
    type: FeeType.Negotiable,
    description: "Optional dealer-installed accessories. Usually can be removed or refused."
  });

  return fees;
};