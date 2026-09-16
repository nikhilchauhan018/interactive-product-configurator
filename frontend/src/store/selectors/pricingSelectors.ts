import { ConfiguratorState } from '../storeTypes.js';

export const selectPricingQuote = (state: ConfiguratorState) => state.pricing;
export const selectIsPricingLoading = (state: ConfiguratorState) => state.isPricingLoading;
export const selectTotalPrice = (state: ConfiguratorState): number => state.pricing?.total ?? 0;
export const selectFormattedTotalPrice = (state: ConfiguratorState): string => {
  if (!state.pricing) return '$...';
  return `$${state.pricing.total.toFixed(2)}`;
};
