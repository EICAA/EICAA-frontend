// Q3
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

// Q4
const WORKING_FIELD_OPTIONS = [
  {
    id: 1,
    value: 'accommodation-and-food-service-activities',
    translatedName: {
      en: 'Accommodation and food service activities',
      de: 'Beherbergungs- und Gaststättengewerbe',
      nl: 'Activiteiten op het gebied van accommodatie en voedselvoorziening',
      es: 'Actividades de alojamiento y restauración',
      fr: 'Accommodation and food service activities', // TODO
      hu: 'Szálláshely-szolgáltatás, vendéglátás',
      ca: 'Allotjament i restauració',
    },
  },
  {
    id: 2,
    value: 'activities-of-extraterritorial-organisations-and-bodies',
    translatedName: {
      en: 'Activities of extraterritorial organisations and bodies',
      de: 'Tätigkeiten von exterritorialen Organisationen und Körperschaften',
      nl: 'Activiteiten van extraterritoriale organisaties en instituten',
      es: 'Actividades de organizaciones y organismos extraterritoriales',
      fr: 'Activities of extraterritorial organisations and bodies',
      hu: 'Külpiaci tevékenység',
      ca: "Activitats d'organitzacions i organismes  extraterritorials",
    },
  },
  {
    id: 3,
    value:
      'activities-of-households-as-employers-undifferentiated-goods-and-services-producing-activities-of-households-for-own-use',
    translatedName: {
      en: 'Activities of households as employers; undifferentiated goods- and services- producing activities of households for own use',
      de: 'Private Haushalte als Arbeitgeber; Herstellung von Waren und Erbringung von Dienstleistungen durch private Haushalte für den Eigenbedarf ohne ausgeprägten Schwerpunkt',
      nl: 'Activiteiten van huishoudens als werkgever; ongedifferentieerde goederen- en dienstenproducerende activiteiten van huishoudens voor eigen gebruik',
      es: 'Actividades de los hogares como empleadores; actividades indiferenciadas de producción de bienes y servicios de los hogares',
      fr: 'Activities of households as employers; undifferentiated goods- and services- producing activities of households for own use',
      hu: 'Háztartásbeli vagy őstermelői- ill. családi gazdálkodói tevékenység',
      ca: 'Producció de béns i serveis per a les llars; activitats de les llars com a ocupadors',
    },
  },
  {
    id: 4,
    value: 'administrative-and-support-service-activities',
    translatedName: {
      en: 'Administrative and support service activities',
      de: 'Administrative und unterstützende Dienstleistungen',
      nl: 'Administratieve en ondersteunende diensten',
      es: 'Actividades de servicios administrativos y de apoyo',
      fr: 'Administrative and support service activities',
      hu: 'Adminisztratív illetve üzleti támogató tevékenység',
      ca: 'Activitats administratives i serveis de suport',
    },
  },
  {
    id: 5,
    value: 'agriculture-forestry-and-fishing',
    translatedName: {
      en: 'Agriculture, forestry and fishing',
      de: 'Land- und Forstwirtschaft, Fischerei',
      nl: 'Landbouw, bosbouw en visserij',
      es: 'Agricultura, silvicultura y pesca',
      fr: 'Agriculture, forestry and fishing',
      hu: 'Mezőgazdaság, erdőgazdálkodás, halászat',
      ca: 'Agricultura, silvicultura i pesca',
    },
  },
  {
    id: 6,
    value: 'arts-entertainment-and-recreation',
    translatedName: {
      en: 'Arts, entertainment and recreation',
      de: 'Kunst, Unterhaltung und Erholung',
      nl: 'Kunst, entertainment en recreatie',
      es: 'Arte, entretenimiento y recreación',
      fr: 'Arts, entertainment and recreation',
      hu: 'Művészet, szórakoztatás, szabadidős tevékenység',
      ca: 'Arts, entreteniment i recreació',
    },
  },
  {
    id: 7,
    value: 'construction',
    translatedName: {
      en: 'Construction',
      de: 'Baugewerbe',
      nl: 'Constructie',
      es: 'Construcción',
      fr: 'Construction',
      hu: 'Építőipar',
      ca: 'Construcció',
    },
  },
  {
    id: 8,
    value: 'education',
    translatedName: {
      en: 'Education',
      de: 'Bildung',
      nl: 'Onderwijs',
      es: 'Educación',
      fr: 'Education',
      hu: 'Oktatás',
      ca: 'Educació',
    },
  },
  {
    id: 9,
    value: 'electricity-gas-steam-and-air-conditioning-supply',
    translatedName: {
      en: 'Electricity, gas, steam, and air conditioning supply',
      de: 'Versorgung mit Elektrizität, Gas, Dampf und Klimaanlagen',
      nl: 'Leveren van elektriciteit, gas, stoom en airconditioning',
      es: 'Suministro de electricidad, gas, vapor y aire acondicionado',
      fr: 'Electricity, gas, steam, and air conditioning supply',
      hu: 'Villamosenergia-, gáz-, gőzellátás, légkondicionálás',
      ca: "Subministrament d'electricitat, gas, vapor i aire condicionat",
    },
  },
  {
    id: 10,
    value: 'financial-and-insurance-activities',
    translatedName: {
      en: 'Financial and insurance activities',
      de: 'Finanz- und Versicherungsdienstleistungen',
      nl: 'Financiële activiteiten en verzekeringen',
      es: 'Actividades financieras y de seguros',
      fr: 'Financial and insurance activities',
      hu: 'Pénzügyi és biztosítási tevékenység',
      ca: "Activitats financeres i d'assegurances",
    },
  },
  {
    id: 11,
    value: 'human-health-and-social-work-activities',
    translatedName: {
      en: 'Human health and social work activities',
      de: 'Gesundheits- und Sozialwesen',
      nl: 'Menselijke gezondheidszorg en maatschappelijke dienstverlening',
      es: 'Salud humana y actividades de trabajo social',
      fr: 'Human health and social work activities',
      hu: 'Humán-egészségügyi, szociális ellátás',
      ca: 'Salut humana i treball social',
    },
  },
  {
    id: 12,
    value: 'information-and-communication',
    translatedName: {
      en: 'Information and communication',
      de: 'Information und Kommunikation',
      nl: 'Informatie en communicatie',
      es: 'Información y comunicación',
      fr: 'Information and communication',
      hu: 'Információ és infokommunikáció',
      ca: 'Informació i comunicació',
    },
  },
  {
    id: 13,
    value: 'mining-and-quarrying',
    translatedName: {
      en: 'Mining and quarrying',
      de: 'Bergbau und Gewinnung von Steinen und Erden',
      nl: 'Winning van delfstoffen',
      es: 'Explotación de minas y canteras',
      fr: 'Mining and quarrying',
      hu: 'Bányászat, kitermelőipar',
      ca: 'Mineria i pedrera',
    },
  },
  {
    id: 14,
    value: 'manufacturing',
    translatedName: {
      en: 'Manufacturing',
      de: 'Verarbeitendes Gewerbe',
      nl: 'Industrie',
      es: 'Fabricación',
      fr: 'Manufacturing',
      hu: 'Feldolgozóipar',
      ca: 'Fabricació, indústria manufacturera',
    },
  },
  {
    id: 15,
    value: 'other-service-activities',
    translatedName: {
      en: 'Other service activities',
      de: 'Sonstige Dienstleistungstätigkeiten',
      nl: 'Andere diensten',
      es: 'Otros servicios',
      fr: 'Other service activities',
      hu: 'Egyéb szolgáltatás',
      ca: 'Altres activitats de serveis',
    },
  },
  {
    id: 16,
    value: 'professional-scientific-and-technical-activities',
    translatedName: {
      en: 'Professional, scientific and technical activities',
      de: 'Berufliche, wissenschaftliche und technische Tätigkeiten',
      nl: 'Vrije beroepen en wetenschappelijke en technische activiteiten',
      es: 'Actividades profesionales, científicas y técnicas',
      fr: 'Professional, scientific and technical activities',
      hu: 'Szakmai, tudományos, műszaki tevékenység',
      ca: 'Activitats professionals, científiques i tècniques',
    },
  },
  {
    id: 17,
    value: 'public-administration-and-defence-compulsory-social-security',
    translatedName: {
      en: 'Public administration and defence; compulsory social security',
      de: 'Öffentliche Verwaltung, Verteidigung, Sozialversicherung',
      nl: 'Openbaar bestuur en defensie; verplichte sociale verzekeringen',
      es: 'Administración pública y defensa; seguridad social',
      fr: 'Public administration and defence; compulsory social security',
      hu: 'Közigazgatás, rendvédelem, társadalombiztosítás',
      ca: 'Administració pública i defensa; seguretat social',
    },
  },
  {
    id: 18,
    value: 'real-estate-activities',
    translatedName: {
      en: 'Real estate activities',
      de: 'Grundstücks- und Wohnungswesen',
      nl: 'Exploitatie van en handel in onroerend goed',
      es: 'Actividades inmobiliarias',
      fr: 'Real estate activities',
      hu: 'Ingatlan gazdálkodás',
      ca: 'Activitats immobiliàries',
    },
  },
  {
    id: 19,
    value: 'transportation-and-storage',
    translatedName: {
      en: 'Transportation and storage',
      de: 'Transport, Logistik und Lagerung',
      nl: 'Vervoer en opslag',
      es: 'Transporte y almacenamiento',
      fr: 'Transportation and storage',
      hu: 'Szállítás, raktározás',
      ca: 'Transport, logística i emmagatzematge',
    },
  },
  {
    id: 20,
    value: 'water-supply-sewerage-waste-management-and-remediation-activities',
    translatedName: {
      en: 'Water supply; sewerage, waste management and remediation activities',
      de: 'Wasserversorgung; Abwasser- und Abfallentsorgung und Sanierungsmaßnahmen',
      nl: 'Distributie van water; afval- en afvalwaterbeheer en sanering',
      es: 'Abastecimiento de agua; actividades de alcantarillado, gestión de residuos y remediación',
      fr: 'Water supply; sewerage, waste management and remediation activities',
      hu: 'Vízellátás, csatornázás, hulladékgazdálkodás, köztisztasági tevékenység ',
      ca: "Subministrament d'aigua; activitats de clavegueram, gestió de residus i remediació ",
    },
  },
  {
    id: 21,
    value: 'wholesale-and-retail-trade-repair-of-motor-vehicles-and-motorcycles',
    translatedName: {
      en: 'Wholesale and retail trade; repair of motor vehicles and motorcycles',
      de: 'Handel; Instandhaltung und Reparatur von Kraftwagen und Krafträdern',
      nl: "Groot- en detailhandel; reparatie van auto's en motorfietsen",
      es: 'Comercio al por mayor y al por menor; Reparación de vehículos de motor y motocicletas',
      fr: 'Wholesale and retail trade; repair of motor vehicles and motorcycles',
      hu: 'Nagy- és kiskereskedelem, járműjavítás',
      ca: "Comerç a l'engròs i al detall; reparació de vehicles de motor i motocicletes",
    },
  },
];

