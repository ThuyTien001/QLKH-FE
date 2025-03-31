import { UploadFile } from "antd";

export interface FormContract{
    contract_code?: string;
    contract_name?: string;
    acceptance?: UploadFile[];
    settlement?: UploadFile[];
    bill?: UploadFile[];
    record_id?: number;
    contract_id?: number;
    contract?: UploadFile[];
}

export interface FormUpdateContract{
    contract_code?: string;
    contract_name?: string;
    acceptance?: string;
    settlement?: string;
    bill?: string;
    record_id?: number;
    contract_id?: number;
}