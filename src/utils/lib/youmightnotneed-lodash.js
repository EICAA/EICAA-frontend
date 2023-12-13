// Reference: https://youmightnotneed.com/lodash/#get
// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
const objectGet = (obj, path, defValue) => {
  // If path is not defined or it has false value
  if (!path) return undefined;
  // Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
  // Regex explained: https://regexr.com/58j0k
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  // Find value
  const result = pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj);
  // If found value is undefined return default value; otherwise return the value
  return result === undefined ? defValue : result;
};

const objectKeep = (obj, fieldList) => {
  if (obj) {
    return fieldList.reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
  }
};

const objectOmit = (obj, fieldList) => {
  if (obj) {
    const newObj = { ...obj };

    for (let key of fieldList) {
      delete newObj[key];
    }

    return newObj;
  }
};

export { objectGet, objectKeep, objectOmit };
