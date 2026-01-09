import * as axiosRaw from "axios";

const axiosInstance = (axiosRaw as any).default ? (axiosRaw as any).default : axiosRaw;

export const api: {
    get: (url: string) => any;
    post: (url: string, data: any) => any;
} = {
    get: (url: string) => axiosInstance.get(url),
    post: (url: string, data: any) => axiosInstance.post(url, data),
};
