import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetMunicipalities() {

    const res = await httpClient.get('/Location/GetMunicipalities');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
}