// Q5
const ORGANISATION_TYPE_OPTIONS = [
  {
    id: 1,
    value: 'private',
    translatedName: {
      en: 'Private',
      de: 'Privat',
      nl: 'Privaat',
      es: 'Privado',
      fr: 'Private',
      hu: 'Magánvállalkozás',
      ca: 'Privada',
    },
  },
  {
    id: 2,
    value: 'public',
    translatedName: {
      en: 'Public',
      de: 'Öffentlich',
      nl: 'Publiek',
      es: 'Público',
      fr: 'Public',
      hu: 'Köztulajdonban álló szervezet vagy cég',
      ca: 'Pública',
    },
  },
  {
    id: 3,
    value: 'other',
    translatedName: {
      en: 'Other',
      de: 'Andere',
      nl: 'Andere',
      es: 'Otro',
      fr: 'Other',
      hu: 'Egyéb',
      ca: 'Altres',
    },
  },
];

// Q6
const ORGANISATION_SIZE_OPTIONS = [
  {
    id: 1,
    value: 'large',
    translatedName: {
      en: 'Large (≥250 employees & > € 50 million turnover per annum)',
      de: 'Groß (≥250 Mitarbeitende)',
      nl: 'Groot (≥250 werknemers)',
      es: 'Grande (≥250 empleados)',
      fr: 'Large (≥250 employees & > € 50 million turnover per annum)',
      hu: 'Nagy (legalább 250 alkalmazott)',
      ca: 'Gran (≥250 empleats)',
    },
  },
  {
    id: 2,
    value: 'medium',
    translatedName: {
      en: 'Medium sized (50-249 employees & ≤ € 50 million turnover per annum)',
      de: 'Mittelständisch (50-249 Mitarbeitende)',
      nl: 'Middelgroot (50-249 werknemers)',
      es: 'Mediano (50-249 empleados)',
      fr: 'Medium sized (50-249 employees & ≤ € 50 million turnover per annum)',
      hu: 'Középméretű (50-249 alkalmazott)',
      ca: 'Mitjana (50-249 empleats)',
    },
  },
  {
    id: 3,
    value: 'small',
    translatedName: {
      en: 'Small (10-49 employees & ≤ € 10 million turnover per annum)',
      de: 'Klein (10-49 Mitarbeitende)',
      nl: 'Klein (10-49 werknemers)',
      es: 'Pequeño (10-49 empleados)',
      fr: 'Small (10-49 employees & ≤ € 10 million turnover per annum)',
      hu: 'Kicsi (10-49 alkalmazott)',
      ca: 'Petita (10-49 empleats)',
    },
  },
  {
    id: 4,
    value: 'micro',
    translatedName: {
      en: 'Micro (<10 employees & ≤ € 2 million turnover per annum)',
      de: 'Kleinstunternehmen (<10 Mitarbeitende )',
      nl: 'Micro (<10 werknemers)',
      es: 'Micro (<10 empleados)',
      fr: 'Micro (<10 employees & ≤ € 2 million turnover per annum)',
      hu: 'Mikro (<10 alkalmazott)',
      ca: 'Micro (menys de 10 empleats)',
    },
  },
];

