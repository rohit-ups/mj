const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function managementRoutes(fastify, options) {
  // COURSES / PACKAGES
  fastify.get('/courses', async () => {
    return await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
  });

  fastify.post('/courses', async (request, reply) => {
    const data = request.body;
    const course = await prisma.course.create({ data });
    return reply.code(201).send(course);
  });

  fastify.put('/courses/:id', async (request) => {
    const { id } = request.params;
    const data = request.body;
    return await prisma.course.update({ where: { id }, data });
  });

  fastify.delete('/courses/:id', async (request) => {
    const { id } = request.params;
    await prisma.course.delete({ where: { id } });
    return { success: true };
  });

  // PROPERTIES
  fastify.get('/properties', async () => {
    return await prisma.property.findMany({ 
      include: { stayOptions: true },
      orderBy: { createdAt: 'desc' } 
    });
  });

  fastify.post('/properties', async (request, reply) => {
    const data = request.body;
    const property = await prisma.property.create({ data });
    return reply.code(201).send(property);
  });

  fastify.put('/properties/:id', async (request) => {
    const { id } = request.params;
    const data = request.body;
    return await prisma.property.update({ where: { id }, data });
  });

  // INSTRUCTORS
  fastify.get('/instructors', async () => {
    return await prisma.instructor.findMany({ orderBy: { name: 'asc' } });
  });

  fastify.post('/instructors', async (request, reply) => {
    const data = request.body;
    const instructor = await prisma.instructor.create({ data });
    return reply.code(201).send(instructor);
  });

  fastify.put('/instructors/:id', async (request) => {
    const { id } = request.params;
    const data = request.body;
    return await prisma.instructor.update({ where: { id }, data });
  });

  // FAQS
  fastify.get('/faqs', async () => {
    return await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
  });

  fastify.post('/faqs', async (request, reply) => {
    const data = request.body;
    const faq = await prisma.fAQ.create({ data });
    return reply.code(201).send(faq);
  });

  fastify.put('/faqs/:id', async (request) => {
    const { id } = request.params;
    const data = request.body;
    return await prisma.fAQ.update({ where: { id }, data });
  });
}

module.exports = managementRoutes;
