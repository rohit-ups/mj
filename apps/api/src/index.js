const fastify = require('fastify')({
  logger: true
});
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Register plugins
fastify.register(require('@fastify/cors'), {
  origin: true // Allow all for development
});
fastify.register(require('@fastify/formbody'));

// Health check
fastify.get('/health', async (request, reply) => {
  return { status: 'ok' };
});

// Register routes
fastify.register(require('./routes/bookings'), { prefix: '/bookings' });
fastify.register(require('./routes/webhooks'), { prefix: '/webhooks' });

// Start server
const start = async () => {
  try {
    const PORT = process.env.PORT || 4000;
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

module.exports = fastify;
