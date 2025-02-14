import { dataLeadProvider } from "@/type";
import { axiosClient } from "./axios-client";

export const apiLeadProvider ={
    addLeadProvider: async(dataLeadProvider: dataLeadProvider) =>{
        try{
            const response = await axiosClient.post('/leadprovider/add', dataLeadProvider);
            return response.data
        }catch(error: unknown){
            if(error instanceof Error){
                throw new Error("Lỗi khi thêm đầu mối"+error);
            }else{
                throw new Error("Lỗi không xác định khi thêm đầu mối");
            }
        }
    },
    updateLeadProvider: async(dataLeadProvider: dataLeadProvider)=> {
        try{
            const response = await axiosClient.put('/leadprovider/update', dataLeadProvider);
            return response.data
        }catch(error: unknown){
            if(error instanceof Error){
                throw new Error ("Lỗi khi cập nhật thông tin đầu mối: " + error);
            }else{
                throw new Error("Lỗi không xác định khi cập nhật thông tin đầu mối")
            }
        }
    }
}