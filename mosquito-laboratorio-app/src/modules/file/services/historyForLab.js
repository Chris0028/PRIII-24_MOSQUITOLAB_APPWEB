import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHistoryForLab(laboratoryId, page, limit) {

    const res = await httpClient.post('/File/HistoryForLab', laboratoryId, { params: { page, limit } });
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};
