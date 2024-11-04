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

export async function changePasswordAsync(passwordsList, username) {
    if (passwordsList.newPassword !== passwordsList.confirmPassword) {
        return false;
    } else {
        let data = {
            username: username,
            newPassword: passwordsList.newPassword,
            currentPassword: passwordsList.oldPassword
        }
        const res = await httpClient.post('/Auth/ChangePassword', data);
        if (res.status === 200)
            return true;
        return false;
    }
}