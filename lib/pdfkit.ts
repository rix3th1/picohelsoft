import PDFDocument from 'pdfkit-table'

export async function generatePDF(
  data: any,
  owner: {
    name: string
    document: string
  }
): Promise<Buffer> {
  const pdfBuffer: Buffer = await new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      bufferPages: true,
      margin: 30
    })

    const rows = data.map((item: any, index: number) => [
      index + 1,
      item.hoursWorked,
      item.valuePerHour.toFixed(2),
      (item.hoursWorked * item.valuePerHour).toFixed(2)
    ])

    const baseUrl = process.env.BASE_URL
    ;(async function () {
      const res = await fetch(`${baseUrl}/logo.png`)
      const image = await res.arrayBuffer()

      function addHeader(doc: PDFDocument) {
        doc
          .image(image, 30, 15, {
            width: 50,
            link: baseUrl
          })
          .fontSize(8)
          .text(
            `Liquidación de Salario - ${owner.name} - CC. ${
              owner.document
            } - ${new Date().toLocaleString()}`,
            0,
            33,
            {
              align: 'center'
            }
          )
        doc.moveDown(5)
        doc
          .moveTo(30, 70)
          .lineTo(doc.page.width - 30, 70)
          .stroke()
      }

      // Event listener to add header on new page
      doc.on('pageAdded', () => {
        addHeader(doc)
      })

      // Add the initial header
      addHeader(doc)

      doc.fontSize(20).text('Liquidación de Salario', { align: 'center' })
      doc.moveDown()

      const tableData = {
        headers: ['No.', 'Horas Trabajadas', 'Valor por Hora', 'Salario'],
        rows: rows
      }

      if (rows.length === 0) {
        doc.fontSize(10).text('No hay datos de liquidación', {
          align: 'center'
        })
        doc.moveDown()
      } else {
        await doc.table(tableData, {
          prepareHeader: () => doc.font('Helvetica-Bold').fontSize(12),
          prepareRow: () => doc.font('Helvetica').fontSize(10),
          columnsSize: [50, 150, 150, 150] // Adjust column widths as needed
        })
      }

      // Calculate total salary
      const totalSalary = rows.reduce(
        (acc: number, row: any) => acc + parseFloat(row[3]),
        0
      )
      const totalText = `Total Salario: $${totalSalary.toFixed(2)}`

      // Add total salary below the table
      doc.fontSize(12).text(totalText, { align: 'right' })

      // Finalize the PDF document
      doc.end()
    })()

    // Buffer array to store PDF data
    const buffer: Buffer[] = []
    doc.on('data', (chunk: any) => buffer.push(chunk))
    doc.on('end', () => {
      const data = Buffer.concat(buffer)
      resolve(data)
    })
  })

  return pdfBuffer
}
