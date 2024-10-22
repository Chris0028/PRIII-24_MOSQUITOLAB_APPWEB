import { PostFile } from "../services/fileSendService";
import { httpClient } from "../../../api/httpClient/httpClient"
/**
 * Transforma los datos del formulario almacenados en Redux a un payload compatible con la API.
 * @param {Object} state El estado actual de Redux (file).
 * @returns {Object} El payload listo para ser enviado al backend.
 */
export function createFilePayload(state) {
  const { stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix } = state;

  // Utilizamos la función `gatherSymptomsInfo` para obtener ambos campos: `symptoms` e `isSymptomsPresent`.
  const { symptoms, isSymptomsPresent } = gatherSymptomsInfo(stepFour);

  // Definir el payload final
  const payload = {
    caseType: stepOne.discoveryMethod || "",
    caseMethod: stepOne.subsector || "",
    diseaseId: getDiseaseId(stepFour.selectedDisease),
    parent: `${stepTwo.names} ${stepTwo.lastName} ${stepTwo.secondLastName}`.trim() || null,
    neighborhood: stepThree.neighborhood || "",
    municipalityId: getMunicipalityId(stepOne.municipality),
    latitude: stepTwo.latitude || 0,
    longitude: stepTwo.longitude || 0,
    city: stepThree.city || "",
    dischargeStatus: stepFive.medicalDischargeType === "Alta médica" ? 1 : 0,
    dischargeId: getDischargeId(stepFive.medicalDischargeType) ,
    dischargeDate: stepFive.dischargeDate || null,
    observations: stepSix.doctorName || "",
    hospitalName: stepFive.healthEstablishment1 || null,
    hospitalizedType: stepFive.wasHospitalized ? 1 : 0,
    entryDate: stepFive.hospitalizationDate || null,
    hospitalNameU: stepFive.utiHospitalized ? stepFive.healthEstablishment1 : null,
    hospitalizedTypeU: stepFive.utiHospitalized ? 1 : 0,
    entryDateU: stepFive.utiHospitalizationDate || null,
    patientCode: null,
    fileCode: null,
    patientNames: stepTwo.names || "",
    patientLastName: stepTwo.lastName || "",
    patientSecondLastName: stepTwo.secondLastName || "",
    patientGender: stepTwo.gender || "",
    patientCi: stepTwo.documentNumber || "",
    patientPhone: stepTwo.phoneNumber || "",
    patientBirthDate: stepTwo.birthDate || null,
    disease: stepFour.selectedDisease || "",
    lastMenstruationDate: stepTwo.isPregnant ? stepTwo.fum : null,
    childBirthDate: stepTwo.isPregnant ? stepTwo.possibleBirthDate : null,
    sampleType: null,
    sampleCollectionDate: null,
    epidemiologicalNumberWeek: stepFour.epidemiologicalWeek || "",
    symptomsDate: stepFour.symptomStartDate || null,
    userId: getUserId(),
    symptoms,
    isSymptomsPresent,
    sampleObservation: null,
    diagnosticMethod: null,
    testResult: null,
    testObservation: null,
    laboratoryId: stepSix.laboratorySend,
    insuranceRecord: null,
    insuranceId: null,
    typeInsured: stepTwo.boxInsurance,
  };

  return payload;
}


/**
 * Obtiene los detalles del archivo por ID.
 * @param {number} fileID - El ID del archivo.
 * @returns {Promise<Object>} - Los detalles del archivo.
 */
export async function GetFileDetails(fileID) {
  try {
      const res = await httpClient.post('/File/GetFileDetails', { fileID });
      if (res.status === 200) {
          return res.data;
      } else {
          console.log('Error de Comunicación');
      }
  } catch (error) {
      console.error('Error al obtener los detalles del archivo:', error);
  }
}

/**
 * Actualiza los detalles del archivo.
 * @param {Object} fileData - Los datos del archivo a actualizar.
 * @returns {Promise<Object>} - La respuesta de la API.
 */
export async function UpdateFile(fileData) {
  try {
      const res = await httpClient.patch('/File/UpdateFile', fileData);
      if (res.status === 200) {
          return res.data;
      } else {
          console.log('Error de Comunicación');
      }
  } catch (error) {
      console.error('Error al actualizar el archivo:', error);
  }
}

