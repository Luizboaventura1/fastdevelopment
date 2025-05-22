export default function getFirstName(fullName) {
  if (typeof fullName !== 'string' || fullName.trim().length === 0) {
    throw new Error("A valid non-empty name string is required.");
  }

  const [firstName] = fullName.trim().split(/\s+/);
  return firstName;
}