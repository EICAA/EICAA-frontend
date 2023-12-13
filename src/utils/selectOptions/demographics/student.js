import { CONDITIONAL_VALUES } from './common';

// Q3
const MAJOR_FIELD_OPTIONS = [
  {
    id: 1,
    value: 'agriculture-forestry-and-fishery',
    translatedName: {
      en: 'Agriculture, forestry and fishery',
      de: 'Biologische Wissenschaften, Landwirtschaft und natürliche Ressourcen',
      nl: 'Landbouw, bosbouw en visserij',
      es: 'Agricultura, silvicultura y pesca',
      fr: 'Agriculture, foresterie et pêcherie',
      hu: 'Mezőgazdaság, erdészet és halászat',
      ca: 'Agricultura, silvicultura i pesca',
    },
  },
  {
    id: 2,
    value: 'architecture-and-building',
    translatedName: {
      en: 'Architecture and building',
      de: 'Architektur und Bauwesen',
      nl: 'Architectuur en gebouw',
      es: 'Arquitectura y edifición',
      fr: 'Architecture et bâtiment',
      hu: 'Építészet és építőipar',
      ca: 'Arquitectura i edificació',
    },
  },
  {
    id: 3,
    value: 'business-and-administration',
    translatedName: {
      en: 'Business and administration',
      de: 'Wirtschaft und Verwaltung',
      nl: 'Zaken en administratie',
      es: 'Negocios y administración',
      fr: 'Entreprise et administration',
      hu: 'Üzlet és közigazgatás',
      ca: "Administració i direcció d'empreses",
    },
  },
  {
    id: 4,
    value: 'computing',
    translatedName: {
      en: 'Computing',
      de: 'Datenverarbeitung/Informatik',
      nl: 'Reken',
      es: 'Informática',
      fr: "L'informatique",
      hu: 'Informatika',
      ca: 'Informàtica',
    },
  },
  {
    id: 5,
    value: 'design',
    translatedName: {
      en: 'Design',
      de: 'Gestaltung/Design',
      nl: 'Ontwerp',
      es: 'Diseño',
      fr: 'Concevoir',
      hu: 'Tervezés',
      ca: 'Disseny',
    },
  },
  {
    id: 6,
    value: 'engineering-and-engineering-trades',
    translatedName: {
      en: 'Engineering and engineering trades',
      de: 'Ingenieurwesen und technische Berufe',
      nl: 'Engineering en Engineering Trades',
      es: 'Ingeniería y oficios de ingeniería',
      fr: "Métiers d'ingénierie et d'ingénierie",
      hu: 'Mérnöki és mérnöki jellegű szakmák',
      ca: "Oficis d'enginyeria i enginyeria",
    },
  },
  {
    id: 7,
    value: 'environmental-protection',
    translatedName: {
      en: 'Environmental protection',
      de: 'Umweltschutz, Umweltwissenschaften',
      nl: 'Milieubescherming',
      es: 'Protección del medio ambiente',
      fr: 'Protection environnementale',
      hu: 'Környezetvédelem',
      ca: 'Protecció del medi ambient',
    },
  },
  {
    id: 8,
    value: 'fine-arts',
    translatedName: {
      en: 'Fine arts',
      de: 'Bildende Künste',
      nl: 'Beeldende kunst',
      es: 'Bellas artes',
      fr: 'Beaux-Arts',
      hu: 'Képzőművészet',
      ca: 'Belles arts',
    },
  },
  {
    id: 9,
    value: 'foreign-languages-and-cultures',
    translatedName: {
      en: 'Foreign languages and cultures',
      de: 'Fremdsprachen und Kulturen',
      nl: 'Vreemde talen en culturen',
      es: 'Lenguas y culturas extranjeras',
      fr: 'Langues et cultures étrangères',
      hu: 'Idegen nyelvek és kultúrák',
      ca: 'Llengües i cultures estrangeres',
    },
  },
  {
    id: 10,
    value: 'graphik-and-audio-visual-arts',
    translatedName: {
      en: 'Graphic and audio-visual arts',
      de: 'Grafische und audiovisuelle Künste',
      nl: 'Grafische en audiovisuele kunst',
      es: 'Artes gráficas, audiovisuales e industrias culturales',
      fr: 'Arts graphiques et audiovisuels',
      hu: 'Grafikai és audiovizuális művészetek',
      ca: 'Arts gràfiques, audiovisuals i indústries culturals',
    },
  },
  {
    id: 11,
    value: 'health',
    translatedName: {
      en: 'Health',
      de: 'Medizin',
      nl: 'Gezondheid',
      es: 'Ciencias de la salud',
      fr: 'Santé',
      hu: 'Egészségügy',
      ca: 'Salut',
    },
  },
  {
    id: 12,
    value: 'journalism-and-information',
    translatedName: {
      en: 'Journalism and information',
      de: 'Journalismus und Information',
      nl: 'Journalistiek en informatie',
      es: 'Periodismo e información',
      fr: 'Journalisme et informations',
      hu: 'Újságírás és tájékoztatás',
      ca: 'Periodisme i informació',
    },
  },
  {
    id: 13,
    value: 'law',
    translatedName: {
      en: 'Law',
      de: 'Rechtswissenschaft',
      nl: 'Wet',
      es: 'Derecho',
      fr: 'Droit',
      hu: 'Jog',
      ca: 'Llei',
    },
  },
  {
    id: 14,
    value: 'life-sciences',
    translatedName: {
      en: 'Life sciences',
      de: 'Lebenswissenschaft',
      nl: 'Levenswetenschappen',
      es: 'Ciencias de la vida',
      fr: 'Sciences de la vie',
      hu: 'Élettudományok',
      ca: 'Ciències de la vida',
    },
  },
  {
    id: 15,
    value: 'manufacturing-and-processing',
    translatedName: {
      en: 'Manufacturing and processing',
      de: 'Fertigung und Verarbeitung',
      nl: 'Productie en verwerking',
      es: 'Fabricación y procesamiento',
      fr: 'Fabrication et traitement',
      hu: 'Gyártás és feldolgozás',
      ca: 'Fabricació i transformació',
    },
  },
  {
    id: 16,
    value: 'mathematics-and-sciences',
    translatedName: {
      en: 'Mathematics and sciences',
      de: 'Mathematik und Naturwissenschaften',
      nl: 'Wiskunde en wetenschappen',
      es: 'Matemáticas y ciencias',
      fr: 'Mathématiques et sciences',
      hu: 'Matematika és természettudományok',
      ca: 'Matemàtiques i ciències',
    },
  },
  {
    id: 17,
    value: 'native-languages',
    translatedName: {
      en: 'Native languages',
      de: 'Einheimische Sprachen',
      nl: 'Moedertalen',
      es: 'Filología, estudios clásicos, lingüística',
      fr: 'Langue maternelle',
      hu: 'Nyelvek',
      ca: 'Filologia, estudis clàssics, lingüística',
    },
  },
  {
    id: 18,
    value: 'other-humanities',
    translatedName: {
      en: 'Other humanities',
      de: 'Andere Geisteswissenschaften',
      nl: 'Andere geesteswetenschappen',
      es: 'Otras humanidades',
      fr: 'Autres sciences humaines',
      hu: 'Egyéb humán tudományok',
      ca: 'Altres humanitats',
    },
  },
  {
    id: 19,
    value: 'performing-arts',
    translatedName: {
      en: 'Performing arts',
      de: 'Darstellende Künste',
      nl: 'Uitvoerende kunst',
      es: 'Artes escénicas',
      fr: 'Arts performants',
      hu: 'Előadóművészet',
      ca: 'Arts escèniques',
    },
  },
  {
    id: 20,
    value: 'personal-services',
    translatedName: {
      en: 'Personal services',
      de: 'Persönliche Dienstleistungen',
      nl: 'Persoonlijke diensten',
      es: 'Servicios personales',
      fr: 'Services personnels',
      hu: 'Személyügyi szolgáltatások',
      ca: 'Serveis personals',
    },
  },
  {
    id: 21,
    value: 'physical-sciences',
    translatedName: {
      en: 'Physical sciences',
      de: 'Physikalische Wissenschaften',
      nl: 'Fysieke wetenschappen',
      es: 'Ciencias fisicas',
      fr: 'Sciences physiques',
      hu: 'Fizika',
      ca: 'Ciències físiques',
    },
  },
  {
    id: 22,
    value: 'religion-and-theology',
    translatedName: {
      en: 'Religion and theology',
      de: 'Religion und Theologie',
      nl: 'Religie en theologie',
      es: 'Religión y teología',
      fr: 'Religion et théologie',
      hu: 'Vallás és teológia',
      ca: 'Religió i teologia',
    },
  },
  {
    id: 23,
    value: 'security-services',
    translatedName: {
      en: 'Security services',
      de: 'Security Management',
      nl: 'Beveiligingsdiensten',
      es: 'Servicios de seguridad',
      fr: 'Services de sécurité',
      hu: 'Biztonsági szolgáltatások ',
      ca: 'Serveis de seguretat',
    },
  },
  {
    id: 24,
    value: 'social-and-behavioral-science',
    translatedName: {
      en: 'Social and behavioral science',
      de: 'Sozial- und Verhaltenswissenschaften',
      nl: 'Sociale en gedragswetenschap',
      es: 'Ciencias sociales y del comportamiento',
      fr: 'Science sociale et comportementale',
      hu: 'Társadalom- és viselkedéstudományok',
      ca: 'Ciències socials i del comportament',
    },
  },
  {
    id: 25,
    value: 'social-services',
    translatedName: {
      en: 'Social services',
      de: 'Soziale Arbeit',
      nl: 'Sociale voorzieningen',
      es: 'Servicios sociales',
      fr: 'Services sociaux',
      hu: 'Szociális szolgáltatások',
      ca: 'Serveis socials',
    },
  },
  {
    id: 26,
    value: 'teacher-training-and-education-science',
    translatedName: {
      en: 'Teacher training and education science',
      de: 'Lehrerausbildung und Erziehungswissenschaft',
      nl: 'Wetenschap van lerarenopleiding en onderwijs',
      es: 'Formación del profesorado y ciencias de la educación',
      fr: "Formation des enseignants et sciences de l'éducation",
      hu: 'Tanárképzés és neveléstudomány',
      ca: "Formació del professorat i ciències de l'educació",
    },
  },
  {
    id: 27,
    value: 'transport-services',
    translatedName: {
      en: 'Transport services',
      de: 'Verkehrswesen',
      nl: 'Transportdiensten',
      es: 'Servicios de transporte',
      fr: 'Services de transport',
      hu: 'Közlekedési szolgáltatások',
      ca: 'Serveis de transport',
    },
  },
  {
    id: 28,
    value: 'veterinary',
    translatedName: {
      en: 'Veterinary',
      de: 'Veterinärwesen',
      nl: 'Veterinair',
      es: 'Veterinaria',
      fr: 'Vétérinaire',
      hu: 'Állatorvoslás',
      ca: 'Veterinari',
    },
  },
  {
    id: 29,
    value: CONDITIONAL_VALUES.OTHER,
    translatedName: {
      en: 'Other',
      de: 'Andere',
      nl: 'Ander',
      es: 'Otros',
      fr: 'Autre',
      hu: 'Egyéb',
      ca: 'Altres',
    },
  },
];

