export interface TimeSlot {
  id: string;
  time: string;
  booked?: boolean;
}

export interface BookingDay {
  label: string;
  date: number;
  month?: number;
  year?: number;
  disabled?: boolean;
}

export interface BookingCalendarProps {
  days?: BookingDay[];
  timeSlots?: TimeSlot[];
  selectedDay?: number | null;
  selectedSlot?: string | null;
  onSelectDay?: (index: number) => void;
  onSelectSlot?: (slotId: string) => void;
  onConfirm?: (day: number, slotId: string) => void;
  maxSlotsPerRow?: 3 | 4;
  className?: string;
}
