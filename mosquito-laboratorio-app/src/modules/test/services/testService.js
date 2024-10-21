export function diagnosticMethodsByDisease(diseaseId) {

    let diagnosticMethods = [];

    switch (diseaseId) {
        case 1:
            diagnosticMethods.push('RT-PCR en tiempo real', 'Elisa NS1', 'Mac Elisa IgM'); //dengue
            break;
        case 2:
            diagnosticMethods.push('RT-PCR en tiempo real', 'Elisa IgM'); //chikungunya
            break;
        case 3:
            diagnosticMethods.push('RT-PCR en tiempo real', 'Elisa IgM'); //zika
            break;
    }

    return diagnosticMethods;
}

export function sampleTypes() {
    return ['Suero', 'Orina', 'Otro'];
}

export function laboratoryResults() {
    return ['Positivo', 'Negativo'];
}