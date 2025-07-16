export default function getFirstName(fullName) {
  if (typeof fullName !== 'string' || fullName.trim().length === 0) {
    return "Username not found"
  }

  const [firstName] = fullName.trim().split(/\s+/);
  return firstName;
}