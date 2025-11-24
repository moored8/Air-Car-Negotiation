export enum Condition {
  New = 'New',
  Used = 'Used',
}

export interface VehicleQuery {
  year: number;
  make: string;
  model: string;
  condition: Condition;
  zipCode: string;
}

export interface PriceBands {
  low: number;
  median: number;
  high: number;
  msrp?: number;
  invoice?: number;
  fairPrice: number;
}

export enum FeeType {
  Negotiable = 'Negotiable',
  NonNegotiable = 'Non-Negotiable',
}

export interface Fee {
  name: string;
  amountLow: number;
  amountHigh: number;
  type: FeeType;
  description: string;
}

export interface InterestRate {
  scoreTier: string;
  aprLow: number;
  aprHigh: number;
}

export interface Incentive {
  title: string;
  description: string;
  type: 'Cash Back' | 'Finance' | 'Lease';
  amount?: number;
}

export interface NegotiationTip {
  id: string;
  title: string;
  content: string;
  category: 'Price' | 'Fees' | 'Finance';
}

export interface DealAnalysisResult {
  query: VehicleQuery;
  pricing: PriceBands;
  fees: Fee[];
  rates: InterestRate[];
  incentives: Incentive[];
  tips: NegotiationTip[];
}