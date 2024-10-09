// src/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //Solo se usa el dato de discoveryMethod, el resto debe ser estatico
  stepOne: {
    healthEstablishment: '',
    municipality: '',
    notificationDate: '',
    discoveryMethod: '',
    department: '',
    subsector: '',
    contactInfo: '',
  },
  stepTwo: {
    // Parte 1 - Datos personales hasta "Embarazada"
    documentNumber: '',           // Se inicializa como string vacío
    birthDate: '',                // Se inicializa como string vacío en formato 'yyyy-mm-dd' para evitar problemas con componentes de fecha
    age: 0,                       // Se inicializa con 0
    gender: '',                   // Puede ser 'male', 'female', o '' (cadena vacía para valor no seleccionado)
    isPregnant: false,            // Booleano, con false por defecto
    fum: '',                      // Fecha de última menstruación en string vacío ('yyyy-mm-dd')
    possibleBirthDate: '',        // Fecha de posible parto, también en string vacío
    comorbidity: '',              // String vacío para comorbilidades
    specifyComorbidity: '',       // String vacío para especificar enfermedades adicionales
    
    // Parte 2 - Datos adicionales hasta seguro
    names: '',                    // Nombres del paciente, string vacío
    lastName: '',                 // Apellido paterno, string vacío
    secondLastName: '',           // Apellido materno, string vacío
    countryOrigin: '',            // País de origen, string vacío
    phoneNumber: '',              // Número de teléfono, string vacío
    residenceAddress: '',         // Dirección de residencia, string vacío
    municipalityOrState: '',      // Municipio o departamento, string vacío

    // Parte 3 - Información sobre seguro
    isSecured: false,             // Booleano para indicar si está asegurado
    companyName: '',              // Nombre de la empresa aseguradora, string vacío
    insuranceOrFund: '',          // Caja o seguro, string vacío
    insuredNumber: '',            // Número de matriculación del seguro, string vacío
    specifySecure: '',            // Campo para especificar seguro si es necesario, string vacío

    // Parte 4 - Coordenadas del mapa
    latitude: 0,                  // Coordenada de latitud inicial, valor predeterminado de 0
    longitude: 0,                 // Coordenada de longitud inicial, valor predeterminado de 0
  },
  stepThree: {
    countryOrPlace: '',
    state: '',
    provinceOrMunicipality: '',
    city: '',
    neighborhood: '',
  },
  stepFour: {
    symptomStartDate: null,
    epidemiologicalWeek: '',
    selectedDisease: 'Zika',
    dengueCase: '',
    symptoms: {
      zika: [],
      chikungunya: [],
      dengue: {
        sinSignosAlarma: [],
        conSignosAlarma: [],
        grave: [],
      },
    },
    otherSymptom: {
      zika: '',
      chikungunya: '',
      dengue: '',
    },
    otherSymptomChecked: {
      zika: false,
      chikungunya: false,
      dengue: false,
    },
  },  
  stepFive: {
    wasHospitalized: null,
    hospitalizationDate: '', // Cambiado para inicializar con una cadena vacía
    utiHospitalized: null,
    utiHospitalizationDate: '', // Cadena vacía para evitar `undefined`
    healthEstablishment1: '',
    medicalDischargeType: '',
    dischargeDate: '', // Inicializar como cadena vacía también
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
