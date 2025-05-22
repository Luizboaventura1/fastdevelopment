export const validateCard = (description) => {
  if (typeof description !== 'string') return false;

  return description.trim().length > 0;
};