// Q4
// Do you have work or internship experience?

// Q5
const WORK_EXPERIENCE_OPTIONS = [
  {
    id: 1,
    value: '0-2-years',
    translatedName: {
      en: '0-2 years',
      de: '0-2 Jahre',
      nl: '0-2 jaar',
      es: '0-2 años',
      fr: '0-2 ans',
      hu: '0-2 év',
      ca: '0-2 anys',
    },
  },
  {
    id: 2,
    value: '2-5-years',
    translatedName: {
      en: '2-5 years',
      de: '2-5 Jahre',
      nl: '2-5 jaar',
      es: '2-5 años',
      fr: '2-5 ans',
      hu: '2-5 év',
      ca: '2-5 anys',
    },
  },
  {
    id: 3,
    value: '5-10-years',
    translatedName: {
      en: '5-10 years',
      de: '5-10 Jahre',
      nl: '5-10 jaar',
      es: '5-10 años',
      fr: '5-10 ans',
      hu: '5-10 év',
      ca: '5-10 anys',
    },
  },
  {
    id: 4,
    value: '10-plus-years',
    translatedName: {
      en: '>10 years',
      de: '>10 Jahre',
      nl: '>10 jaar',
      es: '>10 años',
      fr: '>10 ans',
      hu: '>10 év',
      ca: '>10 anys',
    },
  },
];

