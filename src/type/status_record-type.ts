import { UploadFile } from "antd"

export interface FormStatus{
    status_name?: string,
    form_code?: string,
    application_date?: string,
    patent_code?: string,
    date_of_issuance?: string,
    patent?: UploadFile[],
    expiration_date?: string
    // record_id?: number,
    status_id?: number,
}

export interface StatusData {
    status_name?: string;
    form_code?: string;
    application_date?: string;
    date_of_issuance?: string;
    expiration_date?: string;
    patent?: string; // Đường dẫn file
    patent_code?: string;
    status_id?: number
  }