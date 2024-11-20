import CryptoJS from 'crypto-js';

const secretKey = "BjLqjvOsPh+38RYMb4zHOwl/3LhSoDRzFd0weFcp3r4"; 

export const encryptId = (id) => {
    const ciphertext = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
    return ciphertext;
};

export const decryptId = (encryptedId) => {
    const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
    const originalId = bytes.toString(CryptoJS.enc.Utf8);
    return originalId;
};
