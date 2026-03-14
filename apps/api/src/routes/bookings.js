const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const router = express.Router();
const prisma = new PrismaClient();

const createBookingSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  startDate: z.string().datetime('Invalid start date'),
  endDate: z.string().datetime('Invalid end date'),
  courseId: z.string().optional(),
  stayOptionId: z.string().optional(),
});

router.post('/', async (req, res) => {
  try {
    const validatedData = createBookingSchema.parse(req.body);

    const startDate = new Date(validatedData.startDate);
    const endDate = new Date(validatedData.endDate);

    if (endDate <= startDate) {
      return res.status(400).json({ error: 'End date must be after start date' });
    }

    let totalPrice = 0;

    if (validatedData.courseId) {
      const course = await prisma.course.findUnique({
        where: { id: validatedData.courseId },
      });
      if (course) {
        totalPrice += course.price;
      }
    }

    if (validatedData.stayOptionId) {
      const stayOption = await prisma.stayOption.findUnique({
        where: { id: validatedData.stayOptionId },
      });
      if (stayOption) {
        const nights = Math.ceil(
          (endDate - startDate) / (1000 * 60 * 60 * 24)
        );
        totalPrice += stayOption.pricePerNight * nights;
      }
    }

    const booking = await prisma.booking.create({
      data: {
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        startDate,
        endDate,
        courseId: validatedData.courseId,
        stayOptionId: validatedData.stayOptionId,
        totalPrice,
        status: 'pending',
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors,
      });
    }
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        course: true,
        stayOption: true,
        batchAssignments: {
          include: {
            batch: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(bookings);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        course: true,
        stayOption: true,
        batchAssignments: {
          include: {
            batch: true,
          },
        },
      },
    });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Failed to fetch booking:', error);
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
});

router.post('/:id/assign-batch', async (req, res) => {
  const { id } = req.params;
  const { batchId, date } = req.body;
  try {
    const assignment = await prisma.bookingBatchAssignment.upsert({
      where: {
        bookingId_date: {
          bookingId: id,
          date: new Date(date),
        },
      },
      update: {
        batchId,
      },
      create: {
        bookingId: id,
        batchId,
        date: new Date(date),
      },
    });
    res.json(assignment);
  } catch (error) {
    console.error('Failed to assign batch:', error);
    res.status(500).json({ error: 'Failed to assign batch' });
  }
});

router.get('/stay-options', async (req, res) => {
  try {
    const stayOptions = await prisma.stayOption.findMany({
      include: {
        property: true,
      },
    });
    res.json(stayOptions);
  } catch (error) {
    console.error('Failed to fetch stay options:', error);
    res.status(500).json({ error: 'Failed to fetch stay options' });
  }
});

router.get('/batches', async (req, res) => {
  try {
    const batches = await prisma.batch.findMany({
      include: {
        instructor: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });
    res.json(batches);
  } catch (error) {
    console.error('Failed to fetch batches:', error);
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

module.exports = router;
