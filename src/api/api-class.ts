import { ClassData } from "@/type";
import { axiosClient } from "./axios-client"

export const apiClass = {
    getAllClass: () =>{
        return axiosClient.get('/class');
    },
    addClass: async (classData: ClassData) => {
        try {
            const response = await axiosClient.post('/class/add', classData);
            return response.data; 
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Safely access the error message
                throw new Error("Lỗi khi thêm lớp học: " + error.message);
            } else {
                // Handle unknown error type
                throw new Error("Lỗi không xác định khi thêm lớp học");
            }
        }
    }
};