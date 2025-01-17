import { axiosClient } from "./axios-client"

export const apiContract = {
    addContract: async(data: FormData) => {
        try{
            const response = await axiosClient.post('/contract/add', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response
        }catch(error) {
            console.error("Error adding contract: ", error);
            throw error;
        }
    },
    updateContract: async(data: FormData) => {
        try{
            const response = await axiosClient.put('/contract/update', data, {
                headers: {
                    "content-Type": "multipart/form-data",
                },
            });
            return response;
        }catch(error){
            console.error("Error update contract", error);
            throw error;
        }
    }
}