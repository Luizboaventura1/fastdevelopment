/**
 * Converts various timestamp formats to Date.
 * @param {Date|Object|number|string} input - Value to be converted
 * @returns {Date|null} Date object or null if the input is invalid
 */

export default function convertFirebaseTimestampToDate(input) {
  if (input instanceof Date) return input;

  if (!input) return null;

  const converters = [
    {
      test: (val) => typeof val.seconds === "number",
      convert: (val) => new Date(val.seconds * 1000),
    },
    {
      test: (val) => typeof val === "number" && val > 0,
      convert: (val) => new Date(val),
    },
    {
      test: (val) => typeof val === "string" && !isNaN(Date.parse(val)),
      convert: (val) => new Date(val),
    },
    {
      test: (val) => typeof val.toDate === "function",
      convert: (val) => val.toDate(),
    },
    {
      test: (val) => typeof val._seconds === "number",
      convert: (val) => new Date(val._seconds * 1000),
    },
  ];

  const converter = converters.find(({ test }) => test(input));
  return converter ? converter.convert(input) : null;
}