// Q6
// Are you currently performing paid work or internship besides pursuing your studies?

// Q7
const EMPLOYMENT_TYPE_OPTIONS = [
  {
    id: 1,
    value: 'employed',
    translatedName: {
      en: 'Employed',
      de: 'Beschäftigt',
      nl: 'In dienst',
      es: 'Empleado',
      fr: 'Employé',
      hu: 'Munkavállaló',
      ca: 'Treballador per compte aliè (empleat)',
    },
  },
  {
    id: 2,
    value: CONDITIONAL_VALUES.SELF_EMPLOYED,
    translatedName: {
      en: 'Self-employed (e.g., founder of a registered company, sole proprietor, freelancer, etc.)',
      de: 'Selbstständig (z. B. Gründer/in eines eingetragenen Unternehmens, Einzelunternehmer/in, Freiberufler/in usw.)',
      nl: 'Zelfstandige (bijv. Oprichter van een geregistreerd bedrijf, enige eigenaar, freelancer, enz.)',
      es: 'Trabajador por cuenta propia (por ejemplo, fundador de una empresa registrada, propietario único, autónomo, etc.)',
      fr: "Travailleur indépendant (par exemple, fondateur d'une entreprise enregistrée, propriétaire unique, pigiste, etc.)",
      hu: 'Önálló vállalkozó (pl. bejegyzett cég alapítója, egyéni vállalkozó, szabadúszó stb.)',
      ca: "Treballador per compte propi (per exemple, fundador d'una empresa registrada, propietari únic, autònom, etc.)",
    },
  },
];

