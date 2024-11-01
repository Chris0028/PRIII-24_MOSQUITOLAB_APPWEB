import { httpClient } from "../../../api/httpClient/httpClient";

export async function historyFilterHAsync(body) {
    const res = await httpClient.post('/File/HistoryFilterByHospitalId', body);
    if (res.status === 200) {
        console.log(res.data);
        return res.data;
    } else {
        throw new Error('Without data');
    }
}