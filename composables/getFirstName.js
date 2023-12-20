export default function getFirstName (val) {
  if (val) {
    return (val).split(' ')[0]
  }
  
  return ""
}