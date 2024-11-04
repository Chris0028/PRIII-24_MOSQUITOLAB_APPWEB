import { httpClient } from "../../../api/httpClient/httpClient";

export async function getAllUsersAsync(page, limit) {
    const res = await httpClient.get('/User/GetAll', { params: { page, limit } });
    if (res.status === 200)
        return res.data;
    else
        throw new Error('Request Failed');
}

export async function deleteUserAsync(id) {
    const res = await httpClient.post('/User/Delete', id);
    if (res.status === 204)
        return true;
    return false;
}

export async function createUserAsync(user) {
    const res = await httpClient.post('/User/New', user);
    if (res.status === 201)
        return res.data;
    else
        throw new Error('Request Failed');
}

export async function changeFirstLoginAsync(username) {
    const res = await httpClient.post('/User/ChangeFirstLogin', username);
    if (res.status === 204)
        return true;
    else
        throw new Error('Request Failed');
}

export async function getProfileAsync(role, id) {
    const res = await httpClient.get('/User/GetProfile', { params: { id, role } });
    if (res.status === 200)
        return res.data;
    else
        throw new Error('Request failed');
}

export async function updateProfileAsync(user, id) {
    const res = await httpClient.patch(`/User/UpdateProfile/${id}`, user);
    if (res.status === 204)
        return true;
    throw new Error('Request failed');
}

export function getRoles() {
    return [
        {
            label: 'Administrador',
            value: 'Admin'
        },
        {
            label: 'Médico',
            value: 'Doctor'
        },
        {
            label: 'Laboratorio',
            value: 'Employee'
        }
    ]
}