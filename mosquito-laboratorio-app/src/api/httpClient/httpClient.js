import axios from "axios";
import { baseUrl } from "../baseUrl/baseUrl";

export const httpClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});