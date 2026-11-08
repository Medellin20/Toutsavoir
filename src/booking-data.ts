export const bookingDurations = [15, 30, 60] as const;
export const bookingTimezone = 'Africa/Porto-Novo';
export interface BookingSlot { start: string; duration: number }
export interface BookingDay { date: string; slots: BookingSlot[] }
export const formatBooking = (slot: BookingSlot) => `${new Date(slot.start).toLocaleString('fr-FR', { timeZone: bookingTimezone, dateStyle: 'long', timeStyle: 'short' })} · ${slot.duration} min`;
