// import { REACT_APP_API_URL } from './index';
// export const REACT_APP_API_URL = 'http://localhost:5000/api/'
export const REACT_APP_API_URL = 'https://qlkh-be.onrender.com/api'
// export const REACT_APP_API_URL = 'http://dichvukhcn.id.vn/api/'

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token"); // Hoặc sessionStorage
    return !!token; // Trả về true nếu token tồn tại
};

export const dataHomePage = [
    {
        student_code: "HV001",
        student_name: "Trần Thị Thúy Tiên",
        phone: "0123456789",
        email: "chuacoemail@gmail.com",
        class_name: "Tập huấn cán bộ đoàn",
        timelimit: "2 năm",
        start_time: "21/11/2024",
        end_time: "21/12/2024"
    },
    {
        student_code: "HV001",
        student_name: "Trần Thị Thúy Tiên",
        phone: "0123456789",
        email: "chuacoemail@gmail.com",
        class_name: "Tập huấn cán bộ đoàn",
        time: "2 năm",
        start_time: "21/11/2024",
        end_time: "21/12/2024"
    },
    {
        student_code: "HV001",
        student_name: "Trần Thị Thúy Tiên",
        phone: "0123456789",
        email: "chuacoemail@gmail.com",
        class_name: "Tập huấn cán bộ đoàn",
        time: "2 năm",
        start_time: "21/11/2024",
        end_time: "21/12/2024"
    },
    {
        student_code: "HV001",
        student_name: "Trần Thị Thúy Tiên",
        phone: "0123456789",
        email: "chuacoemail@gmail.com",
        class_name: "Tập huấn cán bộ đoàn",
        time: "2 năm",
        start_time: "21/11/2024",
        end_time: "21/12/2024"
    },
    {
        student_code: "HV001",
        student_name: "Trần Thị Thúy Tiên",
        phone: "0123456789",
        email: "chuacoemail@gmail.com",
        class_name: "Tập huấn cán bộ đoàn",
        time: "2 năm",
        start_time: "21/11/2024",
        end_time: "21/12/2024"
    },
    {
        student_code: "HV001",
        student_name: "Trần Thị Thúy Tiên",
        phone: "0123456789",
        email: "chuacoemail@gmail.com",
        class_name: "Tập huấn cán bộ đoàn",
        time: "2 năm",
        start_time: "21/11/2024",
        end_time: "21/12/2024"
    },
];

