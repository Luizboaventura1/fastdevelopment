export default function convertFirebaseTimestampToDate(input) {
  if (input instanceof Date) {
    return input;
  }

  if (input && typeof input.seconds === "number") {
    return new Date(input.seconds * 1000);
  }

  return null
}
