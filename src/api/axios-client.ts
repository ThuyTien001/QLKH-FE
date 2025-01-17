import { REACT_APP_API_URL } from "@/constant";
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

export const axiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        "content-type": "application/json",
    },
    responseType: "json",
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function error() {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.error("Axios Response Error:", error);

        // Kiểm tra lỗi từ phản hồi server
        if (error.response) {
            const { status, data } = error.response;
            console.error(`Error ${status}:`, data);

            // Có thể xử lý các lỗi cụ thể dựa trên mã trạng thái
            if (status === 401) {
                message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                // Điều hướng người dùng đến trang đăng nhập (nếu cần)
                window.location.href = "/login";
            }
        }

        // Ném lỗi để xử lý thêm ở nơi gọi API
        return Promise.reject(error);
    }
);

export const axiosProvinces = axios.create({
    // baseURL: "https://provinces.open-api.vn/api",
    baseURL: "https://provinces.open-api.vn/api/",
    headers:{
        "Content-Type": "application/json",
    },
    responseType: "json",
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosProvinces.interceptors.request.use(
    (config) => {
        return config;
    },
    function error(){
        return Promise.reject(error);
    }
);

axiosProvinces.interceptors.response.use(
    (ressponse: AxiosResponse) => {
        if(ressponse && ressponse.data){
            return ressponse.data;
        }
        return ressponse;
    },
    (error) => {
        throw error;
    }
)
