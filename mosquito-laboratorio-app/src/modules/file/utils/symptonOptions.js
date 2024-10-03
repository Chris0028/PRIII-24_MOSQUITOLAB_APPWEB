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
    { label: 'Distres Respiratorio', value: 10 },       // ID 10 - Distres respiratorio
    { label: 'Choque', value: 11 },                     // ID 11 - Choque
    { label: 'Sangrado Grave', value: 12 },             // ID 12 - Sangrado grave
    { label: 'Compromiso: Grave de Organos', value: 13 }, // ID 13 - Compromiso grave de órganos
  ],
};

export const chikungunyaSymptoms = [
  { label: 'Fiebre > 38.5°C', value: 2 },               // ID 2 - Fiebre (misma fiebre compartida)
  { label: 'Polialtralgias', value: 14 },               // ID 14 - Poliartralgias
  { label: 'Poliartritis', value: 15 },                 // ID 15 - Poliartritis
  { label: 'Mialgias', value: 1 },                      // ID 1 - Mialgia (compartido)
  { label: 'Exantema', value: 16 },                     // ID 16 - Exantema
];

export const zikaSymptoms = [
  { label: 'Exantema Maculopapular', value: 17 },       // ID 17 - Exantema maculopapular
  { label: 'Conjuntivitis no Purulenta', value: 18 },   // ID 18 - Conjuntivitis no purulenta
  { label: 'Fiebre < 38.5°C', value: 2 },               // ID 2 - Fiebre (misma fiebre compartida)
  { label: 'Mialgia/Artralgia', value: 19 },            // ID 19 - Artralgia (y Mialgia en algunos casos)
  { label: 'Edema Periarticular', value: 20 },          // ID 20 - Edema periarticular
];