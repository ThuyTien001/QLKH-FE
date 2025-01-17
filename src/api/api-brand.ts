// import { axiosClient } from "./axios-client"

import { axiosClient } from "./axios-client";

export const apiBrand = {
    getBrand: () => {
        // console.log("brand: ", axiosClient.get('/brand'));
        return axiosClient.get('/brand');
    }
}

// export const apiBrand = {
//     getBrand: () => {
//         axiosClient.get('/brand')
//             .then(response => {
//                 console.log("Brand data: ", response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching brand: ", error);
//             });
//     }
// }
