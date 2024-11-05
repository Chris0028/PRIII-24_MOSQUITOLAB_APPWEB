import { httpClient } from "../../../api/httpClient/httpClient";

export async function GetFileDetails(fileID) {
    try {
        const res = await httpClient.post('/File/GetFileDetails', fileID);
        if (res.status === 200) {
            return res.data;
        } else {
            console.log('Error de Comunicación');
        }
    } catch (error) {
        console.error('Error al obtener los detalles del archivo:', error);
    }
};
//fileReducer, llamar a una funcion que asigne los datos de la respuesta del servidor al paso 1 paso 2 paso 3, etc, y lo voy mostrando en el componente, si tarda meter un loader
export async function UpdateFile(fileData) {
    try {
        const res = await httpClient.patch('/File/UpdateFile', fileData);
        if (res.status === 200) {
            return res.data;
        } else {
            console.log('Error de Comunicación');
        }
    } catch (error) {
        console.error('Error al actualizar el archivo:', error);
    }
};
