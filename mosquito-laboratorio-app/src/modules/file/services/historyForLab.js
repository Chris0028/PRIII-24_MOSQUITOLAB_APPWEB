import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryForLab(laboratoryId) {

    const res = await httpClient.post('/File/GetHistoryForLab', laboratoryId);
    if (res.status == 200) {
        console.log(res.data);
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};