export interface Pack {
  id: string;
  name: string;
  duration_months: number;
  price: number;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  author_name: string;
  content: string;
  rating: number;
}

export const packs: Pack[] = [
  {
    id: 'decouverte',
    name: 'Découverte',
    duration_months: 1,
    price: 29,
    description: 'Une première guidance pour éclairer votre chemin.',
    features: ['Une consultation personnalisée', 'Réponse sous 48 heures', 'Support par email'],
  },
  {
    id: 'serenite',
    name: 'Sérénité',
    duration_months: 3,
    price: 69,
    description: 'Un accompagnement régulier pour avancer sereinement.',
    features: ['Trois consultations personnalisées', 'Réponse prioritaire', 'Suivi personnalisé'],
  },
  {
    id: 'intuition',
    name: 'Intuition',
    duration_months: 6,
    price: 119,
    description: 'Une guidance approfondie au fil des saisons.',
    features: ['Six consultations personnalisées', 'Disponibilité prioritaire', 'Conseils illimités par email'],
  },
  {
    id: 'destinee',
    name: 'Destinée',
    duration_months: 12,
    price: 199,
    description: 'L’accompagnement complet pour toute votre année.',
    features: ['Douze consultations personnalisées', 'Accès prioritaire permanent', 'Bilan mensuel personnalisé'],
  },
];

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
