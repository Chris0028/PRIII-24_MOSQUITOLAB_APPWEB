import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryForLab(laboratoryId) {

    const res = await httpClient.post('/File/GetHistoryForLab', laboratoryId);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};