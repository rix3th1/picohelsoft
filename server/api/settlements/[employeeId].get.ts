import { Readable } from 'stream'
import { generatePDF } from '~/lib/pdfkit'
import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const employeeId = getRouterParam(event, 'employeeId')
  
  try {
    // Fetch employee details including name and document
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      select: {
        name: true,
        document: true
      }
    })

    if (!employee) {
      throw createError({
        statusCode: 404,
        message: 'Empleado no encontrado.'
      })
    }

    // Get work hours from the beginning of the month until today
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ) // First day of current month
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

    const runtimeConfig = useRuntimeConfig()

    // Calculate salary based on worked hours and fixed value per hour
    const valuePerHour = parseInt(runtimeConfig.admin.settlementValuePerHour)
    const data = workHours.map((hours) => ({
      hoursWorked: hours.hoursWorked || 0,
      valuePerHour: valuePerHour
    }))

    await prisma.settlement.create({
      data: {
        hoursWork: workHours.reduce((acc, hour) => acc + hour.hoursWorked, 0),
        payment: data.reduce((acc, hour) => acc + hour.valuePerHour, 0)
      }
    })

    const delta = [
  { hoursWorked: 8, valuePerHour: 15 }, // Día 1: 8 horas trabajadas a $15 por hora
  { hoursWorked: 5, valuePerHour: 15 }, // Día 2: 5 horas trabajadas a $15 por hora
  { hoursWorked: 10, valuePerHour: 15 } // Día 3: 10 horas trabajadas a $15 por hora
];
    
    // Generate PDF with the retrieved data
    const buffer = await generatePDF(delta, {
      name: employee.name,
      document: employee.document
    })

    // Create a readable stream to send the PDF as response
    const stream = new Readable({
      read() {
        this.push(buffer),
        this.push(null)
      }
    })

    // Send the PDF stream as response
    return sendStream(event, stream)
  } catch (error) {
    console.error({ error })

    throw createError({
      statusCode: 500,
      message: 'Oops! Algo salió mal. Por favor intenta nuevamente.'
    })
  }
})
