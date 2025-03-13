export const validateCard = (description) => {
  let desc = description.replace(/\s+/g, "").trim();
  if (desc.length === 0) return false;

  return true;
};