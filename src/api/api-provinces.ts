import { ItemsCityType, ItemsDistrictsType, WardsType } from '../type/provinces-type';
import { axiosProvinces } from './axios-client';


export const apiProvinces = {
    getCity: (): Promise<ItemsCityType[]> => {
        const url = "p";
        return axiosProvinces.get(url);
    },
    getDistricts: (code: number): Promise<{districts: ItemsDistrictsType[]}> => {
        const url = `/p/${code}?depth=2`;
        return axiosProvinces.get(url);
    },
    getWards: (code: number): Promise<{wards: WardsType[]}> => {
        const url = `/d/${code}?depth=2`;
        return axiosProvinces.get(url);
    }
}