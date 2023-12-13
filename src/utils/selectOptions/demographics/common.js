const CONDITIONAL_VALUES = {
  OTHER: 'other',
  YES: 'yes',
  SELF_EMPLOYED: 'self-employed',
};

const YES_NO_OPTIONS = [
  {
    id: 1,
    value: CONDITIONAL_VALUES.YES,
    translatedName: {
      en: 'Yes',
      de: 'Ja',
      nl: 'Ja',
      es: 'Sí',
      fr: 'Oui',
      hu: 'Igen',
      ca: 'Sí',
    },
  },
  {
    id: 2,
    value: 'no',
    translatedName: {
      en: 'No',
      de: 'Nein',
      nl: 'Nee',
      es: 'No',
      fr: 'Non',
      hu: 'Nem',
      ca: 'No',
    },
  },
];

// Q1
// Country selection

// Q2
const EDUCATION_LEVEL_OPTIONS = [
  {
    id: 1,
    value: 'some-college-credit-no-degree',
    translatedName: {
      en: 'Some college credit, no degree',
      de: 'Einige Hochschulkurse - jedoch kein Abschluss',
      nl: 'Wat universiteitskrediet, geen diploma',
      es: 'Algunos créditos universitarios, sin título',
      fr: 'Un crédit collégial, pas de diplôme',
      hu: 'Diploma nélküli felsőoktatási tanfolyam',
      ca: 'Alguns crèdits universitaris, cap títol',
    },
  },
  {
    id: 2,
    value: 'trade-technical-vocational-training',
    translatedName: {
      en: 'Trade/technical/vocational training',
      de: 'Gewerbliche/technische/berufsbildende Ausbildung',
      nl: 'Handels/technische/beroepsopleiding',
      es: 'Formación comercial/técnica, formación profesional',
      fr: 'Formation commerciale / technique / professionnel',
      hu: 'Kereskedelmi/műszaki/egyéb szakképzés',
      ca: 'Formació professional/tècnica/formació professional',
    },
  },
  {
    id: 3,
    value: 'bachelors-degree',
    translatedName: {
      en: 'Bachelor’s Degree',
      de: 'Bachelor-Abschluss',
      nl: 'Bachelor diploma',
      es: 'Título de grado universitario',
      fr: 'Licence',
      hu: 'Alapdiploma',
      ca: 'Grau universitari',
    },
  },
  {
    id: 4,
    value: 'masters-degree',
    translatedName: {
      en: 'Master’s Degree',
      de: 'Master-Abschluss',
      nl: 'Master diploma',
      es: 'Máster',
      fr: 'Une maîtrise',
      hu: 'Mesterdiploma',
      ca: 'Màster',
    },
  },
  {
    id: 5,
    value: 'doctorate-degree',
    translatedName: {
      en: 'Doctorate degree',
      de: 'Promotion/Doktortitel',
      nl: 'Doctoraatdiploma',
      es: 'Doctorado',
      fr: 'Doctorat',
      hu: 'Doktori fokozat',
      ca: 'Títol de doctor',
    },
  },
];

// Q8
const GENDER_OPTIONS = [
  {
    id: 1,
    value: 'female',
    translatedName: {
      en: 'Female',
      de: 'Weiblich',
      nl: 'Vrouw',
      es: 'Femenina',
      fr: 'Femelle',
      hu: 'Nő',
      ca: 'Femenina',
    },
  },
  {
    id: 2,
    value: 'male',
    translatedName: {
      en: 'Male',
      de: 'Männlich',
      nl: 'Mannelijk',
      es: 'Masculina',
      fr: 'Homme',
      hu: 'Férfi',
      ca: 'Masculina',
    },
  },
  {
    id: 3,
    value: 'nonbinary',
    translatedName: {
      en: 'Non-binary',
      de: 'Nicht-binär',
      nl: 'Niet-binair',
      es: 'No binaria',
      fr: 'Non binaire',
      hu: 'Nem bináris',
      ca: 'No binària',
    },
  },
  {
    id: 4,
    value: 'prefer-not-to-say',
    translatedName: {
      en: 'Prefer not to say',
      de: 'Möchte ich nicht angeben',
      nl: 'Zeg ik liever niet',
      es: 'Prefiero no decirlo',
      fr: 'Je préfère ne pas le dire',
      hu: 'Inkább nem mondanám meg',
      ca: 'Prefereixo no dir-ho',
    },
  },
];

export { CONDITIONAL_VALUES, YES_NO_OPTIONS, EDUCATION_LEVEL_OPTIONS, GENDER_OPTIONS };
