import { z } from 'zod';

export const BookingStatusSchema = z.enum(['pending', 'confirmed', 'cancelled']);

export const BookingSchema = z.object({
  id: z.string().uuid(),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  startDate: z.date(),
  endDate: z.date(),
  status: BookingStatusSchema,
  totalPrice: z.number().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  courseId: z.string().uuid().nullable().optional(),
  stayOptionId: z.string().uuid().nullable().optional(),
});

export const CourseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  duration: z.number().int().positive(),
  maxStudents: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const StayOptionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  pricePerNight: z.number().positive(),
  maxGuests: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  propertyId: z.string().uuid().nullable().optional(),
});

export const PropertySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  address: z.string().min(1),
  description: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const BatchSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  maxCapacity: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  instructorId: z.string().uuid().nullable().optional(),
});

export const InstructorSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().nullable().optional(),
  specialty: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BookingInput = z.input<typeof BookingSchema>;
export type CourseInput = z.input<typeof CourseSchema>;
export type StayOptionInput = z.input<typeof StayOptionSchema>;
export type PropertyInput = z.input<typeof PropertySchema>;
export type BatchInput = z.input<typeof BatchSchema>;
export type InstructorInput = z.input<typeof InstructorSchema>;
