import { Condition, NegotiationTip, PriceBands, VehicleQuery } from "../types";

export const generateNegotiationTips = (
  query: VehicleQuery, 
  priceBands: PriceBands
): NegotiationTip[] => {
  const tips: NegotiationTip[] = [];
  const currentYear = new Date().getFullYear();
  const age = currentYear - query.year;

  // 1. Price Tips
  if (query.condition === Condition.New) {
    tips.push({
      id: 'price-new-1',
      category: 'Price',
      title: 'Focus on "Out-the-Door" Price',
      content: 'Dealers often mix monthly payments with vehicle price. Negotiate the total check you will write, including all fees and taxes.'
    });
    
    if (priceBands.invoice) {
      tips.push({
        id: 'price-new-2',
        category: 'Price',
        title: 'Target Invoice Price',
        content: `The invoice price is ~$${priceBands.invoice.toLocaleString()}. Start your offer near here, not the MSRP.`
      });
    }
  } else {
    tips.push({
      id: 'price-used-1',
      category: 'Price',
      title: 'Use Market Comps',
      content: 'Print out 3 listing listing of similar cars within 50 miles priced lower than this dealer. Use them as leverage.'
    });
  }

  // 2. Age specific
  if (age > 5) {
    tips.push({
      id: 'age-old',
      category: 'Price',
      title: 'Condition is King',
      content: 'For older vehicles, KBB values fluctuate wildly based on condition. Point out every flaw (tires, scratches) to justify a lower offer.'
    });
  }

  // 3. Fees
  tips.push({
    id: 'fee-doc',
    category: 'Fees',
    title: 'Challenge the Doc Fee',
    content: 'If the Doc Fee is over $400, ask them to reduce the selling price of the car by the difference to offset it.'
  });

  tips.push({
    id: 'fee-addon',
    category: 'Fees',
    title: 'Refuse Nitrogen & Etching',
    content: 'These are high-profit items. Tell them you did not ask for them and will not pay for them. They will often waive the cost.'
  });

  // 4. Finance
  tips.push({
    id: 'fin-preapproval',
    category: 'Finance',
    title: 'Get Pre-Approved First',
    content: 'Walk in with a loan offer from your bank or credit union. Ask the dealer to beat that rate. If they can\'t, use your own financing.'
  });

  return tips;
};