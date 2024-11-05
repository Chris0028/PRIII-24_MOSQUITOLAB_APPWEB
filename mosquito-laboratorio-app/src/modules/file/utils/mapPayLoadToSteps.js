import { updateStepOne, updateStepTwo, updateStepThree, updateStepFour, updateStepFive, updateStepSix } from '../../../redux/formStepsSlice';

export function mapPayloadToSteps(dispatch, data) {
  console.log("Payload completo recibido:", data); // Agrega este log para ver el contenido completo del data

  // Paso 1
  const stepOneData = {
    discoveryMethod: data.discoveryMethod || '', // Asegúrate de que sea el nombre correcto en el data
  };

  dispatch(updateStepOne(stepOneData));
  console.log("Updated Redux state for stepOne:", stepOneData);

  // Mapeo para otros pasos sigue igual...
  const stepTwoData = {
    patientCi: data.ci || '',
    patientBirthDate: data.birthDate || '',
    age: data.age || 0,
    patientGender: data.gender || '',
    isPregnant: data.isPregnant || false,
    pregnantLastMenstruationDate: data.lastMenstruationDate || '',
    pregnantChildBirthDate: data.childBirthDate || '',
    comorbidity: data.comorbidity || '',
    pregnantDisease: data.pregnantDisease || '',
    childParent: data.childParent || '',
    patientName: data.patientName || '',
    patientLastName: data.patientLastName || '',
    patientSecondLastName: data.patientSecondLastName || '',
    countryOrigin: data.countryOrigin || '',
    patientPhone: data.phone || '',
    directionCity: data.directionCity || '',
    directionNeighborhood: data.directionNeighborhood || '',
    municipalityOrState: data.directionMunicipalityId || 0,
    isSecured: data.isSecured || false,
    insuranceId: data.insuranceId || null,
    ipTypeInsured: data.ipTypeInsured || '',
    ipInsuredRecord: data.ipInsuredRecord || '',
    ipInsuredName: data.ipInsuredName || '',
    directionLatitude: data.directionLatitude || 0,
    directionLongitude: data.directionLongitude || 0,
  };
  dispatch(updateStepTwo(stepTwoData));
  console.log("Updated Redux state for stepTwo:", stepTwoData);

  // Continuar con otros pasos de la misma manera...
  const stepThreeData = {
    contagionCountry: data.contagionCountry || '',
    contagionState: data.contagionState || '',
    contagionMunicipality: data.contagionMunicipality || '',
    contagionCity: data.contagionCity || '',
    contagionNeighborhood: data.contagionNeighborhood || '',
  };
  dispatch(updateStepThree(stepThreeData));
  console.log("Updated Redux state for stepThree:", stepThreeData);

  const stepFourData = {
    fileSymptomsDate: data.fileSymptomsDate || '',
    fileEpidemiologicalWeek: data.fileEpidemiologicalWeek || '',
    selectedDisease: data.caseType || 'Dengue',
    dengueCase: data.dengueCase || '',
    symptoms: data.symptoms || {},
    otherSymptom: {
      zika: data.otherSymptom?.zika || '',
      chikungunya: data.otherSymptom?.chikungunya || '',
      dengue: data.otherSymptom?.dengue || '',
    },
    otherSymptomChecked: {
      zika: data.otherSymptomChecked?.zika || false,
      chikungunya: data.otherSymptomChecked?.chikungunya || false,
      dengue: data.otherSymptomChecked?.dengue || false,
    },
  };
  dispatch(updateStepFour(stepFourData));
  console.log("Updated Redux state for stepFour:", stepFourData);

  const stepFiveData = {
    wasHospitalized: data.hospitalizedType === 1,
    hospitalizedEntryDate: data.hospitalizedEntryDate || '',
    utiHospitalized: data.utiType === 1,
    utiHospitalizationDate: data.utiEntryDate || '',
    hospitalizedName: data.hospitalizedName || '',
    dischargeType: data.dischargeType || '',
    dischargeDate: data.dischargeDate || '',
  };
  dispatch(updateStepFive(stepFiveData));
  console.log("Updated Redux state for stepFive:", stepFiveData);

  const stepSixData = {
    testLaboratoryId: data.testLaboratoryId || 0,
  };
  dispatch(updateStepSix(stepSixData));
  console.log("Updated Redux state for stepSix:", stepSixData);
}
