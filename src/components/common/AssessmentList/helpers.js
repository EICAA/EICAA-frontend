export const calculateCardCount = () => {
  const containerWidth = window.innerWidth - 1080;
  const containerHeight = window.innerHeight - 270;

  const cardTotalWidth = 350; // was 330
  const cardTotalHeight = 235;

  const columnsCalculated = Math.floor(containerWidth / cardTotalWidth);
  const rowsCalculated = Math.floor(containerHeight / cardTotalHeight);

  const columns = Math.max(columnsCalculated, 1);
  const rows = Math.max(rowsCalculated, 1);

  return rows * columns;
};

export const calculateArchivedCardCount = () => {
  const containerWidth = window.innerWidth - 388;
  const containerHeight = window.innerHeight - 270;

  const cardTotalWidth = 350; // was 330
  const cardTotalHeight = 235;

  const columnsCalculated = Math.floor(containerWidth / cardTotalWidth);
  const rowsCalculated = Math.floor(containerHeight / cardTotalHeight);

  const columns = Math.max(columnsCalculated, 1);
  const rows = Math.max(rowsCalculated, 1);

  return rows * columns;
};
