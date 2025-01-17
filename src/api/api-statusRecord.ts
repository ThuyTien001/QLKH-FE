import { axiosClient } from "./axios-client"


export const apiStatusRecord = {
    addStatusRecord: async (data: FormData) => {
        try{
            const response = await axiosClient.post("/statusrecord/add", data, {
                headers: {
                    "content-Type": "multipart/form-data",
                },
            });
            return response;
        }catch(error) {
            console.error("Error adding record: ", error);
            throw error;
        }
    },
    updateStatusRecord: async (data: FormData) => {
        try{
            const response = await axiosClient.put('/statusrecord/update', data
                , {
                headers: {
                    "content-Type": "multipart/form-data",
                },
        });
            return response;
        }catch(error){
            console.error('Error update status record', error);
            throw error;
        }
    }
};