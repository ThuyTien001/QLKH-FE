export interface dataCustomer {
    customer_id?: number,
    customer_code?: string,
    customer_name: string,
    business_name: string,
    object_name: string,
    phone: string,
    email: string,
    address: string,
    // fullAddress:string,
    lp_id: number,
    partner_id: number,
    position: string,
    
}
export interface statusCustomer{
    customer_id?: string;
    customer_status: string;
}