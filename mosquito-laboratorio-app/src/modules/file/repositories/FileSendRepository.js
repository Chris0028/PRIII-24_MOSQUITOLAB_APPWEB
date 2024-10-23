import { PostFile } from "../services/fileSendService";

export function createFilePayload(state) {

  // Definir el payload final
  const payload = {
    patientName: "string",
    patientLastName: "string",
    patientSecondLastName: "string",
    patientGender: "string",
    patientCi: "string",
    patientBirthDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    patientPhone: "string",
    patientCode: "string",
    pregnantLastMenstruationDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    pregnantChildBirthDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    pregnantDisease: "string",
    childParent: "string",
    ipTypeInsured: "string",
    ipInsuredRecord: "string",
    insuranceId: 0,
    directionCity: "string",
    directionNeighborhood: "string",
    directionLatitude: "string",
    directionLongitude: "string",
    directionMunicipalityId: 0,
    contagionNeighborhood: "string",
    contagionCity: "string",
    contagionMunicipality: "string",
    contagionState: "string",
    contagionCountry: "string",
    hospitalizedEntryDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    hospitalizedType: 1,
    hospitalizedName: "string",
    utiEntryDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    utiType: 1,
    utiName: "string",
    dischargeType: "string",
    dischargeDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    fileCode: "string",
    fileSymptomsDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    fileDiscoveryMethod: "string",
    fileEpidemiologicalWeek: "string",
    caseType: "string",
    caseMethod: "string",
    caseDiseaseId: 0,
    sampleSampleType: "string",
    sampleCollectionDate: {
      year: 0,	
      month: 0,
      day: 0,
      dayOfWeek: 0
    },
    sampleObservation: "string",
    testDiagnosticMethod: "string",
    testResult: "string",
    testObservation: "string",
    testLaboratoryId: 0,
    userId: 0,
    symptoms: [
      0
    ],
    isSymptomsPresent: [
      "string"
    ]
  };

  return payload;
}

// Función que envía el payload a la API usando el servicio PostFile
export function sendFile(state) {
  const payload = createFilePayload(state);
  return PostFile(payload);
}
