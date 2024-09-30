// src/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepOne: {
    healthEstablishment: '',
    municipality: '',
    notificationDate: null,
    discoveryMethod: '',
    department: '',
    subsector: '',
    contactInfo: '',
  },
  stepTwo: {
    //parte 1 - Hasta EMBARAZADA
    documentNumber: '',
    birthDate: null,
    age: null,
    gender: '',
    isPregnant: false,
    fum: null,
    posibleBirthDate: null,
    comorbidity: null,
    specifyComorbidity: null,
    
    //parte 2  - Hasta ANTES DE SEGURO
    names: '',
    lastName: '',
    secondLastName: null,
    countryOrigin: '',
    phoneNumber: '',
    resindenceAddress: '',
    municipalityOrState: '',

    //parte 3 - hasta SEGURO
    isSecured: false,
    companyName: null,
    insuranceOrFund: null,
    insuredNumber: null,
    specifySecure: null,

    //parte 4 - MAPA
    latitude: '',
    longitude: '',
  },
  stepThree: {
    countryOrPlace: '',
    state: '',
    provinceOrMunicipality: '',
    city: '',
    neighborhood: '',
  },
  stepFour: {
    //parte 1 - SINTOMAS
    symptomsOnsetDate: null,
    epidemiologicalWeek: '',
    symptoms: {
        zika: { Exantema_Maculopapular: '', Edema_Periarticular: '', Conjuntivitis_no_Purulenta: '', 
                Fiebre_menor385: '', Mialgia_Altragia: '', Otro: null   },
        chikungunya: { FiebreMenor385: '', Polialtralgias: '', Poliartritis: '',
                       Mialgias: '', Exantema: '', Otro: null },
        dengue: {
          sinSignosAlarma: { Fiebre_aguda: '', Nauseas_Vomitos: '', Cefalea: '', DolorRetroOrbitario: '', 
                             Mialgias: '', PetequiasTorniquete: '', Otro: null },
          conSignosAlarma: { DolorAbominal: '', VomitosPersistentes: '', LetargiaoIrritabilidad: '', 
                             SangradooMucosas: '', Otro: null },
          grave: { DistresRespiratorio: '', Choque: '', SangradoGrave: '', 
                   GraveOrganos: '', Otro: null },
        },
      },
  },
  stepFive: {
    wasHospitalized: null,
    hospitalizationDate: null,
    utiHospitalized: null,
    utiHospitalizationDate: null,
    healthEstablishment1: '',
    medicalDischargeType: '',
    dischargeDate: null,
  },
  stepSix: {
    laboratorySend: '',
    doctorName: '',
    healthEstablishmentNotifier: '',
  },
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    updateStepOne(state, action) {
      state.stepOne = { ...state.stepOne, ...action.payload };
    },
    updateStepTwo(state, action) {
        state.stepTwo = { ...state.stepTwo, ...action.payload };
    },
    updateStepThree(state, action) {
        state.stepThree = { ...state.stepThree, ...action.payload };
    },
    updateStepFour(state, action) {
        state.stepFour = { ...state.stepFour, ...action.payload };
    },
    updateStepFive(state, action) {
        state.stepFive = { ...state.stepFive, ...action.payload };
    },
    updateStepSix(state, action) {
        state.stepSix = { ...state.stepSix, ...action.payload };
    },
    // Puedes agregar otros reducers para actualizar los otros pasos
  },
});

export const { updateStepOne, updateStepTwo, updateStepThree, updateStepFour, updateStepFive, updateStepSix } = fileSlice.actions;

export default fileSlice.reducer;
