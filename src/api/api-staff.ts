import { LoginData, StaffData } from "@/type"
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
    },
    updateStaff: async (staffData: StaffData) => {
        try{
            const response = await axiosClient.put("/staff/update", staffData);
            return response.data
        }catch(error: unknown){
            if(error instanceof Error){
                throw new Error("Lỗi khi cập nhật thông tin nhân viên" + error);
            }else{
                throw new Error("Lỗi không xác định khi thêm nhân viên")
            }
        }
    },
    addStaff: async (staffData: StaffData) => {
        try{
            const response = await axiosClient.post('/staff/add', staffData);
            return response.data
        }catch(error: unknown){
            if(error instanceof Error) {
                throw new Error("Lỗi khi thêm nhân viên: " + error)
            }else{
                throw new Error("Lỗi không xác định khi thêm nhân viên");
            }
        }
    },
    

}