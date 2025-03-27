export default function getFirstName(fullName) {
  if (typeof fullName !== 'string' || !fullName.trim()) {
    return '';
  }
  
  return fullName.trim().split(/\s+/)[0];
}