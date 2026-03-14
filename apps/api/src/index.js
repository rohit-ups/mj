const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis || {};
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/bookings', require('./routes/bookings'));
app.use('/webhooks', require('./routes/webhooks'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
