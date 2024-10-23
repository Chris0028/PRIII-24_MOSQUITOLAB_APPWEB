import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryFileByHospital(hospitalId) {

    const res = await httpClient.post('/File/HistoryFileByHospital', hospitalId);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};