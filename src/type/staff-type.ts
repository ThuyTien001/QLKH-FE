export interface StaffData {
    staff_id: number,
    staff_code: string,
    staff_name: string,
    staff_position: string,
    staff_phone: string,
    staff_email: string,
    staff_address: string,
    staff_username: string,
    staff_password: string,
    staff_status: string,
}

export interface InitialStateStaffType{
    is_loading?: boolean;
    data: StaffData[];
}

export interface LoginData {
    staff_username: string,
    staff_password: string
}