export const isValidCardDescription = (description) => {
  return description.trim().length > 0 && typeof description === "string";
};
