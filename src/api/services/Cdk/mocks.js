const getCdkAreas = {
  data: {
    data: ['Ideas and Opportunities', 'Resources', 'Into Action'],
  },
  status: 200,
};

const getCdkCompetences = {
  data: {
    data: [
      'Spotting opportunities',
      'Design orientation',
      'Creativity',
      'Vision',
      'Valuing ideas',
      'Ethical and sustainable thinking',
      'Self-awareness and self-efficacy',
      'Motivation and perseverance',
      'Financial resources',
      'Enterprising literacy',
      'Mobilising others',
      'Digital Literacy or Digital skills',
      'Taking the initiative',
      'Planning and management',
      'Process Management',
      'Coping with uncertainty, ambiguity and risk',
      'Design validation',
      'Working with others',
      'Learning through experience',
    ],
  },
  status: 200,
};

const getCdkDifficulties = {
  data: {
    data: ['Basic', 'Intermediate', 'Advanced'],
  },
  status: 200,
};

const getCdkList = (queryObject) => {
  return {
    data: {
      data: [
        {
          id: 1,
          name: 'Cdk Module 1',
          area: 'Ideas and Opportunities',
          competence: 'Spotting opportunities',
          difficulty: 'Basic',
        },
        {
          id: 8,
          name: 'Cdk Module 8',
          area: 'Resources',
          competence: 'Mobilising others',
          difficulty: 'Intermediate',
        },
        {
          id: 13,
          name: 'Cdk Module 13',
          area: 'Into Action',
          competence: 'Design validation',
          difficulty: 'Basic',
        },
        {
          id: 2,
          name: 'Cdk Module 2 Very long cdk module name',
          area: 'Ideas and Opportunities',
          competence: 'Design orientation',
          difficulty: 'Intermediate',
        },
        {
          id: 3,
          name: 'Cdk Module 3',
          area: 'Ideas and Opportunities',
          competence: 'Creativity',
          difficulty: 'Advanced',
        },
        {
          id: 4,
          name: 'Cdk Module 4',
          area: 'Ideas and Opportunities',
          competence: 'Vision',
          difficulty: 'Basic',
        },
        {
          id: 5,
          name: 'Cdk Module 5',
          area: 'Ideas and Opportunities',
          competence: 'Valuing ideas',
          difficulty: 'Intermediate',
        },
        {
          id: 6,
          name: 'Cdk Module 6',
          area: 'Resources',
          competence: 'Financial resources',
          difficulty: 'Advanced',
        },
        {
          id: 7,
          name: 'Cdk Module 7',
          area: 'Resources',
          competence: 'Enterprising literacy',
          difficulty: 'Basic',
        },
        {
          id: 9,
          name: 'Cdk Module 9',
          area: 'Into Action',
          competence: 'Taking the initiative',
          difficulty: 'Advanced',
        },
        {
          id: 10,
          name: 'Cdk Module 10',
          area: 'Into Action',
          competence: 'Planning and management',
          difficulty: 'Basic',
        },
        {
          id: 11,
          name: 'Cdk Module 11',
          area: 'Into Action',
          competence: 'Process Management',
          difficulty: 'Intermediate',
        },
        {
          id: 12,
          name: 'Cdk Module 12',
          area: 'Into Action',
          competence: 'Coping with uncertainty, ambiguity and risk',
          difficulty: 'Advanced',
        },
      ].slice(0, queryObject?.limit || Infinity),
      meta: { count: 13 },
    },
    status: 200,
  };
};

const getCdkModule = {
  data: {
    data: {
      id: 1,
      name: 'Cdk Module 1',
      area: 'Ideas and Opportunities',
      competence: 'Spotting opportunities',
      difficulty: 'Basic',
    },
  },
  status: 200,
};

const getCdkModuleRatings = {
  data: {
    data: {
      helpfulness: 3.45,
      trainingResults: 4.12,
      easeOfUse: 4.45,
      interactivity: 4.91,
      count: 21,
    },
  },
  status: 200,
};

const postCdkModuleRating = {
  data: {
    data: 1,
  },
  status: 200,
};

