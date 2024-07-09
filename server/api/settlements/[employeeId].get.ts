import { Readable } from 'stream'
import { generatePDF } from '~/lib/pdfkit'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const employeeId = getRouterParam(event, 'employeeId')

  // Fetch employee details including name and document
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
    select: {
      name: true,
      document: true
    }
  })

  // Throw error if employee is not found
  if (!employee) {
    throw createError({
      statusCode: 404,
      message: 'Employee not found'
    })
  }

  // Get work hours from the beginning of the month until today
  const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1) // First day of current month
  const endDate = new Date() // Current date

  const workHours = await prisma.workHour.findMany({
    where: {
      employeeId: employeeId,
      startTime: {
        gte: startDate
      },
      endTime: {
        lte: endDate
      }
    },
    select: {
      hoursWorked: true
    }
  })

  // Calculate salary based on worked hours and fixed value per hour
  const valuePerHour = parseInt(process.env.SETTLEMENT_VALUE_PER_HOUR!)
  const data = workHours.map((hours) => ({
    hoursWorked: hours.hoursWorked,
    valuePerHour: valuePerHour
  }))

  await prisma.settlement.create({
    data: {
      hoursWork: workHours.reduce((acc, hour) => acc + hour.hoursWorked, 0),
      payment: data.reduce((acc, hour) => acc + hour.valuePerHour, 0)
    }
  })

  // Generate PDF with the retrieved data
  const buffer = await generatePDF(data, {
    name: employee.name,
    document: employee.document
  })

  // Create a readable stream to send the PDF as response
  const stream = new Readable({
    read() {
      this.push(buffer)
      this.push(null)
    }
  })

  // Send the PDF stream as response
  return sendStream(event, stream)
})
