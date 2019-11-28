import RNHTMLtoPDF from 'react-native-html-to-pdf';

/**
 * Template for building the html string for a complaint.
 */
export const complaintHtml = (complaint) => `
  <h1>${complaint.id}</h1>
  <div style="font-size: 16px">
    <div class="field"><strong>Nombre:</strong> ${complaint.firstname} ${complaint.lastname}</div>
    <div class="field"><strong>Empresa:</strong> ${complaint.company}</div>
    <div class="field"><strong>Antigüedad:</strong> ${complaint.seniority}</div>
    <div class="field"><strong>Tareas:</strong> ${complaint.tasks}</div>
    <div class="field"><strong>Problema:</strong> ${complaint.problems}</div>
  </div>
`;

/**
 * Creates a PDF for complaint.
 */
export const createPdf = async (complaint) => {
  const options = {
    html: complaintHtml(complaint),
    fileName: `denuncia-${complaint.id}`,
  };

  const file = await RNHTMLtoPDF.convert(options);
  return file;
};
