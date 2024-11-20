import { httpClient } from "../../../../api/httpClient/httpClient"

export async function GetResult(id) {
    try {
        const res = await httpClient.post('/Result/GetResult', id);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error(`Error en la solicitud: ${res.status}`);
        }
    } catch (error) {
        console.error('Error en GetResult:', error);
        throw error;
    }
};