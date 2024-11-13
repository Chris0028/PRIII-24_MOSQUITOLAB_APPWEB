import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryFileByHospital(hospitalId, page, limit) {

    const res = await httpClient.post('/File/HistoryFileByHospital', hospitalId, { params: { page, limit } });
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};
