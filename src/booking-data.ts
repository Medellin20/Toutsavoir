export const bookingDurations = [15, 30, 60] as const;
export const bookingTimezone = 'Africa/Porto-Novo';
export interface BookingSlot { start: string; duration: number }
export interface BookingDay { date: string; slots: BookingSlot[] }
export const formatBooking = (slot: BookingSlot) => `${new Date(slot.start).toLocaleString('fr-FR', { timeZone: bookingTimezone, dateStyle: 'long', timeStyle: 'short' })} · ${slot.duration} min`;

export interface BookingSchedule { start: string; end: string; duration: number; enabled: boolean }
export const defaultSchedule: BookingSchedule = { start: '09:00', end: '17:00', duration: 30, enabled: true };
export function scheduleSlots(schedule: BookingSchedule, now = Date.now()): BookingSlot[] {
  if (!schedule.enabled) return [];
  const slots: BookingSlot[] = [];
  for (let day = 0; day < 30; day++) {
    const date = new Date(now + 3600000 + day * 86400000).toISOString().slice(0, 10);
    const from = Date.parse(`${date}T${schedule.start}:00+01:00`);
    const to = Date.parse(`${date}T${schedule.end}:00+01:00`);
    for (let time = from; time + schedule.duration * 60000 <= to; time += schedule.duration * 60000) {
      if (time > now + 3600000) slots.push({ start: new Date(time).toISOString(), duration: schedule.duration });
    }
  }
  return slots;
}
export function overlaps(a: BookingSlot, b: BookingSlot) {
  return Date.parse(a.start) < Date.parse(b.start) + b.duration * 60000 && Date.parse(b.start) < Date.parse(a.start) + a.duration * 60000;
}
export function slotClaims(slot: BookingSlot) {
  const keys: string[] = [];
  for (let time = Date.parse(slot.start); time < Date.parse(slot.start) + slot.duration * 60000; time += 60000) keys.push(`booking-locks/${time}`);
  return keys;
}
