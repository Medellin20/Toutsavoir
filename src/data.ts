export interface Testimonial {
  id: string;
  author_name: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author_name: 'Sophie',
    content: 'Une expérience enrichissante et des conseils qui résonnent vraiment.',
    rating: 5,
  },
  {
    id: '2',
    author_name: 'Julien',
    content: 'Une guidance bienveillante et précise. Je recommande vivement.',
    rating: 5,
  },
  {
    id: '3',
    author_name: 'Camille',
    content: 'Les réponses apportées m’ont aidée à voir les choses plus clairement.',
    rating: 5,
  },
];

export const services = [
  {
    id: 'mediumnite',
    title: 'Contact avec les défunts',
    description: 'Consultations de médiumnité permettant aux utilisateurs d’explorer symboliquement les liens spirituels avec leurs proches disparus, dans un cadre respectueux et bienveillant.',
  },
  {
    id: 'amour',
    title: 'Mariage et avenir amoureux',
    description: 'Consultations sentimentales consacrées à l’amour, aux relations de couple, aux projets de mariage, à la compatibilité amoureuse et aux perspectives sentimentales.',
  },
  {
    id: 'carriere',
    title: 'Avenir financier et professionnel',
    description: 'Consultations de voyance portant sur les perspectives financières, les opportunités professionnelles, la carrière, les projets et les choix de vie.',
  },
  {
    id: 'tarot',
    title: 'Lecture du tarot',
    description: 'Séances de tirage et d’interprétation des cartes du tarot pour explorer les questions liées à l’amour, au travail, aux finances, aux décisions personnelles et aux perspectives d’avenir.',
  },
  {
    id: 'voyance',
    title: 'Voyance Claire',
    description: 'Découvrez votre avenir avec clarté grâce à nos voyants expérimentés.',
  },
  {
    id: 'astrologie',
    title: 'Astrologie',
    description: "Explorez l'influence des astres sur votre vie quotidienne.",
  },
];
