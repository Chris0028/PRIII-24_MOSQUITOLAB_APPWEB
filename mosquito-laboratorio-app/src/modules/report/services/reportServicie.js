import { httpClient } from "../../../api/httpClient/httpClient";

export async function GetReportsListAsync(body) {
    try {
        const res = await httpClient.post('/File/GetReportsList', body);
        if (res.status === 200) {
            return res.data;
        } else {
            console.log('Error de Comunicación');
        }
    } catch (error) {
        console.error('Error al obtener los detalles del archivo:', error);
    }
};