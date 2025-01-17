import { axiosClient } from "./axios-client";

// interface AddRecordResponse {
//   success: boolean;
//   message?: string;
//   data?: any;
// }

export const apiRecord = {
  addRecord: async (dataRecord: FormData) => {
    try {
      const response = await axiosClient.post("/record/add", dataRecord, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Raw API response:", response);
      return response;
    } catch (error) {
      console.error("Error adding record: ", error);
      // throw new Error(error.response?.data?.message || "Lỗi không xác định khi thêm hồ sơ");
      throw error;
    }
  },
  updateRecord: async (data: FormData) => {
    try{
      const response = await axiosClient.put('/record/update', data
        , {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );
      return response;
    }catch(error){
      console.error('Error update record' , error);
      throw error;
    }
  }
};
