import { updateStepOne, updateStepTwo, updateStepThree, updateStepFour, updateStepFive, updateStepSix } from '../../../redux/formStepsSlice';

export function mapPayloadToSteps(dispatch, payload) {
  console.log("Payload completo recibido:", payload); // Agrega este log para ver el contenido completo del payload

  // Paso 1
  const stepOnepayload = {
    discoveryMethod: payload.discoveryMethod || '', // Asegúrate de que sea el nombre correcto en el payload
  };

  dispatch(updateStepOne(stepOnepayload));
  console.log("Updated Redux state for stepOne:", stepOnepayload);

  // Mapeo para otros pasos sigue igual...
  const stepTwopayload = {
    patientCi: payload.ci || '',
    patientBirthDate: payload.birthDate || '',
    age: payload.age || 0,
    patientGender: payload.gender || '',
    isPregnant: payload.isPregnant || false,
    pregnantLastMenstruationDate: payload.lastMenstruationDate || '',
    pregnantChildBirthDate: payload.childBirthDate || '',
    comorbidity: payload.comorbidity || '',
    pregnantDisease: payload.pregnantDisease || '',
    childParent: payload.childParent || '',
    patientName: payload.patientName || '',
    patientLastName: payload.patientLastName || '',
    patientSecondLastName: payload.patientSecondLastName || '',
    countryOrigin: payload.countryOrigin || '',
    patientPhone: payload.phone || '',
    directionCity: payload.directionCity || '',
    directionNeighborhood: payload.directionNeighborhood || '',
    municipalityOrState: payload.directionMunicipalityId || 0,
    isSecured: payload.isSecured || false,
    insuranceId: payload.insuranceId || null,
    ipTypeInsured: payload.ipTypeInsured || '',
    ipInsuredRecord: payload.ipInsuredRecord || '',
    ipInsuredName: payload.ipInsuredName || '',
    directionLatitude: payload.directionLatitude || 0,
    directionLongitude: payload.directionLongitude || 0,
  };
  dispatch(updateStepTwo(stepTwopayload));
  console.log("Updated Redux state for stepTwo:", stepTwopayload);

  // Continuar con otros pasos de la misma manera...
  const stepThreepayload = {
    contagionCountry: payload.contagionCountry || '',
    contagionState: payload.contagionState || '',
    contagionMunicipality: payload.contagionMunicipality || '',
    contagionCity: payload.contagionCity || '',
    contagionNeighborhood: payload.contagionNeighborhood || '',
  };
  dispatch(updateStepThree(stepThreepayload));
  console.log("Updated Redux state for stepThree:", stepThreepayload);

  const stepFourpayload = {
    fileSymptomsDate: payload.fileSymptomsDate || '',
    fileEpidemiologicalWeek: payload.fileEpidemiologicalWeek || '',
    selectedDisease: payload.caseType || 'Dengue',
    dengueCase: payload.dengueCase || '',
    symptoms: payload.symptoms || {},
    otherSymptom: {
      zika: payload.otherSymptom?.zika || '',
      chikungunya: payload.otherSymptom?.chikungunya || '',
      dengue: payload.otherSymptom?.dengue || '',
    },
    otherSymptomChecked: {
      zika: payload.otherSymptomChecked?.zika || false,
      chikungunya: payload.otherSymptomChecked?.chikungunya || false,
      dengue: payload.otherSymptomChecked?.dengue || false,
    },
  };
  dispatch(updateStepFour(stepFourpayload));
  console.log("Updated Redux state for stepFour:", stepFourpayload);

  const stepFivepayload = {
    wasHospitalized: payload.hospitalizedType === 1,
    hospitalizedEntryDate: payload.hospitalizedEntryDate || '',
    utiHospitalized: payload.utiType === 1,
    utiHospitalizationDate: payload.utiEntryDate || '',
    hospitalizedName: payload.hospitalizedName || '',
    dischargeType: payload.dischargeType || '',
    dischargeDate: payload.dischargeDate || '',
  };
  dispatch(updateStepFive(stepFivepayload));
  console.log("Updated Redux state for stepFive:", stepFivepayload);

  const stepSixpayload = {
    testLaboratoryId: payload.testLaboratoryId || 0,
  };
  dispatch(updateStepSix(stepSixpayload));
  console.log("Updated Redux state for stepSix:", stepSixpayload);
}