export const dataStyleProduct = [
    {
        customer_code: "KH1124",
        customer_name: "Trần Thị Thúy Tiên",
        business_name: "Đơn vị A",
        object_name: "Kiểu dáng B",
        phone: "0123456789",
        email: "emailne@gmail.com",
        address: "118/3, Trần Phú, Cái Khế, Ninh Kiều, Cần Thơ",
        partner_name: "Đối tác 1",
        introducer: "Đầu mối C",
        commission: "Đã chi hoa hồng",
        list_profile: [
            {
                profile_code: "KD1124",
                form: "Đơn",
                image: "hình ảnh/logo",
                authorization: "Giấy ủy quyền",
                business_license: "Giấy phép kinh doanh",
                other: "Giấy tờ khác",
                status_profile: [
                    {
                        status_name: "Đã tư vấn",
                        form_code: "D001",
                        application_date: "27/10/2024",
                        patent_code: "Số văn bằng",
                        date_of_issuance: "27/12/2024",
                        patent: "Văn bằng",
                        expiration_date: "27/10/2025",
                    }
                ]
            }
        ],

    },
    {
        customer_code: "KH1124",
        customer_name: "Trần Thị Thúy Tiên",
        business_name: "Đơn vị A",
        object_name: "Kiểu dáng B",
        phone: "0123456789",
        email: "emailne@gmail.com",
        address: "118/3, Trần Phú, Cái Khế, Ninh Kiều, Cần Thơ",
        partner_name: "Đối tác 1",
        introducer: "Đầu mối C",
        commission: "Đã chi hoa hồng",
        // list_profile: [
        //     {
        //         profile_code: "KD1124",
        //         form: "Đơn",
        //         image: "hình ảnh/logo",
        //         authorization: "Giấy ủy quyền",
        //         business_license: "Giấy phép kinh doanh",
        //         status_profile: [
        //             {
        //                 status_name: "Đã tư vấn",
        //                 form_code: "D001",
        //                 application_date: "27/10/2024",
        //                 patent_code: "Số văn bằng",
        //                 date_of_issuance: "27/12/2024",
        //                 patent: "Văn bằng",
        //                 expiration_date: "27/10/2025",
        //             }
        //         ]
        //     }
        // ],

    }
]
export const dataBrand = [
        {
            customer_code: "KH1124",
            customer_name: "Trần Thị Thúy Tiên",
            business_name: "Đơn vị A",
            object_name: "Kiểu dáng B",
            phone: "0123456789",
            email: "emailne@gmail.com",
            address: "118/3, Trần Phú, Cái Khế, Ninh Kiều, Cần Thơ",
            partner_name: "Đối tác 1",
            introducer: "Đầu mối C",
            commission: "Đã chi hoa hồng",
            list_profile: [
                {
                    profile_code: "NH1124",
                    form: "Đơn",
                    image: "hình ảnh/logo",
                    authorization: "Giấy ủy quyền",
                    business_license: "Giấy phép kinh doanh",
                    other: "Giấy tờ khác",
                    status_profile: [
                        {
                            status_name: "Đã tư vấn",
                            form_code: "D001",
                            application_date: "27/10/2024",
                            patent_code: "Số văn bằng",
                            date_of_issuance: "27/12/2024",
                            patent: "Văn bằng",
                            expiration_date: "27/10/2025",
                        }
                    ]
                }
            ],

        },
    {
        customer_code: "KH1124",
        customer_name: "Trần Thị Thúy Tiên",
        business_name: "Đơn vị A",
        object_name: "Kiểu dáng B",
        phone: "0123456789",
        email: "emailne@gmail.com",
        address: "118/3, Trần Phú, Cái Khế, Ninh Kiều, Cần Thơ",
        partner_name: "Đối tác 1",
        introducer: "Đầu mối C",
        commission: "Đã chi hoa hồng",
        // list_profile: [
        //     {
        //         profile_code: "KD1124",
        //         form: "Đơn",
        //         image: "hình ảnh/logo",
        //         authorization: "Giấy ủy quyền",
        //         business_license: "Giấy phép kinh doanh",
        //         status_profile: [
        //             {
        //                 status_name: "Đã tư vấn",
        //                 form_code: "D001",
        //                 application_date: "27/10/2024",
        //                 patent_code: "Số văn bằng",
        //                 date_of_issuance: "27/12/2024",
        //                 patent: "Văn bằng",
        //                 expiration_date: "27/10/2025",
        //             }
        //         ]
        //     }
        // ],

    }
]
export const ModalTypeEnum = {
    NULL: "NULL",
    CREATE: "CREATE",
    MODAL_ADD_CLASS: "MODAL_ADD _CLASS",
    MODAL_ADD_COURSE: "MODAL_ADD_COURSE",
    MODAL_UPDATE_COURSE: "MODAL_UPDATE_COURSE",
    MODAL_ADD_PROFILE_STYLE: "MODAL_ADD_PROFILE_STYLE",
    MODAL_ADD_PROFILE: "MODAL_ADD_PROFILE",
    MODAL_UPDATE_PROFILE: "MODAL_UPDATE_PROFILE",
    MODAL_UPDATE_STATUS_PROFILE: "MODAL_UPDATE_STATUS_PROFILE",
    MODAL_ADD_BRAND: "MODAL_ADD_BRAND",
    MODAL_UPDATE_PROFILE_BRAND: "MODAL_UPDATE_PROFILE_BRAND",
    MODAL_UPDATE_STATUS_BRAND: "MODAL_UPDATE_STATUS_BRAND",
    MODAL_ADD_PROFILE_BRAND: "MODAL_ADD_PROFILE_BRAND",
    MODAL_ADD_STUDENT: "MODAL_ADD_STUDENT",
    MODAL_UPDATE_STUDENT: "MODAL_UPDATE_STUDENT",
    MODAL_UPDATE_CUSTOMER: "MODAL_UPDATE_CUSTOMER",
    MODAL_ADD_STATUS_RECORD_STYLE: "MODAL_ADD_STATUS_RECORD_STYLE",
    MODAL_ADD_STATUS_RECORD_BRAND: "MODAL_ADD_STATUS_RECORD_BRAND",
    MODAL_ADD_PROFILE_PATENT: "MODAL_ADD_PROFILE_PATENT",
    MODAL_UPDATE_PROFILE_PATENT: "MODAL_UPDATE_PROFILE_PATENT",
    MODAL_ADD_RECORD_BARCODE: "MODAL_ADD_RECORD_BARCODE",
    MODAL_UPDATE_RECORD_BARCODE: "MODAL_UPDATE_RECORD_BARCODE",
    MODAL_ADD_STATUS_RECORD_BARCODE: "MODAL_ADD_STATUS_RECORD_BARCODE",
    MODAL_ADD_RECORD_COPYRIGHT: "MODAL_ADD_RECORD_COPYRIGHT",
    MODAL_ADD_CONTRACT: "MODAL_ADD_CONTRACT",
    MODAL_UPDATE_CONTRACT: "MODAL_UPDATE_CONTRACT",
    MODAL_ADD_STAFF: "MODAL_ADD_STAFF",
    MODAL_ACCOUNT: "MODAL_ACCOUNT",
    MODAL_ADD_LEAD_PROVIDER: "MODAL_ADD_LEAD_PROVIDER",
    MODAL_UPDATE_LEAD_PROVIDER: "MODAL_UPATE_LEAD_PROVIDER",
    MODAL_ADD_PARTNER: "MODAL_ADD_PARTNER",
    MODAL_UPDATE_PARTNER: "MODAL_UPDATE_PARTNER",
    MODAL_ADD_CUSTOMER_FILE: "MODAL_ADD_CUSTOMER_FILE",
    MODAL_ADD_PARTNER_FILE: "MODAL_ADD_PARTNER_FILE",
    MODAL_ADD_LEAD_PROVIDER_FILE: "MODAL_ADD_LEAD_PROVIDER_FILE",
};