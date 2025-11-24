import { PriceBands, VehicleQuery, Condition } from "../types";

// Mock Database of approximate Base MSRPs for 2024/2025 models
// In a real app, this comes from an API like Edmunds or KBB
const MODEL_BASE_PRICES: Record<string, number> = {
  // Toyota
  "4Runner": 46000, "Tacoma": 38000, "Tundra": 52000, "Camry": 29000, "Corolla": 24000,
  "RAV4": 31000, "Highlander": 42000, "Sequoia": 65000, "Land Cruiser": 57000, "Prius": 29000,
  "Supra": 56000, "Sienna": 39000,
  
  // Honda
  "Civic": 26000, "Accord": 29500, "CR-V": 32000, "Pilot": 42000, "Passport": 43000, "Odyssey": 40000,
  
  // Ford
  "F-150": 55000, "Ranger": 35000, "Maverick": 26000, "Mustang": 35000, "Explorer": 41000, 
  "Bronco": 44000, "Bronco Sport": 32000, "Expedition": 60000,
  
  // Chevrolet
  "Silverado 1500": 56000, "Colorado": 34000, "Tahoe": 62000, "Suburban": 65000, "Corvette": 75000,
  
  // Jeep
  "Wrangler": 38000, "Grand Cherokee": 44000, "Gladiator": 41000, "Wagoneer": 65000,
  
  // Luxury
  "3 Series": 48000, "5 Series": 62000, "X5": 68000, "X3": 50000,
  "C-Class": 49000, "E-Class": 65000, "GLE": 66000, "G-Class": 145000,
  "911": 125000, "Macan": 65000, "Cayenne": 85000,
  "Escalade": 89000, 
  
  // EV
  "Model 3": 41000, "Model Y": 45000, "Model S": 76000, "Model X": 81000, "Cybertruck": 82000,
  "R1T": 75000, "R1S": 79000
};

// Default prices if model not found, based on Make tier
const MAKE_TIER_DEFAULTS: Record<string, number> = {
  "Porsche": 90000, "Land Rover": 80000, "Maserati": 95000, "Rivian": 80000, "Lucid": 80000,
  "Mercedes-Benz": 60000, "BMW": 58000, "Audi": 55000, "Lexus": 52000, "Cadillac": 60000, "Volvo": 55000, "Lincoln": 60000, "Genesis": 55000,
  "Tesla": 45000, "Acura": 48000, "Infiniti": 50000, "Alfa Romeo": 50000,
  "Ford": 40000, "Chevrolet": 40000, "Toyota": 38000, "Honda": 36000, "Jeep": 42000, "Ram": 50000, "GMC": 52000,
  "Subaru": 32000, "Mazda": 33000, "Volkswagen": 34000, "Kia": 30000, "Hyundai": 30000, "Nissan": 30000,
  "Mitsubishi": 28000, "Dodge": 40000, "Chrysler": 40000, "Buick": 35000
};

/**
 * Determines depreciation rate based on brand reputation and vehicle type.
 * Returns annual depreciation percentage (e.g., 0.10 for 10%).
 */
const getDepreciationRate = (make: string, model: string): number => {
  // Cars that hold value extremely well (Trucks, Off-roaders, Toyota/Honda)
  if (
    ["4Runner", "Tacoma", "Tundra", "Wrangler", "Bronco", "Land Cruiser", "911", "Corvette"].includes(model) ||
    ["Ferrari", "Lamborghini"].includes(make)
  ) {
    return 0.06; // Only 6% per year
  }

  // Strong value holders
  if (
    ["F-150", "Silverado 1500", "Sierra 1500", "Ram", "Civic", "Corolla", "CR-V", "RAV4", "Subaru"].some(k => model.includes(k) || make === k)
  ) {
    return 0.09; // 9% per year
  }

  // Luxury depreciation (High)
  if (["BMW", "Mercedes-Benz", "Audi", "Maserati", "Jaguar", "Land Rover", "Alfa Romeo"].includes(make)) {
    return 0.18; // 18% per year
  }

  // EVs (Currently fluctuating, but generally high recently)
  if (["Tesla", "Polestar", "Rivian", "Lucid"].includes(make)) {
    return 0.15; 
  }

  // Average
  return 0.13;
};

export const fetchPricingData = async (query: VehicleQuery): Promise<PriceBands> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  const currentYear = new Date().getFullYear();
  const age = currentYear - query.year;
  
  // 1. Determine Base Price (MSRP equivalent for New)
  let basePrice = MODEL_BASE_PRICES[query.model];
  
  if (!basePrice) {
    // Fallback to make averages
    basePrice = MAKE_TIER_DEFAULTS[query.make] || 35000;
  }

  // 2. Calculate Market Value based on Age & Condition
  let marketValue = basePrice;
  const depRate = getDepreciationRate(query.make, query.model);

  if (query.condition === Condition.Used || age > 0) {
    // Apply depreciation curve
    // Year 1 hit is usually hardest, unless it's a unicorn car
    const firstYearHit = depRate * 1.5; 
    
    if (age >= 1) {
      marketValue = marketValue * (1 - firstYearHit); // Year 1
      
      // Subsequent years compounding
      for (let i = 1; i < age; i++) {
        marketValue = marketValue * (1 - depRate);
      }
    } else if (query.condition === Condition.Used && age === 0) {
      // Current year used car (listing "slightly used")
      marketValue = marketValue * 0.90; 
    }
  } else {
    // It's New
    // Market adjustments for new cars
    // Hot cars might be over MSRP, regular cars under
    if (depRate < 0.08) {
      marketValue = marketValue * 1.05; // "Market Adjustment" markup simulation
    }
  }

  // 3. Generate Bands
  // Used car market is messy, so bands are wider. New car market is tighter.
  const spread = (query.condition === Condition.Used || age > 0) ? 0.12 : 0.06;

  const median = Math.round(marketValue);
  // Randomize slightly so it's not always exact same number
  const noise = (Math.random() * 1000) - 500;
  
  const finalMedian = median + noise;
  const low = Math.round(finalMedian * (1 - spread));
  const high = Math.round(finalMedian * (1 + spread));

  // 4. Set MSRP/Invoice for reference
  let msrp: number | undefined;
  let invoice: number | undefined;

  // MSRP is relevant for New and fairly recent Used
  if (age <= 3) {
    // MSRP doesn't change with age, it was the original price
    // We estimate original MSRP was slightly lower in previous years (inflation)
    const inflationAdjustment = 1 - (age * 0.02); 
    msrp = Math.round(basePrice * inflationAdjustment);
    invoice = Math.round(msrp * 0.92);
  }

  return {
    low: Math.round(low / 100) * 100, // Round to nearest 100 for cleaner look
    median: Math.round(finalMedian / 100) * 100,
    high: Math.round(high / 100) * 100,
    msrp,
    invoice,
    fairPrice: Math.round(finalMedian / 100) * 100
  };
};