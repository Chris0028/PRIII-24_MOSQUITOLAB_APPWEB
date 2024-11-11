import { httpClient } from "../../../api/httpClient/httpClient";

export async function getFileWithResultAsync(fileId) {
    const res = await httpClient.post('/File/GetFileWithResult', fileId);
    if (res.status === 200) {
        let responseDeserealized = deserealizeObject(res.data.ufc_get_file_with_result);
        return responseDeserealized;
    } else {
        console.log('ERROR');
    }
}

function deserealizeObject(object) {
    return JSON.parse(object);
}