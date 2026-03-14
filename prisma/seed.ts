import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const property = await prisma.property.create({
    data: {
      name: 'Surf School Main Campus',
      address: 'Beach Road, Kovalam, Kerala',
      description: 'Premium surf school located at Kovalam beach',
    },
  })

  await prisma.stayOption.createMany({
    data: [
      {
        name: 'Dorm AC',
        description: 'Air-conditioned dormitory shared room',
        pricePerNight: 500,
        maxGuests: 4,
        propertyId: property.id,
      },
      {
        name: 'Dorm Non-AC',
        description: 'Non-air-conditioned dormitory shared room',
        pricePerNight: 300,
        maxGuests: 4,
        propertyId: property.id,
      },
      {
        name: 'Room AC',
        description: 'Private air-conditioned room',
        pricePerNight: 800,
        maxGuests: 2,
        propertyId: property.id,
      },
      {
        name: 'Room Non-AC',
        description: 'Private non-air-conditioned room',
        pricePerNight: 500,
        maxGuests: 2,
        propertyId: property.id,
      },
    ],
  })

  const courseDurations = [3, 5, 7, 14, 30]
  const pricePerDay = 1300

  for (const days of courseDurations) {
    await prisma.course.create({
      data: {
        name: `${days}-Day Surf Course`,
        description: `${days} days of surf lessons including equipment and instructor`,
        price: days * pricePerDay,
        duration: days * 24 * 60,
        maxStudents: 8,
      },
    })
  }

  await prisma.instructor.createMany({
    data: [
      {
        name: 'Raj Kumar',
        email: 'raj@surfschool.com',
        phone: '+91 9876543210',
        specialty: 'beginner',
      },
      {
        name: 'Mike Johnson',
        email: 'mike@surfschool.com',
        phone: '+91 9876543211',
        specialty: 'intermediate',
      },
      {
        name: 'Alex Smith',
        email: 'alex@surfschool.com',
        phone: '+91 9876543212',
        specialty: 'advanced',
      },
    ],
  })

  const instructorList = await prisma.instructor.findMany()
  
  const batchTimes = [
    { name: 'Morning Batch 1', hour: 7 },
    { name: 'Morning Batch 2', hour: 9 },
    { name: 'Afternoon Batch 1', hour: 11 },
    { name: 'Afternoon Batch 2', hour: 13 },
  ]

  const startDate = new Date()
  for (let day = 0; day < 30; day++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + day)
    
    for (const batchTime of batchTimes) {
      const batchStart = new Date(date)
      batchStart.setHours(batchTime.hour, 0, 0, 0)
      
      const batchEnd = new Date(batchStart)
      batchEnd.setHours(batchStart.getHours() + 2)
      
      const instructor = instructorList[day % instructorList.length]
      
      await prisma.batch.create({
        data: {
          name: `${batchTime.name} - Day ${day + 1}`,
          startDate: batchStart,
          endDate: batchEnd,
          maxCapacity: 8,
          instructorId: instructor.id,
        },
      })
    }
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
