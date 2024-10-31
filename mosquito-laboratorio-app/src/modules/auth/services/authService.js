import { httpClient } from "../../../api/httpClient/httpClient";

export async function authenticateAsync(user) {

    const data = {
        userName: user.username,
        password: user.password
    };

    try {
        const res = await httpClient.post('/Auth/SignIn', data);
        if (res.status == 200) {
            return res.data;
        }
    } catch (error) {
        return null;
    }
}