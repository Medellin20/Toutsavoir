export interface Question {
  id: string;
  label: string;
  options?: string[];
  required?: boolean;
}

const topicOptions = ['Amour et relations', 'Travail et finances', 'Famille et entourage', 'Bien-être et état intérieur', 'Parcours et choix de vie', 'Spiritualité et sens'];

export const commonQuestions: Question[] = [
  { id: 'reason', label: 'Qu’est-ce qui vous amène aujourd’hui ?', required: true },
  { id: 'experience', label: 'Avez-vous déjà consulté une voyante ou un médium auparavant ?', options: ['Oui', 'Non', 'Je préfère ne pas répondre'] },
];

export const serviceQuestions: Record<string, Question[]> = {
  parentalite: [
    { id: 'familyProject', label: 'Quel projet de parentalité souhaitez-vous explorer ?' },
    { id: 'parenthoodQuestions', label: 'Quelles interrogations avez-vous sur votre chemin vers la parentalité ?' },
    { id: 'aspirations', label: 'Quelles sont vos aspirations pour votre avenir familial ?' },
  ],
  mediumnite: [
    { id: 'connection', label: 'Avez-vous perdu un proche avec qui vous aimeriez « garder le lien » ?' },
    { id: 'family', label: 'Y a-t-il des tensions ou des non-dits dans votre famille ?' },
    { id: 'support', label: 'Vous sentez-vous soutenu(e) par votre entourage ?' },
    { id: 'signs', label: 'Avez-vous déjà vécu des signes, coïncidences ou intuitions qui vous ont marqué(e) ?' },
  ],
  amour: [
    { id: 'relationship', label: 'Êtes-vous actuellement en couple, ou en recherche ?', options: ['En couple', 'En recherche', 'Situation compliquée', 'Je préfère ne pas répondre'] },
    { id: 'concern', label: 'Y a-t-il une relation ou un projet de mariage qui vous questionne ?' },
    { id: 'separation', label: 'Une rupture ou une séparation vous pèse-t-elle encore ?' },
    { id: 'wish', label: 'Que cherchez-vous le plus dans une relation ?' },
  ],
  carriere: [
    { id: 'work', label: 'Êtes-vous satisfait(e) de votre situation professionnelle ?' },
    { id: 'change', label: 'Envisagez-vous un changement (poste, reconversion, projet) ?' },
    { id: 'finances', label: 'Une décision financière importante vous attend-elle ?' },
    { id: 'future', label: 'Où vous voyez-vous dans un ou deux ans ?' },
  ],
  tarot: [
    { id: 'topic', label: 'Y a-t-il un sujet précis qui vous préoccupe ?', options: topicOptions, required: true },
    { id: 'decision', label: 'Quelle décision importante devez-vous prendre prochainement ?' },
    { id: 'block', label: 'Ressentez-vous un blocage, une fatigue ou un sentiment de stagnation ?' },
    { id: 'change', label: 'Qu’aimeriez-vous changer dans votre vie si vous le pouviez ?' },
  ],
  voyance: [
    { id: 'topic', label: 'Y a-t-il un sujet précis qui vous préoccupe ?', options: topicOptions, required: true },
    { id: 'decision', label: 'Quelle décision importante devez-vous prendre prochainement ?' },
    { id: 'past', label: 'Y a-t-il un événement passé que vous n’avez pas fini de digérer ?' },
    { id: 'future', label: 'Où vous voyez-vous dans un ou deux ans ?' },
  ],
  astrologie: [
    { id: 'topic', label: 'Y a-t-il un sujet précis qui vous préoccupe ?', options: topicOptions, required: true },
    { id: 'spirituality', label: 'Avez-vous des croyances ou pratiques spirituelles ?' },
    { id: 'dreams', label: 'Dormez-vous bien ? Avez-vous des rêves marquants ou récurrents ?' },
    { id: 'change', label: 'Qu’aimeriez-vous changer dans votre vie si vous le pouviez ?' },
  ],
};

export const closingQuestions: Question[] = [
  { id: 'expectations', label: 'Qu’attendez-vous de cette consultation ?', options: ['Des réponses', 'Du réconfort', 'Une orientation', 'Autre'] },
  { id: 'additional', label: 'Y a-t-il une question que vous n’avez pas osé poser ou un point à approfondir ?' },
];
