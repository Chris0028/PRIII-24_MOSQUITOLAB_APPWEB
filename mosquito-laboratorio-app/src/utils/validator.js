export const regexName = /^(?!$)(?=[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]{3})[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]*$/;

export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@\.]{2,}(?<!\.\.)$/;

export const regexPhone = /^\+?\d+$/;

export const regexUserName = /^[a-zA-Z0-9]{7,}$/;
