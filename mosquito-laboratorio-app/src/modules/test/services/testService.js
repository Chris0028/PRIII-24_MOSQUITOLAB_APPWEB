import { httpClient } from "../../../api/httpClient/httpClient";

export function diagnosticMethodsByDisease(diseaseName) {

    let diagnosticMethods = [];

    if (diseaseName === 'Dengue') {
        diagnosticMethods.push('RT-PCR en tiempo real', 'Elisa NS1', 'Mac Elisa IgM');
    } else if (diseaseName === 'Chikungunya') {
        diagnosticMethods.push('RT-PCR en tiempo real', 'Elisa IgM');
    } else {
        diagnosticMethods.push('RT-PCR en tiempo real', 'Elisa IgM');
    }
    return diagnosticMethods.map(diagnosticMethod => ({ label: diagnosticMethod, value: diagnosticMethod }));
}

export function sampleTypes() {
    return ['Suero', 'Orina'];
}

export function laboratoryResults() {
    return ['Positivo', 'Negativo'];
}

export function getCaseTypes() {
    return ['Sospechoso', 'Confirmado'];
}

export function getCaseMethods() {
    return ['Por laboratorio', 'Por nexo epidemiológico'];
}

export async function createResultAsync(test) {

    const res = await httpClient.patch(`/Test/UpdateTestSample`, test);
    if (res.status === 200) {
        return true;
    } else {
        throw new Error('An exception ocurring');
    }
}

export async function getResultAsync(fileId) {
    const res = await httpClient.get(`/Test/GetTestSample/${fileId}`);
    if (res.status === 200)
        return res.data;
    throw new Error('An exception ocurring');
}