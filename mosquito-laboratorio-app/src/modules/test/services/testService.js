import { httpClient } from "../../../api/httpClient/httpClient";

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
    return ['Suero', 'Orina'];
}

export function laboratoryResults() {
    return ['Positivo', 'Negativo'];
}

export async function createResultAsync(test) {

    console.log(test);

    const res = await httpClient.patch(`/Test/UpdateTestSample`, test);
    if (res.status === 200) {
        console.log('Resultado guardado');
    } else {
        throw new Error('An exception ocurring');
    }
}