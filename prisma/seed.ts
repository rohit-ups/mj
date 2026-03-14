import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const property = await prisma.property.create({
    data: {
      name: 'Mambo Jambo Surf Hostel',
      address: 'Kolachikambla Road, Karnad, Mulki, Karnataka, India',
      description: 'Slow down and catch a breath at Mulki\'s coastline. Surf, stay, and vibe with the community.',
    },
  })

  // Mambo Jambo focuses on integrated packages, but we'll seed these as base options
  await prisma.stayOption.createMany({
    data: [
      {
        name: 'AC Dorm Bed',
        description: 'Comfortable air-conditioned dormitory with WiFi, Power Backup, and community vibes.',
        pricePerNight: 1000, // Estimated standalone price, though usually sold in packages
        maxGuests: 14,
        propertyId: property.id,
      },
      {
        name: 'Non-AC Dorm Bed',
        description: 'Budget-friendly non-air-conditioned dormitory bed with full access to hostel amenities.',
        pricePerNight: 700,
        maxGuests: 8,
        propertyId: property.id,
      },
    ],
  })

  // Mambo Jambo Packages (Price includes lessons + stay + brunch)
  const packages = [
    { days: 3, nights: 2, price: 6000 },
    { days: 5, nights: 4, price: 9700 },
    { days: 7, nights: 6, price: 13700 },
    { days: 10, nights: 9, price: 18700 },
  ]

  for (const pkg of packages) {
    await prisma.course.create({
      data: {
        name: `${pkg.days}-Day Mambo Jambo Package`,
        description: `${pkg.days} days of surf lessons + ${pkg.nights} nights AC dorm stay + Daily Brunch.`,
        price: pkg.price,
        duration: pkg.days * 24 * 60, // Duration in minutes
        maxStudents: 14,
      },
    })
  }

  await prisma.instructor.createMany({
    data: [
      {
        name: 'Mambo Lead Instructor',
        email: 'instructor1@mambojambo.com',
        phone: '+91 7022129460',
        specialty: 'beginner',
      },
      {
        name: 'Jambo Lead Instructor',
        email: 'instructor2@mambojambo.com',
        phone: '+91 7022129461',
        specialty: 'advanced',
      },
    ],
  })

  const instructorList = await prisma.instructor.findMany()
  
  // Lessons occur between 7:30 AM and 12:30 PM
  const batchTimes = [
    { name: 'Early Morning Batch', hour: 7, minute: 30 },
    { name: 'Morning Batch', hour: 10, minute: 0 },
  ]

  const startDate = new Date()
  for (let day = 0; day < 30; day++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + day)
    
    for (const batchTime of batchTimes) {
      const batchStart = new Date(date)
      batchStart.setHours(batchTime.hour, batchTime.minute, 0, 0)
      
      const batchEnd = new Date(batchStart)
      batchEnd.setHours(batchStart.getHours() + 2) // Standard 2-hour session
      
      const instructor = instructorList[day % instructorList.length]
      
      await prisma.batch.create({
        data: {
          name: `${batchTime.name} - ${date.toDateString()}`,
          startDate: batchStart,
          endDate: batchEnd,
          maxCapacity: 14,
          instructorId: instructor.id,
        },
      })
    }
  }

  console.log('Mambo Jambo seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
