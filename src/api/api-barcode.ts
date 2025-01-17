import { axiosClient } from "./axios-client"

export const apiBarcode = {
    getBarcode: () => {
        return axiosClient.get('/barcode');
    }
}