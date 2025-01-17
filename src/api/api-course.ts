import { DataCourse } from '@/type';
import { axiosClient } from './axios-client';
export const apiCourse = {
    getAllCourse: () => {
        return axiosClient.get('/course');
    },
    addCourse: async (courseData: DataCourse )=>{
        try{
            const response = await axiosClient.post('/course/add', courseData);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error("Lỗi khi thêm khóa học")
            }else{
                throw new Error("Lỗi không xác định khi thêm khóa học")
            }
        }
    },
    updateCourse: async (courseData: DataCourse) =>{
        try{
            const response = await axiosClient.put('/course/update', courseData);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error("Lỗi khi cập nhật khóa học");
            }else{
                throw new Error("Lỗi không xác định khi cập nhật khóa học")
            }
        }
    }
};