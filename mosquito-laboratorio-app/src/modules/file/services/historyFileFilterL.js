import { httpClient } from "../../../api/httpClient/httpClient";

export async function historyFilterLAsync(body) {
    const res = await httpClient.post('/File/HistoryFilterByLabId', body);
    if (res.status === 200) {
        return res.data;
    } else {
        throw new Error('Without data');
    }
}