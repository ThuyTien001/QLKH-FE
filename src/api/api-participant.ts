import { axiosClient } from "./axios-client"

export const apiParticipant = {
    getPaticipant : () => {
        return axiosClient.get('/participant')
    },
};