import { httpClient } from "../../../api/httpClient/httpClient"

export async function authenticate(user) {

    const data = {
        userName: user.username,
        password: user.password
    };

    const res = await httpClient.post('/Auth/SignIn', data);
    if (res.status == 200) {
        console.log(res.data);
    } else {
        console.log('Error de autenticación');
    }
}