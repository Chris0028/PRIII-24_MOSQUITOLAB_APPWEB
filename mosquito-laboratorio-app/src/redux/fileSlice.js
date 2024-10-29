// src/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //Solo se usa el dato de discoveryMethod, el resto debe ser estatico
  stepOne: {
    discoveryMethod: '',
  },
  stepTwo: {
    // Parte 1 - Datos personales hasta "Embarazada"
    patientCi: '',           // Se inicializa como string vacío
    patientBirthDate: '',                // Se inicializa como string vacío en formato 'yyyy-mm-dd' para evitar problemas con componentes de fecha
    age: 0,                       // Se inicializa con 0
    patientGender: '',                   // Puede ser 'male', 'female', o '' (cadena vacía para valor no seleccionado)
    isPregnant: false,            // Booleano, con false por defecto
    pregnantLastMenstruationDate: '',                      // Fecha de última menstruación en string vacío ('yyyy-mm-dd')
    pregnantChildBirthDate: '',        // Fecha de posible parto, también en string vacío
    comorbidity: '',              // String vacío para comorbilidades
    pregnantDisease: '',       // String vacío para especificar enfermedades adicionales
    childParent: '',
    
    // Parte 2 - Datos adicionales hasta seguro
    patientName: '',                    // Nombres del paciente, string vacío
    patientLastName: '',                 // Apellido paterno, string vacío
    patientSecondLastName: '',           // Apellido materno, string vacío
    countryOrigin: '',            // País de origen, string vacío
    patientPhone: '',              // Número de teléfono, string vacío
    directionCity: '',         // Dirección de residencia, string vacío
    directionNeighborhood: '',
    municipalityOrState: 0,      // Municipio o departamento, string vacío
    
    // Parte 3 - Información sobre seguro
    isSecured: false,               // Booleano para indicar si está asegurado
    insuranceId: null,                 // Nombre de la empresa aseguradora, string vacío
    ipTypeInsured: '',              // Caja o seguro, string vacío
    ipInsuredRecord: '',  
    ipInsuredName: '',          // Número de matriculación del seguro, string vacío

    // Parte 4 - Coordenadas del mapa
    directionLatitude: 0,                  // Coordenada de latitud inicial, valor predeterminado de 0
    directionLongitude: 0,                 // Coordenada de longitud inicial, valor predeterminado de 0
  },
  stepThree: {
    contagionCountry: '',
    contagionState: '',
    contagionMunicipality: '',
    contagionCity: '',
    contagionNeighborhood: '',
  },
  stepFour: {
    fileSymptomsDate: '',
    fileEpidemiologicalWeek: '',
    selectedDisease: 'Dengue',
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
    hospitalizedEntryDate: '', // Cambiado para inicializar con una cadena vacía
    utiHospitalized: null,
    utiHospitalizationDate: '', // Cadena vacía para evitar `undefined`
    hospitalizedName: '',
    dischargeType: '',
    dischargeDate: '', // Inicializar como cadena vacía también
  },
  stepSix: {
    testLaboratoryId: 0,
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
        console.log(state.stepThree);
    },
    updateStepFour(state, action) {
        state.stepFour = { ...state.stepFour, ...action.payload };
        console.log(state.stepFour);
    },
    updateStepFive(state, action) {
        state.stepFive = { ...state.stepFive, ...action.payload };
    },
    updateStepSix(state, action) {
        state.stepSix = { ...state.stepSix, ...action.payload };
        console.log(state.stepSix)
    },
    // Puedes agregar otros reducers para actualizar los otros pasos
  },
});

export const { updateStepOne, updateStepTwo, updateStepThree, updateStepFour, updateStepFive, updateStepSix } = fileSlice.actions;

export default fileSlice.reducer;
