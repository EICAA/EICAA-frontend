export const SIZES = {
  MARGIN: 10,
  CONTENT_WIDTH: 190,
  CONTENT_WIDTH_LEFT: 130,
  UNIT_PT: 25.4 / 72, // Given for 72ppi resolution
};

export const getSubmitDate = (submitDate) => {
  return {
    day: submitDate.getDate().toString().padStart(2, '0'),
    month: (submitDate.getMonth() + 1).toString().padStart(2, '0'),
    year: submitDate.getFullYear(),
    hour: submitDate.getHours().toString().padStart(2, '0'),
    minute: submitDate.getMinutes().toString().padStart(2, '0'),
  };
};

export const QUESTIONS_DATA = {
  // Average Z
  AVG: [
    2.43, 2.78, 3.01, 3.18, 2.51, 2.82, 2.61, 2.74, 2.33, 3.3, 3.11, 2.39, 2.52, 2.87, 3.02, 2.63,
    2.5, 2.16, 2.91, 3.11, 3.05, 3.61, 3.21, 3.24, 2.6, 3.21, 3.15, 2.92, 3.32, 3.18, 2.45, 2.95,
    2.44, 2.23, 2.35, 2.91, 3.06, 2.6, 2.26, 3.08, 2.99, 2.76, 2.56, 3.15, 2.65, 3.02, 2.14, 2.89,
    2.12, 3.5, 3.72, 3.13, 3.26, 2.92, 3.07, 2.88, 2.51, 2.51, 3.01, 3.22, 2.85, 2.78, 2.85, 2.49,
    2.31, 2.22, 2.16, 2.55, 3.12, 3.23, 3.33, 3.01, 3.37, 3.28, 2.77, 2.76, 3.24, 3.1, 3.49,
  ],
  // 25th percentile
  P25: [
    2.0, 2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0,
    2.0, 2.0, 3.0, 2.0, 3.0, 2.0, 3.0, 2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0,
    1.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.0, 2.0, 1.0, 3.0, 3.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0,
    2.0, 2.0, 3.0, 2.0, 2.0, 2.0, 2.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 2.0, 3.0, 3.0, 2.0, 2.0,
    3.0, 2.0, 3.0,
  ],
  // 50th percentile
  P50: [
    2.0, 3.0, 3.0, 3.0, 2.0, 3.0, 3.0, 3.0, 2.0, 3.0, 3.0, 2.0, 2.0, 3.0, 3.0, 3.0, 2.0, 2.0, 3.0,
    3.0, 3.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 3.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0,
    2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 3.0, 2.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0,
    2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0,
    3.0, 3.0, 4.0,
  ],
  // 75th percentile
  P75: [
    3.0, 3.0, 4.0, 4.0, 3.0, 4.0, 3.0, 3.0, 3.0, 4.0, 4.0, 3.0, 3.0, 4.0, 4.0, 3.0, 3.0, 3.0, 4.0,
    4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0, 4.0, 3.0, 3.0, 3.0, 4.0, 4.0, 3.0,
    3.0, 4.0, 4.0, 4.0, 3.0, 4.0, 3.0, 4.0, 3.0, 4.0, 3.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 3.0,
    3.0, 4.0, 4.0, 4.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0, 4.0,
    4.0, 4.0, 4.0,
  ],
};

export const COMPETENCES_DATA = {
  // Average Z
  AVG: [
    3.06, 2.75, 2.85, 2.85, 2.38, 3.09, 3.07, 3.24, 2.61, 3.03, 2.89, 2.64, 3.54, 3.13, 3.14, 2.83,
    2.13, 3.17, 3.41,
  ],
  // 25th percentile
  P25: [
    2.75, 2.08, 2.25, 2.33, 1.67, 2.75, 2.75, 2.75, 2.2, 2.5, 2.67, 2.25, 3.0, 2.65, 2.6, 2.08,
    1.33, 2.63, 3.0,
  ],
  // 50th percentile
  P50: [
    3.0, 2.83, 2.8, 3.0, 2.33, 3.0, 3.0, 3.25, 2.6, 3.0, 2.83, 2.5, 3.67, 3.2, 3.2, 3.0, 2.0, 3.25,
    3.33,
  ],
  // 75th percentile
  P75: [
    3.5, 3.33, 3.4, 3.33, 3.0, 3.5, 3.5, 3.75, 3.0, 3.75, 3.29, 3.0, 4.0, 3.6, 3.4, 3.33, 2.67,
    3.72, 3.92,
  ],
};
