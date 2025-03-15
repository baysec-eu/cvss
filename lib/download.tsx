import { generateFindingsDocx } from "./docx";
import { generateStyledHtml } from "./html";

export function downloadFile(filename: string, content: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;  
    document.body.appendChild(link);
    link.click();
  
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
  
export function handleExportHtml(findings: any) {
    const htmlContent = generateStyledHtml(findings);
    downloadFile('findings.html', htmlContent, 'text/html');
}

export function handleExportDocx(findings: any) {
    generateFindingsDocx(findings).then((buffer: any) => {
        downloadDocxFile("findings.docx", buffer);
    });
}

export function downloadDocxFile(filename: string, content: ArrayBuffer) {
  const blob = new Blob([content], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

