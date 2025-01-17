import { dataStudent } from "@/type";
import { axiosClient } from ".";

export const apiStudents = {
    getAll: () => {
        return axiosClient.get('/students')
    },
    addStudent : async (studentData: dataStudent)=>{
        try{
            const response = await axiosClient.post('/student/add', studentData);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error("Lỗi khi thêm học viên");
            }else{
                throw new Error("Lỗi không xác định khi thêm học viên");
            }
        }
    },
    updateStudent: async (studentData: dataStudent) => {
        try{
            const response = await axiosClient.put('/student/update', studentData);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error("Lỗi khi cập nhật thông tin học viên");
            }else{
                throw new Error("Lỗi không xác định khi cập nhật thông tin học viên");
            }
        }
    }
};