// Función para convertir el nombre de la enfermedad a un ID (ejemplo)
function getDiseaseId(diseaseName) {
  const diseases = {
    Zika: 1,
    Dengue: 2,
    Chikungunya: 3,
  };
  return diseases[diseaseName] || 0;
}

// Función para convertir el municipio a un ID.
function getMunicipalityId(municipalityName) {
  const municipalities = {
    "Municipio A": 1,
    "Municipio B": 2,
  };
  return municipalities[municipalityName] || 0;
}

// Convertir el estado de alta médica a un ID.
function getDischargeId(dischargeType) {
  const dischargeTypes = {
    "Alta médica": 1,
    Fallecimiento: 2,
    Otros: 3,
  };
  return dischargeTypes[dischargeType] || 0;
}

// Mapa de todos los síntomas posibles
const symptomMap = {
  1: "Mialgia",
  2: "Fiebre",
  3: "Vómitos",
  4: "Cefalea",
  5: "Dolor Retro-Orbitario",
  6: "Dolor Abdominal",
  7: "Letargia",
  8: "Irritabilidad",
  9: "Sangrado de Mucosas",
  10: "Distres Respiratorio",
  11: "Choque",
  12: "Sangrado Grave",
  13: "Compromiso: Grave de Organos",
  14: "Poliartralgias",
  15: "Poliartritis",
  16: "Exantema",
  17: "Exantema Maculopapular",
  18: "Conjuntivitis No Purulenta",
  19: "Artralgia",
  20: "Edema Periarticular",
  21: "Petequias Prueba Torniquete +",
};

/**
 * Función que genera la lista de síntomas seleccionados y una lista de si están presentes o no.
 * @param {Object} stepFour Datos de los síntomas del estado Redux.
 * @returns {Object} Objeto con dos propiedades: `symptoms` (IDs seleccionados) e `isSymptomsPresent` (lista de "Y" o "N").
 */
function gatherSymptomsInfo(stepFour) {
  const symptoms = [];
  const isSymptomsPresent = [];

  // Iterar sobre todos los síntomas posibles en `symptomMap`
  Object.keys(symptomMap).forEach((id) => {
    const symptomName = symptomMap[id];
    const isPresent = checkIfSymptomPresent(stepFour, symptomName);

    // Añadir a la lista de IDs si el síntoma está presente
    if (isPresent) {
      symptoms.push(parseInt(id));
    }

    // Añadir "Y" o "N" a la lista de presencia de síntomas
    isSymptomsPresent.push(isPresent ? "Y" : "N");
  });

  return { symptoms, isSymptomsPresent };
}

/**
 * Función que comprueba si un síntoma está presente en los datos del paso cuatro.
 * @param {Object} stepFour Datos de los síntomas del estado Redux.
 * @param {String} symptomName Nombre del síntoma a comprobar.
 * @returns {Boolean} Verdadero si el síntoma está presente; falso en caso contrario.
 */
function checkIfSymptomPresent(stepFour, symptomName) {
  // Revisar si el síntoma está presente en cualquiera de las categorías de enfermedades
  return (
    (Array.isArray(stepFour.symptoms.zika) &&
      stepFour.symptoms.zika.includes(symptomName)) ||
    (Array.isArray(stepFour.symptoms.chikungunya) &&
      stepFour.symptoms.chikungunya.includes(symptomName)) ||
    (Array.isArray(stepFour.symptoms.dengue.sinSignosAlarma) &&
      stepFour.symptoms.dengue.sinSignosAlarma.includes(symptomName)) ||
    (Array.isArray(stepFour.symptoms.dengue.conSignosAlarma) &&
      stepFour.symptoms.dengue.conSignosAlarma.includes(symptomName)) ||
    (Array.isArray(stepFour.symptoms.dengue.grave) &&
      stepFour.symptoms.dengue.grave.includes(symptomName))
  );
}

// Obtener el ID del usuario
function getUserId() {
  // Puedes obtener el ID del usuario actual logueado de tu sistema aquí
  return 1; // Ejemplo
}

// Función que envía el payload a la API usando el servicio PostFile
export function sendFile(state) {
  const payload = createFilePayload(state);
  return PostFile(payload);
}
