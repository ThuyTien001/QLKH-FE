import { axiosClient } from "./axios-client"

export const apiCopyright = {
    getCopyright: () =>{
        return axiosClient.get('/copyright')
    }
}