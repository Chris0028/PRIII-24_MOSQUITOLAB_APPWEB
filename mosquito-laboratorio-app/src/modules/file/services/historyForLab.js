import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryForLab() {

    const res = await httpClient.get('/File/GetHistoryForLab');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};