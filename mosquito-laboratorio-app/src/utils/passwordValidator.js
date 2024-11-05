export function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.\-_()&$!*])[A-Za-z\d@.\-_()&$!*]{8,}$/;
    return passwordRegex.test(password);
}