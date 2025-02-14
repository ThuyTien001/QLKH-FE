import { dataPartner } from "@/type";
import { axiosClient } from "./axios-client";

export const apiPartner = {
    addPartner: async(dataPartner: dataPartner) => {
        try{
            const response = await axiosClient.post('/partner/add', dataPartner);
            return response.data
        }catch(error: unknown){
            if(error instanceof Error){
                throw new Error("Lỗi khi thêm đối tác: "+ error);
            }else{
                throw new Error("Lỗi không xác định khi thêm đối tác");
            }
        }
    },
    updatePartner: async(dataPartner: dataPartner)=> {
        try{
            const response = await axiosClient.put("/partner/update", dataPartner);
            return response.data
        }catch(error:unknown){
            if(error instanceof Error){
                throw new Error("Lỗi khi cập nhật thông tin đối tác" +error)
            }else{
                throw new Error("Lỗi không xác định kho cập nhật thông tin đối tác");
            }
        }
    }
}