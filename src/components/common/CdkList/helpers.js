export const calculateCdkModuleCount = containerHeight => {
  const headerHeight = 52;
  const bottomPadding = 14;
  const moduleHeight = 51;

  if (!containerHeight) {
    return;
  }

  return Math.floor((containerHeight - headerHeight - bottomPadding) / moduleHeight) || 1;
};
