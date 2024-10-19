import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHospitals(){
    const res = await httpClient.get('/Hospital/GetHospitals');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
}