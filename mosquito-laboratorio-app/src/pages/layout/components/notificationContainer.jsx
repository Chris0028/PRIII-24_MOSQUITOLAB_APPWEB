// NotificationContainer.jsx
import React, { useEffect } from 'react';
import { Message, useToaster } from 'rsuite';

const NotificationContainer = ({ message }) => {
    const toaster = useToaster();

    useEffect(() => {
        if (message) {
            toaster.push(
                <Message type="info" duration={5000}>
                    {`Notificación: ${message} -  ${new Date().toLocaleTimeString()}`}
                </Message>
            );
        }
    }, [message, toaster]);

    return null; 
};

export default NotificationContainer;
