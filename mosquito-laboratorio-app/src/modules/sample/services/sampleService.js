import { httpClient } from "../../../api/httpClient/httpClient";

export async function getSamplesAsync(body) {
    const res = await httpClient.post('/Sample/All', body);
    if (res.status == 200) {
        return res.data;
    } else {
        throw new Error('Without data');
    }
}

export async function getDiseasesAsync() {
    const res = await httpClient.get('/Sample/GetDiseases')
    if (res.status == 200) {
        return res.data;
    } else {
        throw new Error('An exception ocurring')
    }
}