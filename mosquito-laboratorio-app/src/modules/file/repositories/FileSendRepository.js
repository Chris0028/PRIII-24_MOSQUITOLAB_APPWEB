import { PostFile } from "../services/fileSendService";

// Función para decodificar el JWT y obtener el `userId`
function decodeJwt(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload
    return payload.userId || null; // Retorna `userId` o `null` si no existe
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

export function createFilePayload(state) {
  const { stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix } = state;
  
  // Obtener el JWT de localStorage
  const userJwt = localStorage.getItem('jwt');
  const userId = userJwt ? decodeJwt(userJwt) : null; 

  const caseDiseaseIdMap = {
    Dengue: 1,
    Chikungunya: 2,
    Zika: 3
  };

  const caseDiseaseId = caseDiseaseIdMap[stepFour.selectedDisease] || 0;

  const formatDate = (date) => date ? new Date(date).toISOString() : null;
   
  const createSymptomData = (selectedDisease, symptoms) => {
    let symptomIds = [];
    let isSymptomsPresent = [];

    if (selectedDisease === 'Dengue') {
      Object.keys(symptoms.dengue).forEach((severity) => {
        symptoms.dengue[severity].forEach((symptomId) => {
          symptomIds.push(symptomId);
          isSymptomsPresent.push('S');
        });
      });
    } else if (selectedDisease === 'Chikungunya') {
      symptoms.chikungunya.forEach((symptomId) => {
        symptomIds.push(symptomId);
        isSymptomsPresent.push('S');
      });
    } else if (selectedDisease === 'Zika') {
      symptoms.zika.forEach((symptomId) => {
        symptomIds.push(symptomId);
        isSymptomsPresent.push('S');
      });
    }

    return { symptomIds, isSymptomsPresent };
  };

  const symptomData = createSymptomData(stepFour.selectedDisease, stepFour.symptoms);

  const payload = { 
    patientName: stepTwo.patientName,
    patientLastName: stepTwo.patientLastName,
    patientSecondLastName: stepTwo.patientSecondLastName,
    patientGender: stepTwo.patientGender,
    patientCi: stepTwo.patientCi,
    patientBirthDate: formatDate(stepTwo.patientBirthDate), 
    patientPhone: stepTwo.patientPhone,
    patientCode: stepTwo.patientCode || '',
    pregnantLastMenstruationDate: formatDate(stepTwo.pregnantLastMenstruationDate), 
    pregnantChildBirthDate: formatDate(stepTwo.pregnantChildBirthDate), 
    pregnantDisease: stepTwo.pregnantDisease,
    childParent: stepTwo.childParent,
    ipTypeInsured: stepTwo.ipTypeInsured,
    ipInsuredRecord: stepTwo.ipInsuredRecord,
    insuranceId: stepTwo.insuranceId || null,
    directionCity: stepTwo.directionCity,
    directionNeighborhood: stepTwo.directionNeighborhood,
    directionLatitude: String(stepTwo.directionLatitude || '-17.388283899568613'),
    directionLongitude: String(stepTwo.directionLongitude || '-66.14925111256666'),
    directionMunicipalityId: stepTwo.municipalityOrState,
    contagionNeighborhood: stepThree.contagionNeighborhood,
    contagionCity: stepThree.contagionCity,
    contagionMunicipality: stepThree.contagionMunicipality,
    contagionState: stepThree.contagionState,
    contagionCountry: stepThree.contagionCountry,
    hospitalizedEntryDate: formatDate(stepFive.hospitalizedEntryDate), 
    hospitalizedType: stepFive.wasHospitalized ? 1 : 0,
    hospitalizedName: stepFive.hospitalizedName,
    utiEntryDate: formatDate(stepFive.utiHospitalizationDate), 
    utiType: stepFive.utiHospitalized ? 2 : 0,
    utiName: stepFive.hospitalizedName,
    dischargeType: stepFive.dischargeType,
    dischargeDate: formatDate(stepFive.dischargeDate), 
    fileCode: stepFour.fileCode || '',
    fileSymptomsDate: formatDate(stepFour.fileSymptomsDate), 
    fileDiscoveryMethod: stepOne.discoveryMethod,
    fileEpidemiologicalWeek: stepFour.fileEpidemiologicalWeek,
    caseType: stepFour.selectedDisease,
    caseMethod: stepFour.caseMethod || '',
    caseDiseaseId: caseDiseaseId,
    sampleSampleType: '',
    sampleCollectionDate: null, 
    sampleObservation: '',
    testDiagnosticMethod: '',
    testResult: '',
    testObservation: '',
    testLaboratoryId: stepSix.testLaboratoryId,
    userId: userId, 
    symptoms: symptomData.symptomIds,
    isSymptomsPresent: symptomData.isSymptomsPresent
  };
  console.log(payload);
  return payload;
};


export function sendFile(state) {
  const payload = createFilePayload(state);
  console.log(payload);
  return PostFile(payload);
};