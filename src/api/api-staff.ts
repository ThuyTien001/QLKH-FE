import { StaffData } from './../type/staff-type';
// import { LoginData, } from "@/type"
import { axiosClient } from "./axios-client"

export const apiStaff = {
    getAll: () => {
        return axiosClient.get('/staff')
    },
    // login: async(staffData: LoginData) =>{
    //     try{
    //         const response = await axiosClient.post('/login', staffData);
    //         return response.data;
    //     }catch(error){
    //         if(error instanceof Error){
    //             throw new Error("Đăng nhập không thành công"+ error.message);
    //         }else{
    //             throw new Error("Lỗi không xác định khi đăng nhập")
    //         }
    //     }
    // },
    login: async (data: { staff_username: string; staff_password: string }) => {
        // const response = await axiosClient.post('/login',{
        //   method: "POST",
        //   credentials: "include", // Quan trọng để gửi cookie/session
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(data),
        // });
        const response = await axiosClient.post(
            "/login",
            data, // ✅ Không cần JSON.stringify
            {
              withCredentials: true, // ✅ Để gửi cookie/session
              headers: { "Content-Type": "application/json" }, // ✅ Đặt ở đây
            }
          );
          
    
        if (!response.data) {
          throw new Error("Sai tên đăng nhập hoặc mật khẩu!");
        }
    
        return response.data;
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