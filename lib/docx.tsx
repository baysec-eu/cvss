import { Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun } from 'docx';

export async function generateFindingsDocx(findings: any) {
  const tableRows = findings.map((f: any) => {
    return new TableRow({
      children: [
        new TableCell({ children: [new Paragraph(f.severity)] }),
        new TableCell({ children: [new Paragraph(f.score.toFixed(1))] }),
        new TableCell({ children: [new Paragraph(f.attackVector)] }),
        new TableCell({ children: [new Paragraph(f.attackComplexity)] }),
        new TableCell({ children: [new Paragraph(f.privilegesRequired)] }),
        new TableCell({ children: [new Paragraph(f.userInteraction)] }),
        new TableCell({ children: [new Paragraph(f.scope)] }),
        new TableCell({ children: [new Paragraph(f.confidentiality)] }),
        new TableCell({ children: [new Paragraph(f.integrity)] }),
        new TableCell({ children: [new Paragraph(f.availability)] }),
        new TableCell({ children: [new Paragraph(f.nazwa)] }),
        new TableCell({ children: [new Paragraph(f.opis)] }),
        new TableCell({ children: [new Paragraph(f.obserwacje)] }),
      ],
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Findings Export",
                bold: true,
                size: 28,
              }),
            ],
            spacing: {
              after: 300,
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph("Severity")] }),
                  new TableCell({ children: [new Paragraph("Score")] }),
                  new TableCell({ children: [new Paragraph("AV")] }),
                  new TableCell({ children: [new Paragraph("AC")] }),
                  new TableCell({ children: [new Paragraph("PR")] }),
                  new TableCell({ children: [new Paragraph("UI")] }),
                  new TableCell({ children: [new Paragraph("Scope")] }),
                  new TableCell({ children: [new Paragraph("Conf.")] }),
                  new TableCell({ children: [new Paragraph("Integ.")] }),
                  new TableCell({ children: [new Paragraph("Avail.")] }),
                  new TableCell({ children: [new Paragraph("Nazwa")] }),
                  new TableCell({ children: [new Paragraph("Opis")] }),
                  new TableCell({ children: [new Paragraph("Obserwacje")] }),
                ],
              }),
              ...tableRows,
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}
