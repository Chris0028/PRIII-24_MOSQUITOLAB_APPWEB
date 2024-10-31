import { httpClient } from "../../../../api/httpClient/httpClient";

export async function ReportByGender() {

    const res = await httpClient.get('/Report/ReportByGender');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};

export async function ReportByAge() {

    const res = await httpClient.get('/Report/ReportByAge');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};