/**
 * Format a number to currency format with thousands separator
 * @param value - The number to format
 */
export const formatCurrency = (value: number): string => {
  // For very small numbers, use scientific notation
  if (Math.abs(value) < 0.01 && value !== 0) {
    return value.toExponential(2);
  }
  
  // For regular numbers, use toLocaleString
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Format a number with appropriate precision
 * @param value - The number to format
 */
export const formatNumber = (value: number): string => {
  // For very small numbers, use scientific notation
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(6);
  }
  
  // For larger numbers
  if (value >= 1000) {
    return value.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
  
  // For decimals
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: value < 0.1 ? 8 : 4
  });
};