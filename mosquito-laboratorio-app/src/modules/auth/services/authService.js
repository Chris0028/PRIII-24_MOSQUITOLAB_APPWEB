import { httpClient } from "../../../api/httpClient/httpClient";

export async function authenticateAsync(user) {

    const data = {
        userName: user.username,
        password: user.password
    };

    const res = await httpClient.post('/Auth/SignIn', data);
    if (res.status == 200) {
        return res.data;
    } else {
        console.log('Error de autenticación');
    }
}