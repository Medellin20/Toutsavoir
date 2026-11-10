export interface VoyantProfile {
  name: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
}
export interface ConsultationRecord {
  id: string;
  serviceId: string;
  booking?: import('./booking-data').BookingSlot;
  createdAt: string;
  language: string;
  answers: Record<string, string>;
}
export const defaultProfile: VoyantProfile = {
  name: 'Madame Luna',
  description: 'Une seule voyante vous accompagne pour tous les services Orialune.',
  phone: '',
  whatsapp: '',
  email: 'contacts@orialune.space',
  hours: '',
};

export interface FeedbackRecord {
  id: string;
  kind: 'review' | 'suggestion';
  name: string;
  email: string;
  message: string;
  rating: number | null;
  createdAt: string;
}
