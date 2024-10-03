import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryFileByHospital() {

    const res = await httpClient.get('/File/HistoryFileByHospital');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};