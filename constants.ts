import { Condition } from "./types";

export const MAKES = [
  "Acura", "Alfa Romeo", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Fiat", "Ford", 
  "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", 
  "Lucid", "Maserati", "Mazda", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Polestar", "Porsche", "Ram", 
  "Rivian", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
].sort();

export const MODELS_BY_MAKE: Record<string, string[]> = {
  "Acura": ["Integra", "TLX", "RDX", "MDX", "ZDX"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "e-tron GT", "RS e-tron GT"],
  "BMW": ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "XM", "i4", "i5", "i7", "iX"],
  "Buick": ["Encore GX", "Envision", "Enclave", "Envista"],
  "Cadillac": ["CT4", "CT5", "XT4", "XT5", "XT6", "Escalade", "LYRIQ", "CELESTIQ"],
  "Chevrolet": ["Spark", "Malibu", "Camaro", "Corvette", "Trax", "Trailblazer", "Equinox", "Blazer", "Traverse", "Tahoe", "Suburban", "Colorado", "Silverado 1500", "Silverado 2500HD", "Silverado 3500HD", "Bolt EV", "Bolt EUV"],
  "Chrysler": ["300", "Pacifica", "Voyager"],
  "Dodge": ["Charger", "Challenger", "Durango", "Hornet"],
  "Fiat": ["500X", "500e"],
  "Ford": ["Mustang", "EcoSport", "Escape", "Bronco Sport", "Bronco", "Edge", "Explorer", "Expedition", "Maverick", "Ranger", "F-150", "Super Duty", "Mustang Mach-E", "F-150 Lightning", "Transit"],
  "Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  "GMC": ["Terrain", "Acadia", "Yukon", "Yukon XL", "Canyon", "Sierra 1500", "Sierra 2500HD", "Sierra 3500HD", "Hummer EV"],
  "Honda": ["Civic", "Accord", "HR-V", "CR-V", "Passport", "Pilot", "Odyssey", "Ridgeline", "Prologue"],
  "Hyundai": ["Elantra", "Sonata", "Venue", "Kona", "Tucson", "Santa Cruz", "Santa Fe", "Palisade", "Ioniq 5", "Ioniq 6", "Nexo"],
  "Infiniti": ["Q50", "QX50", "QX55", "QX60", "QX80"],
  "Jaguar": ["XF", "F-TYPE", "E-PACE", "F-PACE", "I-PACE"],
  "Jeep": ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Gladiator", "Wagoneer", "Grand Wagoneer"],
  "Kia": ["Rio", "Forte", "K5", "Stinger", "Soul", "Seltos", "Sportage", "Sorento", "Telluride", "Carnival", "Niro", "EV6", "EV9"],
  "Land Rover": ["Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque", "Discovery", "Discovery Sport", "Defender"],
  "Lexus": ["IS", "ES", "LS", "RC", "LC", "UX", "NX", "RX", "RZ", "GX", "LX", "TX"],
  "Lincoln": ["Corsair", "Nautilus", "Aviator", "Navigator"],
  "Lucid": ["Air", "Gravity"],
  "Maserati": ["Ghibli", "Quattroporte", "MC20", "Grecale", "Levante"],
  "Mazda": ["Mazda3", "CX-30", "CX-5", "CX-50", "CX-90", "MX-5 Miata"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "G-Class", "EQB", "EQE", "EQS"],
  "Mini": ["Hardtop 2 Door", "Hardtop 4 Door", "Convertible", "Clubman", "Countryman"],
  "Mitsubishi": ["Mirage", "Mirage G4", "Eclipse Cross", "Outlander Sport", "Outlander"],
  "Nissan": ["Versa", "Sentra", "Altima", "Maxima", "LEAF", "Kicks", "Rogue", "Murano", "Pathfinder", "Armada", "Frontier", "Titan", "Z", "ARIYA"],
  "Polestar": ["Polestar 2", "Polestar 3"],
  "Porsche": ["718 Boxster", "718 Cayman", "911", "Taycan", "Panamera", "Macan", "Cayenne"],
  "Ram": ["1500", "1500 Classic", "2500", "3500", "ProMaster"],
  "Rivian": ["R1T", "R1S"],
  "Subaru": ["Impreza", "Legacy", "Crosstrek", "Forester", "Outback", "Ascent", "BRZ", "WRX", "Solterra"],
  "Tesla": ["Model 3", "Model Y", "Model S", "Model X", "Cybertruck"],
  "Toyota": ["Corolla", "Prius", "Camry", "Crown", "Mirai", "GR86", "GR Supra", "Tacoma", "Tundra", "4Runner", "Highlander", "Grand Highlander", "RAV4", "Venza", "Sequoia", "Land Cruiser", "Sienna", "bZ4X"],
  "Volkswagen": ["Jetta", "Golf GTI", "Golf R", "Arteon", "Taos", "Tiguan", "Atlas", "Atlas Cross Sport", "ID.4", "ID. Buzz"],
  "Volvo": ["S60", "S90", "V60 Cross Country", "V90 Cross Country", "XC40", "XC60", "XC90", "C40 Recharge", "EX30", "EX90"]
};

export const YEARS = Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i);

export const DEFAULT_QUERY = {
  year: new Date().getFullYear(),
  make: "",
  model: "",
  condition: Condition.New,
  zipCode: "",
};