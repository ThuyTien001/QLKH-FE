import { apiProvinces, apiStyleProduct } from "@/api";
import { Button, Form, Input, message, Select } from "antd"
import { useEffect, useState } from "react";

export const ModalAddProfileStyle = () => {
    const [form] = Form.useForm();
    const [cities, setCities] = useState<any[]>([]);
    const [ districts, setDistricts] = useState<any[]>([]);
    const [wards, setWards] = useState<any[]>([]);
    // const [commission, setCommission] = useState<any[]>([]);
    const [leadProvider, setLeadProvider] = useState<any[]>([]);
    const [partner, setPartner] = useState<any[]>([]);

    useEffect(() => {
        // const now = new Date();
        // const month = String(now.getMonth()+1).padStart(2, "0");
        // const year = String(now.getFullYear()).slice(-2);
        // form.setFieldsValue({customer_code: `KH`});

        //get cities

        const fetchCities = async() => {
            try{
                const response = await apiProvinces.getCity();
                if(response){
                    setCities(response);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetch city", error);
            }
        };
        fetchCities();

        // const fetchCommission =async () => {
        //     try{
        //         const response = await apiStyleProduct.getCommission();
        //         if(response && response.data){
        //             setCommission(response.data);
        //         }else{
        //             console.error("No data found in response");
        //         }
        //     }catch(error){
        //         console.error("Error fetching Commission: ", error);
        //     }
        // }
        // fetchCommission();
        const fetchLeadProvider = async () => {
            try{
                const response = await apiStyleProduct.getLeadProvider();
                if(response && response.data){
                    setLeadProvider(response.data);
                }else{
                    console.error("No data found in response");
                }
            }catch(error){
                console.error("Error fetching Lead Provider", error);
            }
        }
        fetchLeadProvider();
        const fetchPartner = async () => {
            try{
                const response = await apiStyleProduct.getPartner();
                if(response && response.data){
                    setPartner(response.data);
                }else{
                    console.error('No data found in response');
                }
            }catch(error){
                console.error("Error fetching Partner: ", error);
            }
        }
        fetchPartner();
    }, [form]);
    const handleCityChange = async (cityCode: number) => {
        try{
            const response = await apiProvinces.getDistricts(cityCode);
            if(response && response.districts){
                setDistricts(response.districts);
                setWards([]);
                form.setFieldsValue({districts: undefined, wards:undefined});
            }else{
                console.error("No data found in response");
            }
        }catch(error){
            console.error("Error fetching district", error);
        }
    }
    const handleDistrictChange = async (districtCode : number) =>{
        try{
            const response = await apiProvinces.getWards(districtCode);
            if(response && response.wards){
                setWards(response.wards);
                form.setFieldsValue({wards: null});
            }else{
                console.error("No data found inresponse");
                setWards([]);
            }
        }catch(error){
            console.error("Error fetching Wards: ", error);
        }
    }

    const onFinish = async (value: any) => {
        // console.log('values: ', value);
        const {city, district, wards: selectedWardCode, address, ...rest} =value;
        const cityName = cities.find((item: {code: number, name: string}) => item.code === city) ?.name || " ";
        const districtName = districts.find((item: {code: number, name: string}) => item.code === district)?.name || " ";
        const wardName = wards.find((item: {code: number, name: string}) => item.code === selectedWardCode)?.name || " ";
        const fullAddress = `${address}, ${wardName}, ${districtName}, ${cityName}`.trim();
        const dataSubmit = {
            ...rest,
            fullAddress,
        }
        console.log("Data Submit", dataSubmit);
        console.log("Full Address", dataSubmit.fullAddress);
        try{
            const response = await apiStyleProduct.addCustomer({
                customer_code: dataSubmit.customer_code,
                customer_name: dataSubmit.customer_name,
                business_name: dataSubmit.business_name,
                object_name: dataSubmit.object_name,
                phone: dataSubmit.phone,
                email: dataSubmit.email,
                address: dataSubmit.fullAddress,
                // fullAddress: dataSubmit.fullAddress,
                lp_id: dataSubmit.lp_id,
                partner_id: dataSubmit.partner_id,
                position: dataSubmit.position
            })
            console.log("Response: ", response);
            if(response && response.success){
                message.success('Thêm khách hàng thành công');
                form.resetFields();
                window.location.reload();
            }else{
                message.error(response.data.message || "Thêm khách hàng thất bại");

            }
        }catch(error){
            if(error){
                console.error("Lỗi khi thêm khách hàng");
                message.error("Thêm khách hàng không thành công");
            }else{
                console.error("Lỗi không xác định khi thêm khách hàng");
            }
        }
    }
    return(
        <Form 
            form={form}
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item 
                label="Mã khách hàng"
                name="customer_code"
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Tên người liên hệ"
                name="customer_name"
                // rules={[{required: true, message: "Vui lòng nhập tên người liên hệ"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Tên đơn vị"
                name="business_name"
                // rules={[{required: true, message: "Vui lòng nhập tên đơn vị"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Chức vụ"
                name="position"
                // rules={[{required: true, message: "Vui lòng nhập tên đơn vị"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Kiểu dáng"
                name="object_name"
                // rules={[{required: true, message: "Vui lòng nhập kiểu dáng"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Số điện thoại"
                name="phone"
                // rules={[{
                //     required: true, message: "Vui lòng nhập số điện thoại"},
                //     { pattern: /^[0-9]{10}$/, message: "Số điện thoại phải là 10 chữ số" },
                // ]}
                
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Email"
                name="email"
                // rules={[{required: true, message: "Vui lòng nhập địa chỉ email"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                label="Địa chỉ"
                name="address"
                // rules={[{required: true, message: "Vui lòng nhập địa chỉ"}]}
            >
                <Input/>
            </Form.Item>
            <Form.Item name="city" label="Tỉnh/Thành Phố">
                <Select
                onChange={handleCityChange}
                    placeholder="Chọn Tỉnh/Thành phố"
                >
                    {cities?.map((cityItem) => (
                        <Select.Option key={cityItem.code} value={cityItem.code}>
                            {cityItem.name}
                        </Select.Option>
                    ))}
                    
                </Select>
            </Form.Item>
            <Form.Item name="district" label="Quận/Huyện">
                <Select
                onChange={handleDistrictChange}
                    placeholder="Chọn Quận/Huyện"
                >
                    {districts.map((districtItem)=> (
                    <Select.Option key={districtItem.code} value={districtItem.code} >
                        {districtItem.name}
                    </Select.Option>

                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="wards" label="Phường/Xã, Thị trấn">
                <Select
                    placeholder="Chọn Phường/Xã"
                >
                    {wards.map((wardItem) => (
                    <Select.Option key={wardItem.code} value={wardItem.code}>
                        {wardItem.name}
                    </Select.Option>

                    ))}
                </Select>
            </Form.Item>
            <Form.Item 
                label="Tên đối tác"
                name="partner_id"
                rules={[{required: true, message: "Vui lòng nhập tên đối tác"}]}
            >
                <Select 
                    placeholder="Chọn đối tác"
                >
                    {partner.map((partnerItem) => (
                        <Select.Option key={partnerItem.partner_id} value={partnerItem.partner_id}>
                            {partnerItem.partner_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Tên đầu mối"
                name="lp_id"
            >
                <Select
                    placeholder="Chọn đầu mối"
                >
                    {leadProvider.map((lpItem) => (
                        <Select.Option key={lpItem.lp_id} value={lpItem.lp_id}>
                            {lpItem.lp_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            {/* <Form.Item 
                label="Trạng thái hoa hồng"
                name="commission_id"
                // rules={[{required: true, message: "Vui lòng chọn trạng thái hoa hồng"}]}
            >
                <Select
                placeholder="Tình trạng hoa hồng">
                    {commission.map((commissionItem) => (
                        <Select.Option key={commissionItem.commission_id} value={commissionItem.commission_id} >
                            {commissionItem.commission_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item> */}
            <Form.Item >
                <Button type="primary" htmlType="submit" className="w-full" style={{ color: "white" }}>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    )
}