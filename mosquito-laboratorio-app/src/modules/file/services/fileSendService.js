import { httpClient } from "../../../api/httpClient/httpClient"


export async function PostFile(body) {

    const res = await httpClient.post('/File/CreateFile', body);
    if (res.status == 201) {
        return res.data;
    } else {
        console.log('Error de Comunicacion');
    }
};