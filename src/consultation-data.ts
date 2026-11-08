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
  "pendule": [
    {"id": "pendulumQuestion", "label": "Quelle question précise souhaitez-vous poser au pendule ?", "required": true},
    {"id": "context", "label": "Quel contexte aiderait à comprendre votre question ?"},
    {"id": "choices", "label": "Quelles possibilités ou quels choix souhaitez-vous explorer ?"},
  ],
  "ressenti-photo": [
    {"id": "photoSubject", "label": "Souhaitez-vous un ressenti sur vous-même ou sur une situation personnelle ?", "required": true},
    {"id": "photoContext", "label": "De quand date la photo et dans quel contexte a-t-elle été prise ?"},
    {"id": "photoFocus", "label": "Quels aspects souhaitez-vous explorer à partir de cette photo ?"},
  ],
  "magnetisme": [
    {"id": "currentEnergy", "label": "Comment décririez-vous votre état d’énergie et votre ressenti actuel ?", "required": true},
    {"id": "relaxationGoal", "label": "Que souhaitez-vous privilégier pendant cette séance de détente ?"},
    {"id": "energyExperience", "label": "Avez-vous déjà expérimenté une séance de magnétisme ?"},
  ],
  "lithotherapie": [
    {"id": "stoneIntention", "label": "Quelle intention souhaitez-vous associer aux pierres ?", "required": true},
    {"id": "stones", "label": "Utilisez-vous déjà des pierres ? Si oui, lesquelles ?"},
    {"id": "stoneUse", "label": "Comment aimeriez-vous les intégrer à votre quotidien ?"},
  ],
  "eveil-spirituel": [
    {"id": "awakening", "label": "Quelles expériences vous amènent à parler d’éveil spirituel ?", "required": true},
    {"id": "innerQuestions", "label": "Quelles questions se présentent dans votre cheminement intérieur ?"},
    {"id": "practices", "label": "Quelles pratiques spirituelles vous accompagnent actuellement ?"},
  ],
  "travailleurs-lumiere": [
    {"id": "calling", "label": "Que représente pour vous le fait d’être travailleur de lumière ?", "required": true},
    {"id": "supportOthers", "label": "Comment souhaitez-vous mettre votre sensibilité au service des autres ?"},
    {"id": "boundaries", "label": "Quelles limites personnelles souhaitez-vous apprendre à préserver ?"},
  ],
  "messages-guides": [
    {"id": "guidesQuestion", "label": "Quelle question souhaitez-vous explorer à travers les messages des guides ?", "required": true},
    {"id": "guideSigns", "label": "Quels signes, symboles ou ressentis vous ont marqué(e) ?"},
    {"id": "guidePractice", "label": "Avez-vous déjà une pratique de connexion à vos guides spirituels ?"},
  ],
  "nettoyage-energetique": [
    {"id": "cleansingTarget", "label": "Souhaitez-vous consacrer cette séance à vous-même ou à un lieu ?", "required": true},
    {"id": "atmosphere", "label": "Comment décririez-vous votre ressenti ou l’ambiance de ce lieu ?"},
    {"id": "cleansingIntention", "label": "Quelle ambiance ou quel état intérieur souhaitez-vous retrouver ?"},
  ],
  "protection-spirituelle": [
    {"id": "protectionNeed", "label": "Dans quelles situations ressentez-vous le besoin de vous recentrer ?", "required": true},
    {"id": "personalLimits", "label": "Quelles limites souhaitez-vous poser dans votre quotidien ?"},
    {"id": "protectionPractice", "label": "Quelles pratiques vous aident déjà à vous sentir serein(e) ?"},
  ],
  "chakras": [
    {"id": "balance", "label": "Comment décririez-vous votre équilibre émotionnel actuel ?", "required": true},
    {"id": "chakraFocus", "label": "Y a-t-il un chakra ou une intention sur lequel vous souhaitez vous concentrer ?"},
    {"id": "visualisation", "label": "Avez-vous déjà pratiqué la méditation ou la visualisation autour des chakras ?"},
  ],
  "rituels-amour-abondance": [
    {"id": "ritualIntention", "label": "Quelle intention souhaitez-vous poser : amour, abondance ou les deux ?", "required": true},
    {"id": "personalGoal", "label": "Quel changement personnel souhaitez-vous accompagner avec ce rituel ?"},
    {"id": "ritualPreferences", "label": "Avez-vous des préférences ou des pratiques que vous souhaitez éviter ?"},
  ],
  "numerologie": [
    {"id": "birthDate", "label": "Quelle est votre date de naissance (jour, mois, année) ?", "required": true},
    {"id": "birthName", "label": "Quels sont vos nom et prénoms de naissance ?"},
    {"id": "numerologyFocus", "label": "Quel aspect de votre chemin de vie souhaitez-vous explorer ?"},
  ],
  "reves": [
    {"id": "dreamStory", "label": "Racontez le rêve que vous souhaitez explorer, avec les détails dont vous vous souvenez.", "required": true},
    {"id": "dreamEmotions", "label": "Quelles émotions avez-vous ressenties pendant le rêve et au réveil ?"},
    {"id": "dreamRecurrence", "label": "Ce rêve est-il récurrent et fait-il écho à une situation actuelle ?"},
  ],
  "meditation": [
    {"id": "wellbeingGoal", "label": "Quel est votre objectif de bien-être pour cette séance ?", "required": true},
    {"id": "meditationExperience", "label": "Avez-vous déjà pratiqué la méditation ?"},
    {"id": "meditationPreferences", "label": "Quelle durée et quel type de pratique vous conviendraient le mieux ?"},
  ],
  "guidance-spirituelle": [
    {"id": "spiritualQuestion", "label": "Quelle question souhaitez-vous approfondir dans cette guidance ?", "required": true},
    {"id": "lifeStage", "label": "Quelle étape de vie traversez-vous actuellement ?"},
    {"id": "spiritualValues", "label": "Quelles convictions ou valeurs souhaitez-vous voir respectées pendant cet échange ?"},
  ],
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
