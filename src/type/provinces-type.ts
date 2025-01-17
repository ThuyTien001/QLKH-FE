export interface InitialStateProvincesType {
    city: ItemsCityType[];
    districts: ItemsDistrictsType[];
    wards: WardsType[];
}

export interface ItemsCityType {
    code: number;
    codename: string;
    division_type: string;
    name: string;
    phone_code: number;
}

export interface ItemsDistrictsType {
    code: number;
    codename: string;
    division_type: string;
    name: string;
    province_code: number;
}

export interface WardsType {
    code: number;
    codename: string;
    district_code: number;
    division_type: string;
    name: string;
}
