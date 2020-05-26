import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { getCompanyLabel, getProblemLabel, getSeniorityLabel } from './values';

/**
 * Template for building the html string for a complaint.
 */
export const complaintHtml = (complaint, images) => `
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border-bottom: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 12px;
}
p{
  font-size: 10px;
}
.header{
  display: flex;
}
.isotipo{
  width: 70px; text-align: left; font-size: 9px; margin-left: 10px; font-weight: bold;
}
.mt{
  margin-top: 40px;
}
.legal{
  font-size: 6px; color: 'grey';  line-height: 1.6;
}
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
</style>
  <div class="header">
    <img height="50" width="50" src="https://tinyurl.com/stye5bu" />
    <p class="isotipo">Asociación de Personal de Plataformas</p>
  </div>
  <h4 class="mt">Sistema de Autogestión Electrónico de Denuncias</h4>
  <p><strong>Denuncia: </strong> ${complaint.problemLabel}</p>
  <p>${complaint.description}</p>
  <table class="mt">
    <tr>
      <th>Item</th>
      <th>Descripcion</th>
    </tr>
    <tr>
      <td>Fecha</td>
      <td>${complaint.date}</td>
    </tr>
    <tr>
      <td>Dirección</td>
      <td>${complaint.address}</td>
    </tr>
    <tr>
      <td>Empresa</td>
      <td>${complaint.companyLabel}</td>
    </tr>
    <tr>
      <td>Id</td>
      <td>${complaint.id}</td>
    </tr>
  </table>
  <h4 class="mt">Sobre el usuario</h4>
  <table>
    <tr>
      <th>Item</th>
      <th>Descripcion</th>
    </tr>
    <tr>
      <td>Nombre y apellido</td>
      <td>${complaint.firstname} ${complaint.lastname}</td>
    </tr>
    <tr>
      <td>Teléfono</td>
      <td>${complaint.phonenumber} </td>
    </tr>
    <tr>
      <td>Antigüedad</td>
      <td>${complaint.seniorityLabel}</td>
    </tr>
    <tr>
      <td>Tareas</td>
      <td>${complaint.tasks}</td>
    </tr>
  </table>
  <h4 class="mt">Archivos adjuntos</h4>
  <img class="center" src="${complaint.uri}" />
  <p class="mt legal">Legales:  Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam vitae tempor turpis, sed interdum dolor. Sed sem elit, euismod fringilla dignissim ac, egestas non augue. Vivamus tempus aliquam nibh quis molestie. Sed in neque aliquet, blandit massa quis, pretium dui. Fusce vitae tortor vel nulla vehicula lobortis.
  Vestibulum id pretium urna. Nullam vulputate massa pharetra commodo dignissim. Vestibulum quis mi enim. </p>
`;

/**
 * Creates a PDF for complaint.
 */
export const createPdf = async (complaint, images) => {
  complaint.problemLabel = getProblemLabel(complaint.problem);
  complaint.seniorityLabel = getSeniorityLabel(complaint.seniority);
  complaint.companyLabel = getCompanyLabel(complaint.company);
  const options = {
    html: complaintHtml(complaint, images),
    fileName: `denuncia-${complaint.id}`,
  };

  const file = await RNHTMLtoPDF.convert(options);
  return file;
};