// Q7
const LEVEL_OF_POSITION_OPTIONS = [
  {
    id: 1,
    value: 'executive-or-senior-management',
    translatedName: {
      en: 'Executive or senior management',
      de: 'Geschäftsleitung oder Senior Management',
      nl: 'Uitvoerend of senior management',
      es: 'Ejectivo/a o alta dirección',
      fr: 'Executive or senior management',
      hu: 'Ügyvezető vagy felsővezető',
      ca: 'Executiu/va o alta direcció',
    },
  },
  {
    id: 2,
    value: 'middle-management',
    translatedName: {
      en: 'Middle management',
      de: 'Mittleres Management',
      nl: 'Middenkader',
      es: 'Mando intermedio',
      fr: 'Middle management',
      hu: 'Középvezető',
      ca: 'Comandament intermedi',
    },
  },
  {
    id: 3,
    value: 'first-level-management',
    translatedName: {
      en: 'First-level management',
      de: 'Erste Führungsebene',
      nl: 'Eerstelijns management',
      es: 'Gestión de primer nivel',
      fr: 'First-level management',
      hu: 'Csoportvezető',
      ca: 'Comandament de primer nivell',
    },
  },
  {
    id: 4,
    value: 'intermediate-or-experienced-senior-staff',
    translatedName: {
      en: 'Intermediate or experienced (senior staff)',
      de: 'Mittleres oder erfahrenes Management (leitende Angestellte)',
      nl: 'Gemiddeld of ervaren (senior personeel)',
      es: 'Trabajador/a cualificado/a',
      fr: 'Intermediate or experienced (senior staff)',
      hu: 'Tapasztalt munkavállaló',
      ca: 'Treballador/a qualificat/a',
    },
  },
  {
    id: 5,
    value: 'entry-level',
    translatedName: {
      en: 'Entry level',
      de: 'Einstiegsebene',
      nl: 'Instapniveau',
      es: 'Trabajador/a de baja cualificación',
      fr: 'Entry level',
      hu: 'Kezdő munkavállaló',
      ca: 'Treballador/a de baixa qualificació',
    },
  },
];

