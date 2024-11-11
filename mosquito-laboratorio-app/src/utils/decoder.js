import { jwtDecode } from "jwt-decode";

export function decodeToken(jwt) {
    return jwtDecode(jwt);
}