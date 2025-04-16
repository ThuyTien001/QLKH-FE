// import { message } from "antd";
import { axiosClient } from "./axios-client";
import { dataCustomer, statusCustomer, } from "@/type";

export const apiStyleProduct = {
    getStyleProduct: () => {
        return axiosClient.get('/styleproducts');
    },
    getCommission: () => {
        return axiosClient.get('/commission');
    },
    addCustomer: async (dataCustomer: dataCustomer) => {
        try{
            const response = await axiosClient.post('/customer/add', dataCustomer);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error("Lỗi khi thêm khách hàng");
            }else{
                throw new Error("Lỗi không xác định khi thêm khách hàng");
            }
        }
    },
    updateCustomer: async (dataCustomer: dataCustomer) =>{
        try{
            const response = await axiosClient.put('/customer/update', dataCustomer);
            return response.data;
        }catch(error){
            if(error instanceof Error){
                throw new Error("Lỗi khi cập nhật thông tin khách hàng");
            }else{
                throw new Error("Lỗi không xác định khi cập nhật thông tin khách hàng")
            }
        }
    },
    getLeadProvider: () => {
        return axiosClient.get('/leadprovider');
    },
    getPartner: () => {
        return axiosClient.get('/partner');
    },
    getCustomerPotential: () => {
        return axiosClient.get('/customer_potential');
    },
    updateStatusCustomer : async (statusCustomer: statusCustomer) => {
        try{
            const respones = await axiosClient.put('/customer/update/status', statusCustomer);
            return respones.data;
        }catch(error){
            return { success: false, message: "Lỗi khi cập nhật trạng thái khách hàng"}
        }
    }
}