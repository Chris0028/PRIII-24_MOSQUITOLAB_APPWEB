import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const columnTranslations = {
  fileCode: "Código de Ficha",
  testResult: "Resultado de Prueba",
  patientCi: "Carnet de Identidad",
  patientName: "Nombre del Paciente",
  patientLastName: "Apellido Paterno del Paciente",
  patientSecondLastName: "Apellido Materno del Paciente",
  patientBirthDate: "Fecha de Nacimiento del Paciente",
  sex: "Sexo",
  age: "Edad",
  pregnant: "Embarazada",
  phone: "Celular",
  probableInfectionDepartment: "Departamento Probable de Infección",
  probableInfectionMunicipality: "Municipio Probable de Infección",
  infectionLocation: "Ubicación de la Infección",
  currentAddress: "Dirección Actual",
  notifierCenter: "Centro Notificador",
  laboratoryName: "Nombre del Laboratorio",
  symptomsStartDate: "Fecha de Inicio de Síntomas",
  sampleCollectionDate: "Fecha de Toma de Muestra",
  reportDate: "Fecha de Reporte",
  dengue: "Dengue",
  zika: "Zika",
  chikungunya: "Chikungunya",
  rtPcrDengue: "RT-PCR Dengue",
  elisaNs1Dengue: "ELISA NS1 Dengue",
  macElisaIgmDengue: "MAC-ELISA IgM Dengue",
  rtPcrZika: "RT-PCR Zika",
  elisaIgmZika: "ELISA IgM Zika",
  rtPcrChikungunya: "RT-PCR Chikungunya",
  elisaIgmChikungunya: "ELISA IgM Chikungunya",
  mialgia: "Mialgia",
  fiebre: "Fiebre",
  vomitos: "Vómitos",
  cefalea: "Cefalea",
  dolorRetroOrbitario: "Dolor Retro-Orbitario",
  dolorAbdominal: "Dolor Abdominal",
  letargia: "Letargia",
  irritabilidad: "Irritabilidad",
  sangradoMucosas: "Sangrado en Mucosas",
  distresRespiratorio: "Distrés Respiratorio",
  choque: "Choque",
  sangradoGrave: "Sangrado Grave",
  compromisoOrganos: "Compromiso de Órganos",
  poliartralgias: "Poliartralgias",
  poliartritis: "Poliartritis",
  exantema: "Exantema",
  exantemaMaculopapular: "Exantema Maculopapular",
  conjuntivitisNoPurulenta: "Conjuntivitis No Purulenta",
  artralgia: "Artralgia",
  edemaPeriarticular: "Edema Periarticular",
  petequiasPruebaTorniquete: "Petequias Prueba de Torniquete",
  observations: "Observaciones",
};

function prepareData(data) {
  return data.map(item => {
    const translatedItem = {};
    Object.keys(item).forEach(key => {
      if (key !== 'fileId') { // Omitir la columna fileId
        const translatedKey = columnTranslations[key] || key;
        translatedItem[translatedKey] = item[key];
      }
    });
    return translatedItem;
  });
}

export function exportToExcel(rowData) {
  if (!Array.isArray(rowData?.data)) {
    console.error("Los datos proporcionados para exportar no son válidos:", rowData?.data);
    return;
  }

  const cleanedData = prepareData(rowData.data);
  const worksheet = XLSX.utils.json_to_sheet(cleanedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte Consolidado");
  XLSX.writeFile(workbook, `${rowData.fileName}.xlsx`);
}

export function exportToCSV(rowData) {
  if (!Array.isArray(rowData?.data)) {
    console.error("Los datos proporcionados para exportar no son válidos:", rowData?.data);
    return;
  }

  const cleanedData = prepareData(rowData.data);
  const csv = Papa.unparse(cleanedData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${rowData.fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
