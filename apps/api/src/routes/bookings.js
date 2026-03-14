const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

const createBookingSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  startDate: z.string().datetime('Invalid start date'),
  endDate: z.string().datetime('Invalid end date'),
  courseId: z.string().optional(),
  stayOptionId: z.string().optional(),
});

async function bookingsRoutes(fastify, options) {
  fastify.post('/', async (request, reply) => {
    try {
      const validatedData = createBookingSchema.parse(request.body);

      const startDate = new Date(validatedData.startDate);
      const endDate = new Date(validatedData.endDate);

      if (endDate <= startDate) {
        return reply.code(400).send({ error: 'End date must be after start date' });
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

      return reply.code(201).send(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: 'Validation failed',
          details: error.errors,
        });
      }
      fastify.log.error('Booking creation error:', error);
      return reply.code(500).send({ error: 'Failed to create booking' });
    }
  });

  fastify.get('/', async (request, reply) => {
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
      return bookings;
    } catch (error) {
      fastify.log.error('Failed to fetch bookings:', error);
      return reply.code(500).send({ error: 'Failed to fetch bookings' });
    }
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;
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
        return reply.code(404).send({ error: 'Booking not found' });
      }
      return booking;
    } catch (error) {
      fastify.log.error('Failed to fetch booking:', error);
      return reply.code(500).send({ error: 'Failed to fetch booking' });
    }
  });

  fastify.post('/:id/assign-batch', async (request, reply) => {
    const { id } = request.params;
    const { batchId, date } = request.body;
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
      return assignment;
    } catch (error) {
      fastify.log.error('Failed to assign batch:', error);
      return reply.code(500).send({ error: 'Failed to assign batch' });
    }
  });

  fastify.get('/stay-options', async (request, reply) => {
    try {
      const stayOptions = await prisma.stayOption.findMany({
        include: {
          property: true,
        },
      });
      return stayOptions;
    } catch (error) {
      fastify.log.error('Failed to fetch stay options:', error);
      return reply.code(500).send({ error: 'Failed to fetch stay options' });
    }
  });

  fastify.get('/batches', async (request, reply) => {
    try {
      const batches = await prisma.batch.findMany({
        include: {
          instructor: true,
        },
        orderBy: {
          startDate: 'asc',
        },
      });
      return batches;
    } catch (error) {
      fastify.log.error('Failed to fetch batches:', error);
      return reply.code(500).send({ error: 'Failed to fetch batches' });
    }
  });
}

module.exports = bookingsRoutes;
