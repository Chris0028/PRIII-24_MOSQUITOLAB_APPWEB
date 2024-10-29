import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetInsurances() {

    const res = await httpClient.get('/Insurance/GetInsurances');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};