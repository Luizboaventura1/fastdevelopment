export default function getFirstName(fullName) {
  if (typeof fullName !== 'string' || fullName.trim().length === 0) {
    return "Sem nome"
  }

  const [firstName] = fullName.trim().split(/\s+/);
  return firstName;
}