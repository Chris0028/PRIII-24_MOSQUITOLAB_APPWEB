export function validateName(source) {
    const regex = /^[A-Za-zÑñÁÉÍÓÚáéíóú]{2,60}$/;
    return regex.test(source);
}

export function validateEmail(source) {
    const regex = /^[\w\.-]+@[\w\.-]+\.[\w\.]{2,}(?<!\.\.)$/;
    return regex.test(source);
}

export function validatePhoneNumber(source) {
    const regex = /^\+?\d+$/;
    return regex.test(source);
}