// Q9
const AGE_OPTIONS = [
  {
    id: 1,
    value: '18-24-years',
    translatedName: {
      en: '18-24 years',
      de: '18-24 Jahre',
      nl: '18-24 jaar',
      es: '18-24 años',
      fr: '18-24 ans',
      hu: '18-24 év',
      ca: '18-24 anys',
    },
  },
  {
    id: 2,
    value: '25-34-years',
    translatedName: {
      en: '25-34 years',
      de: '25-34 Jahre',
      nl: '25-34 jaar',
      es: '25-34 años',
      fr: '25-34 ans',
      hu: '25-34 év',
      ca: '25-34 anys',
    },
  },
  {
    id: 3,
    value: '35-44-years',
    translatedName: {
      en: '35-44 years',
      de: '35-44 Jahre',
      nl: '35-44 jaar',
      es: '35-44 años',
      fr: '35-44 ans',
      hu: '35-44 év',
      ca: '35-44 anys',
    },
  },
  {
    id: 4,
    value: '45-54-years',
    translatedName: {
      en: '45-54 years',
      de: '45-54 Jahre',
      nl: '45-54 jaar',
      es: '45-54 años',
      fr: '45-54 ans',
      hu: '45-54 év',
      ca: '45-54 anys',
    },
  },
  {
    id: 5,
    value: '55-64-years',
    translatedName: {
      en: '55-64 years',
      de: '55-64 Jahre',
      nl: '55-64 jaar',
      es: '55-64 años',
      fr: '55-64 ans',
      hu: '55-64 év',
      ca: '55-64 anys',
    },
  },
  {
    id: 6,
    value: '65-plus-years',
    translatedName: {
      en: '>65 years',
      de: '>65 Jahre',
      nl: '>65 jaar',
      es: '>65 años',
      fr: '>65 ans',
      hu: '>65 év',
      ca: '>65 anys',
    },
  },
];

export {
  WORK_EXPERIENCE_OPTIONS,
  WORKING_FIELD_OPTIONS,
  ORGANISATION_TYPE_OPTIONS,
  ORGANISATION_SIZE_OPTIONS,
  LEVEL_OF_POSITION_OPTIONS,
  AGE_OPTIONS,
};
