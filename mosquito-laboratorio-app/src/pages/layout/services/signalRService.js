// signalRService.js
import * as signalR from '@microsoft/signalr';

const connectToSignalR = (laboratoryId, onNotificationReceived) => {
    const token = localStorage.getItem("jwt");

    const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5174/notificationHub", {
            accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

    connection.start()
        .then(() => {
            console.log("Conectado a SignalR");
            connection.invoke("AddToLaboratoryGroup", String(laboratoryId))
                .catch(err => console.error("Error al unirse al grupo de laboratorio:", err));
        })
        .catch(err => console.error("Error al conectar a SignalR:", err));

    connection.on("ReceiveNotification", (message) => {
        console.log('Notificación recibida:', message);
        if (onNotificationReceived) {
            onNotificationReceived(message); // Llama a la función que maneja el mensaje
        }
    });

    return connection;
};

export default connectToSignalR;
