import { UploadFile } from "antd";


export interface dataRecord{
    record_id?: string,
    record_code: string,
    form: File,
    image: File,
    authorization: File,
    business_license: File,
    orther?: File,
    commission_id: number,
    commission_name?: string
}

 export interface FormValues {
    record_id?: number;
  record_code: string;
  form?: UploadFile[];
  image?: UploadFile[];
  authorization?: UploadFile[];
  business_license?: UploadFile[];
  orther?: UploadFile[];
  commission_id?: number;
 }
export  interface FormValuesUpdate {
    record_code?: string;
    form?: string;
    image?: string
    authorization?: string 
    business_license?: string 
    orther?: string 
    commission_id?: string;
    commission_name?: string;
    record_id?: number;
}
