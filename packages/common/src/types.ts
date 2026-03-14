export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  courseId?: string | null;
  stayOptionId?: string | null;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  maxStudents: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StayOption {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  maxGuests: number;
  createdAt: Date;
  updatedAt: Date;
  propertyId?: string | null;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Batch {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  maxCapacity: number;
  createdAt: Date;
  updatedAt: Date;
  instructorId?: string | null;
}

export interface Instructor {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  specialty?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
