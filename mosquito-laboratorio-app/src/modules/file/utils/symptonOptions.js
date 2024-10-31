export const dengueOptions = [
  { label: 'Sin signos de alarma', value: 'sin_signos' },
  { label: 'Con signos de alarma', value: 'con_signos' },
  { label: 'Grave', value: 'grave' },
];

export const dengueSymptoms = {
  sin_signos: [
    { label: 'Fiebre aguda', value: 2 },                // ID 2 - Fiebre
    { label: 'Nauseas/Vómitos', value: 3 },             // ID 3 - Vómitos
    { label: 'Cefalea', value: 4 },                     // ID 4 - Cefalea
    { label: 'Dolor Retro-Orbitario', value: 5 },       // ID 5 - Dolor retro-orbitario
    { label: 'Mialgias', value: 1 },                    // ID 1 - Mialgia
    { label: 'Petequias Prueba Torniquete +', value: 21 }, // ID 21 - Petequias prueba tormiquete +
  ],
  con_signos: [
    { label: 'Dolor Abdominal', value: 6 },             // ID 6 - Dolor abdominal
    { label: 'Vómitos Persistentes', value: 3 },        // ID 3 - Vómitos (mismo que en sin_signos)
    { label: 'Letargia o Irritabilidad', value: 7 },    // ID 7 - Letargia
    { label: 'Irritabilidad', value: 8 },               // ID 8 - Irritabilidad
    { label: 'Sangrado de Mucosas', value: 9 },         // ID 9 - Sangrado de mucosas
  ],
  grave: [
    { label: 'Distres Respiratorio', value: 10 },         // ID 10 - Distres respiratorio
    { label: 'Choque', value: 11 },                       // ID 11 - Choque
    { label: 'Sangrado Grave', value: 12 },               // ID 12 - Sangrado grave
    { label: 'Compromiso: Grave de Organos', value: 13 }, // ID 13 - Compromiso grave de órganos
  ],
};

export const chikungunyaSymptoms = [
  { label: 'Fiebre > 38.5°C', value: 2 },               // ID 2  - Fiebre (misma fiebre compartida)
  { label: 'Polialtralgias', value: 14 },               // ID 14 - Poliartralgias
  { label: 'Poliartritis', value: 15 },                 // ID 15 - Poliartritis
  { label: 'Mialgias', value: 1 },                      // ID 1  - Mialgia (compartido)
  { label: 'Exantema', value: 16 },                     // ID 16 - Exantema
];

export const zikaSymptoms = [
  { label: 'Exantema Maculopapular', value: 17 },       // ID 17 - Exantema maculopapular
  { label: 'Conjuntivitis no Purulenta', value: 18 },   // ID 18 - Conjuntivitis no purulenta
  { label: 'Fiebre < 38.5°C', value: 2 },               // ID 2 - Fiebre (misma fiebre compartida)
  { label: 'Mialgia/Artralgia', value: 19 },            // ID 19 - Artralgia (y Mialgia en algunos casos)
  { label: 'Edema Periarticular', value: 20 },          // ID 20 - Edema periarticular
];




