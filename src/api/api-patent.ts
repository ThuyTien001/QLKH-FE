import { axiosClient } from "./axios-client"

export const apiPatent = {
    getPatent: () => {
        return axiosClient.get('patent');
    }
}