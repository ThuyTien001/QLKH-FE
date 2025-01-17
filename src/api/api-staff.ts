import { LoginData } from "@/type"
import { axiosClient } from "./axios-client"

export const apiStaff = {
    getAll: () => {
        return axiosClient.get('/staff')
    },
    login: async(staffData: LoginData) =>{
        try{
            const response = await axiosClient.post('/login', staffData);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error("Đăng nhập không thành công"+ error.message);
            }else{
                throw new Error("Lỗi không xác định khi đăng nhập")
            }
        }
    }


}