const getCdkImages = [
  {
    id: 0,
    name: '##Picture1.1I1##',
    image:
      'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'photo of brown high-rise building',
  },
  {
    id: 1,
    name: '##Picture1.3B1##',
    image:
      'https://images.unsplash.com/photo-1526644253653-a411eaafdfe6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    alt: 'aurora borealis over body of water during nighttime',
  },
  {
    id: 2,
    name: '##picture1.3B2##',
    image:
      'https://images.unsplash.com/photo-1508500709478-37a0e8d6603c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'landscape photograph of body of water near forest',
  },
  {
    id: 3,
    name: '##Picture1.3B3##',
    image:
      'https://images.unsplash.com/photo-1562263075-da00b5209d88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'house at the farm',
  },
  {
    id: 4,
    name: '##picture1.4B1##',
      image: 'https://images.unsplash.com/photo-1517824488624-8d6e5cdbf991?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      alt: 'landscape photography of brown and white building',
  },
  {
    id: 5,
    name: '##picture1.4B2##',
    image:
      'https://images.unsplash.com/photo-1497217968520-7d8d60b7bc25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    alt: 'rover near road and buildings',
  },
  {
    id: 6,
    name: '##picture1.4B3##',
    image:
      'https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    alt: 'low angle photo of pine trees',
  },
  {
    id: 7,
    name: '##picture1.6A_1###',
    image:
      'https://images.unsplash.com/photo-1596636478939-59fed7a083f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'white and brown concrete building near body of water during daytime',
  },
  {
    id: 8,
    name: '##picture1.6A_2##',
    image:
      'https://images.unsplash.com/photo-1614587396292-8e7aefcee7f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'snow covered trees and road during daytime',
  },
  {
    id: 9,
    name: '##picture1.6A_3##',
    image:
      'https://images.unsplash.com/photo-1633430300352-bcb3420c0ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    alt: 'an aerial view of a lake surrounded by trees',
  },
  {
    id: 10,
    name: '##picture 1.6A_4##',
    image:
      'https://images.unsplash.com/photo-1580339841933-f06ca55842d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    alt: 'brown and white concrete building near body of water during daytime',
  },
  {
    id: 11,
    name: '##picture1.6A_5##',
    image:
      'https://images.unsplash.com/photo-1586716938030-3ae3b95a606b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    alt: 'houses near body of water during daytime',
  },
  {
    id: 12,
    name: '##Picture 3.2B1##',
    image:
      'https://images.unsplash.com/photo-1565039320828-e97535b882e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
    alt: 'lake and forest during day',
  },
  {
    id: 13,
    name: '##Picture 3.3I2##',
    image:
      'https://images.unsplash.com/photo-1593864565255-5ee6fd76838b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'green trees in forest during daytime',
  },
  {
    id: 14,
    name: '##Picture 3.2A1##',
    image:
      'https://images.unsplash.com/photo-1542053266393-27f4dd865ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
    alt: 'brown wooden side way beside river',
  },
  {
    id: 15,
    name: '##Picture1.3.5I.jpg##',
    image:
      'https://images.unsplash.com/photo-1543139465-aa8dc66dc427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'city during nighttime',
  },
  {
    id: 16,
    name: '##Picture2.3.5I.jpg##',
    image:
      'https://plus.unsplash.com/premium_photo-1669049730906-6991d6f6d895?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    alt: 'sweden image',
  },
  {
    id: 17,
    name: '##Picture3.3.5I.jpg##',
    image:
      'https://images.unsplash.com/photo-1446419385500-203d54c0c460?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'red barn',
  },
  {
    id: 18,
    name: '##Picture4.3.5I.jpg##',
    image:
      'https://images.unsplash.com/photo-1600290601473-3b73e4c531c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    alt: 'people sitting on bench near brown concrete building during daytime',
  },
  {
    id: 19,
    name: '##picture3.5A_1##',
    image:
      'https://images.unsplash.com/photo-1536674330301-afcffccf0803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    alt: 'body of water surrounded by trees',
  },
];

export const responses = {
  getCdkAreas,
  getCdkCompetences,
  getCdkDifficulties,
  getCdkList,
  getCdkModule,
  getCdkModuleRatings,
  postCdkModuleRating,
  getCdkImages,
};
