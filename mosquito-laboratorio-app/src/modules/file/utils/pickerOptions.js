//PARA LA LISTA DE OPCIONES DE CASO DETECTADO
export const caseOptions = [
    { label: 'Caso Captado en Búsqueda Activa', value: 'ActiveSearch' },
    { label: 'Atención en Servicio de Salud', value: 'MedicalCenter' },
    { label: 'Otro', value: 'Other'},
];

//PARA LA LISTA DE SUBSECTORES DE LOS CENTROS DE SALUD
export const subSectorOptions = [
    { label: 'Público', value: 'Publica' },
    { label: 'Seguro Salud', value: 'Seguro Salud' },
    { label: 'Privado', value: 'Privado'},
    { label: 'Otro', value: 'Otro'},
];

//PARA LAS OPCIONES DE SEXO DEL PACIENTE
export const sexOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
];

//PARA LA LISTA DE PAISES (FALATA IMPLEMENTAR EN LA BDD)
export const countriesOptions = [
    { label: 'Argentina', value: '1' },
    { label: 'Brasil', value: '2' },
    { label: 'Chile', value: '3' },
    { label: 'Bolivia', value: '4'}
];

//PARA LA LISTA DE LABORATORIOS (FALTA IMPLEMENTAR EN LA BDD)
export const laboratoriesOptions = [
    { label: 'Laboratorio 1', value: '1' },
    { label: 'Laboratorio 2', value: '2' },
    { label: 'Laboratorio 3', value: '3' },
];

//PARA LOS TIPOS DE SEGURO DEL PACIENTE
export const secureOptions = [
    { label: 'Caja', value: '1' },
    { label: 'Seguro', value: '0' },
];

//PARA LOS SINTOMAS
export const dengueCaseOptions = [
    { label: 'Sin signos de alarma', value: 'sin_signos' },
    { label: 'Con signos de alarma', value: 'con_signos' },
    { label: 'Grave', value: 'grave' },
];

//PARA LOS TIPOS DE ALTA MEDICA
export const medicalDischargeOptions = [
    { label: 'Solicitada', value: 'Solicitada' },
    { label: 'Fuga', value: 'Fuga' },
    { label: 'Defuncion', value: 'Defuncion' },
];
  