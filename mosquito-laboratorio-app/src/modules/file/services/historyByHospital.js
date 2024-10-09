import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryFileByHospital() {

    const res = await httpClient.post('/File/HistoryFileByHospital', 1);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};