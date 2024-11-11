// src/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepOne: {
    discoveryMethod: '',
  },
  stepTwo: {
   
    patientCi: '',           
    patientBirthDate: '',                
    age: 0,                      
    patientGender: '',                   
    isPregnant: false,            // Booleano, con false por defecto
    pregnantLastMenstruationDate: '',                      
    pregnantChildBirthDate: '',        
    comorbidity: '',              
    pregnantDisease: '',       
    childParent: '',
    
    patientName: '',                    
    patientLastName: '',                 
    patientSecondLastName: '',          
    countryOrigin: '',            
    patientPhone: '',             
    directionCity: '',        
    directionNeighborhood: '',
    municipalityOrState: 0,      
    
    isSecured: false,               // Booleano para indicar si está asegurado
    insuranceId: null,               
    ipTypeInsured: '',              
    ipInsuredRecord: '',  
    ipInsuredName: '',         

    directionLatitude: 0,                  
    directionLongitude: 0,                
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
    hospitalizedEntryDate: '',
    utiHospitalized: null,
    utiHospitalizationDate: '', 
    hospitalizedName: '',
    dischargeType: '',
    dischargeDate: '', 
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
        console.log(state.stepFive)
    },
    updateStepSix(state, action) {
        state.stepSix = { ...state.stepSix, ...action.payload };
        console.log(state.stepSix)
    },
    ClearForm: (state) => {
        state.stepOne = null;
        state.stepTwo = null;
        state.stepThree = null;
        state.stepFour = null;
        state.stepFive = null;
        state.stepSix = null;
    },
    // Agregar otros reducers si se requiere
  },
});

export const { updateStepOne, updateStepTwo, updateStepThree, updateStepFour, updateStepFive, updateStepSix, ClearForm } = fileSlice.actions;

export default fileSlice.reducer;