// Q9
const AGE_OPTIONS = [
  {
    id: 1,
    value: '18-23-years',
    translatedName: {
      en: '18-23 years',
      de: '18-23 Jahre',
      nl: '18-23 jaar',
      es: '18-23 años',
      fr: '18-23 ans',
      hu: '18-23 év',
      ca: '18-23 anys',
    },
  },
  {
    id: 2,
    value: '24-30-years',
    translatedName: {
      en: '24-30 years',
      de: '24-30 Jahre',
      nl: '24-30 jaar',
      es: '24-30 años',
      fr: '24-30 ans',
      hu: '24-30 év',
      ca: '24-30 anys',
    },
  },
  {
    id: 3,
    value: '31-40-years',
    translatedName: {
      en: '31-40 years',
      de: '31-40 Jahre',
      nl: '31-40 jaar',
      es: '31-40 años',
      fr: '31-40 ans',
      hu: '31-40 év',
      ca: '31-40 anys',
    },
  },
  {
    id: 4,
    value: '41-50-years',
    translatedName: {
      en: '41-50 years',
      de: '41-50 Jahre',
      nl: '41-50 jaar',
      es: '41-50 años',
      fr: '41-50 ans',
      hu: '41-50 év',
      ca: '41-50 anys',
    },
  },
  {
    id: 5,
    value: '51-plus-years',
    translatedName: {
      en: '>51 years',
      de: '>51 Jahre',
      nl: '>51 jaar',
      es: '>51 años',
      fr: '>51 ans',
      hu: '>51 év',
      ca: '>51 anys',
    },
  },
];

export {
  CONDITIONAL_VALUES,
  MAJOR_FIELD_OPTIONS,
  WORK_EXPERIENCE_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  AGE_OPTIONS,
};

// Deprecated answers

/* const EDUCATION_MODE_OPTIONS = [
  {
    id: 1,
    value: 'offline',
    translatedName: {
      en: 'Offline',
      de: 'Offline',
      nl: 'Offline',
      es: 'Offline',
      fr: 'Offline',
      hu: 'Offline',
      ca: 'Offline',
    },
  },
  {
    id: 2,
    value: 'online',
    translatedName: {
      en: 'Online',
      de: 'Online',
      nl: 'Online',
      es: 'Online',
      fr: 'Online',
      hu: 'Online',
      ca: 'Online',
    },
  },
  {
    id: 3,
    value: 'hybrid',
    translatedName: {
      en: 'Hybrid',
      de: 'Hybrid',
      nl: 'Hybride',
      es: 'Híbrido',
      fr: 'Hybride',
      hu: 'Hibrid',
      ca: 'Híbrid',
    },
  },
]; */

/* const FOUNDING_YEAR_OPTIONS = Array.from(
  {
    length: new Date().getFullYear() - 1900 + 1,
  },
  (value, i) => ({ value: String(i + 1900), label: String(i + 1900) }),
).reverse(); */
