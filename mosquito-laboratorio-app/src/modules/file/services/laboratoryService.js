import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetLaboratories() {

    const res = await httpClient.get('/Laboratory/GetLaboratories');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};