//PARA LAS SEMANAS EPIDEMIOLOGICAS
// pickerOptions.js
export const epidemiologicalWeeks = [
  { start: new Date('2023-12-31'), end: new Date('2024-01-06'), week: 1 },
  { start: new Date('2024-01-07'), end: new Date('2024-01-13'), week: 2 },
  { start: new Date('2024-01-14'), end: new Date('2024-01-20'), week: 3 },
  { start: new Date('2024-01-21'), end: new Date('2024-01-27'), week: 4 },
  { start: new Date('2024-01-28'), end: new Date('2024-02-03'), week: 5 },
  { start: new Date('2024-02-04'), end: new Date('2024-02-10'), week: 6 },
  { start: new Date('2024-02-11'), end: new Date('2024-02-17'), week: 7 },
  { start: new Date('2024-02-18'), end: new Date('2024-02-24'), week: 8 },
  { start: new Date('2024-02-25'), end: new Date('2024-03-02'), week: 9 },
  { start: new Date('2024-03-03'), end: new Date('2024-03-09'), week: 10 },
  { start: new Date('2024-03-10'), end: new Date('2024-03-16'), week: 11 },
  { start: new Date('2024-03-17'), end: new Date('2024-03-23'), week: 12 },
  { start: new Date('2024-03-24'), end: new Date('2024-03-30'), week: 13 },
  { start: new Date('2024-03-31'), end: new Date('2024-04-06'), week: 14 },
  { start: new Date('2024-04-07'), end: new Date('2024-04-13'), week: 15 },
  { start: new Date('2024-04-14'), end: new Date('2024-04-20'), week: 16 },
  { start: new Date('2024-04-21'), end: new Date('2024-03-27'), week: 17 },
  { start: new Date('2024-04-28'), end: new Date('2024-05-04'), week: 18 },
  { start: new Date('2024-05-05'), end: new Date('2024-05-11'), week: 19 },
  { start: new Date('2024-05-12'), end: new Date('2024-05-18'), week: 20 },
  { start: new Date('2024-05-19'), end: new Date('2024-05-25'), week: 21 },
  { start: new Date('2024-05-26'), end: new Date('2024-06-01'), week: 22 },
  { start: new Date('2024-06-02'), end: new Date('2024-06-08'), week: 23 },
  { start: new Date('2024-06-09'), end: new Date('2024-06-15'), week: 24 },
  { start: new Date('2024-06-16'), end: new Date('2024-06-22'), week: 25 },
  { start: new Date('2024-06-23'), end: new Date('2024-06-29'), week: 26 },
  { start: new Date('2024-06-30'), end: new Date('2024-07-06'), week: 27 },
  { start: new Date('2024-07-07'), end: new Date('2024-07-13'), week: 28 },
  { start: new Date('2024-07-14'), end: new Date('2024-07-20'), week: 29 },
  { start: new Date('2024-07-21'), end: new Date('2024-07-27'), week: 30 },
  { start: new Date('2024-07-28'), end: new Date('2024-08-03'), week: 31 },
  { start: new Date('2024-08-04'), end: new Date('2024-08-10'), week: 32 },
  { start: new Date('2024-08-11'), end: new Date('2024-08-17'), week: 33 },
  { start: new Date('2024-08-18'), end: new Date('2024-08-24'), week: 34 },
  { start: new Date('2024-08-25'), end: new Date('2024-08-31'), week: 35 },
  { start: new Date('2024-09-01'), end: new Date('2024-09-07'), week: 36 },
  { start: new Date('2024-09-08'), end: new Date('2024-09-14'), week: 37 },
  { start: new Date('2024-09-15'), end: new Date('2024-09-21'), week: 38 },
  { start: new Date('2024-09-22'), end: new Date('2024-09-28'), week: 39 },
  { start: new Date('2024-09-29'), end: new Date('2024-10-05'), week: 40 },
  { start: new Date('2024-10-06'), end: new Date('2024-10-12'), week: 41 },
  { start: new Date('2024-10-13'), end: new Date('2024-10-19'), week: 42 },
  { start: new Date('2024-10-20'), end: new Date('2024-10-26'), week: 43 },
  { start: new Date('2024-10-27'), end: new Date('2024-11-02'), week: 44 },
  { start: new Date('2024-11-03'), end: new Date('2024-11-09'), week: 45 },
  { start: new Date('2024-11-10'), end: new Date('2024-11-16'), week: 46 },
  { start: new Date('2024-11-17'), end: new Date('2024-11-23'), week: 47 },
  { start: new Date('2024-11-24'), end: new Date('2024-11-30'), week: 48 },
  { start: new Date('2024-12-01'), end: new Date('2024-12-07'), week: 49 },
  { start: new Date('2024-12-08'), end: new Date('2024-12-14'), week: 50 },
  { start: new Date('2024-12-15'), end: new Date('2024-12-21'), week: 51 },
  { start: new Date('2024-12-22'), end: new Date('2024-12-28'), week: 52 },
];
