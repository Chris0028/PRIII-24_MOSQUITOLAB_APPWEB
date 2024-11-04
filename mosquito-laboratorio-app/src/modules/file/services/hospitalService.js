import { httpClient } from "../../../api/httpClient/httpClient"

export async function GetHospitals() {
    const res = await httpClient.get('/Hospital/GetHospitals');
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
}

export async function GetDoctorData() {

}

export async function getNamesNIdsOfHospitals() {
    const res = await httpClient.get('/Hospital/GetNamesNIds');
    if (res.status === 200)
        return res.data;
    else
        throw new Error('Request failed');
}