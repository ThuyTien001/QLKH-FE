import { useModal } from "@/hooks";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import styled from "styled-components";

interface HeaderAddProfileStyleProps{
    openAddProfileModal: () => void;
}
type HeaderStyleProductProps = {
    data: Array<{ [key: string]: any }>;
    onFilter: (filteredData: any[]) => void;
} & HeaderAddProfileStyleProps
export const HeaderStyleProducts = ({
    data,
    onFilter,
    openAddProfileModal
}: HeaderStyleProductProps
// {
//     data: Array<{ [key: string]: any }>;
//     onFilter: (filteredData: any[]) => void;
// }
) => {
        const {ModalTypeEnum, toggleModal} = useModal()
        const [searchQuery, setSearchQuery] = useState("");
        // const [filteredData, setFilteredData] = useState(data);
        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.toLowerCase();
            setSearchQuery(value);
    
            if (data && data.length > 0) {
                const filtered = data.filter((item) =>
                    Object.values(item).some((field) =>
                        field?.toString().toLowerCase().includes(value)
                    )
                );
                onFilter(filtered); // Gửi dữ liệu đã lọc lên component cha
            } else {
                console.warn("Data is empty or undefined.");
                onFilter([]); // Gửi một mảng rỗng nếu không tìm thấy kết quả
            }
        };
        
    return (
        <div className="flex items-center justify-between w-full gap-5 mb-5">
            <div>
                <div className="items-center ml-12 flex">
                    <CsInput
                        size="large"
                        className="rounded-3xl w-96 px-3"
                        placeholder="Nhập nội dung tìm kiếm"
                        suffix={<BiSearch />}
                        value={searchQuery}
                        onChange={handleSearchChange} // Gắn sự kiện onChange
                    />
                </div>
            </div>
            <div className="flex m-6">
                <div className=" flex gap-5 mr-3">
                    <Button type="primary">
                        <div
                            className="flex items-center gap-2"
                            onClick={() => {
                                // openAddProfileModal
                                toggleModal({
                                    title: "Thêm thông tin khách hàng",
                                    type: ModalTypeEnum.MODAL_ADD_CUSTOMER_FILE
                                });
                            }}
                        >
                            <p className="text-white">Tải tệp</p>
                            <UploadOutlined  className="text-sm text-white" />
                        </div>
                    </Button>
                </div>
                <div className=" flex gap-5">
                    <Button type="primary">
                        <div
                            className="flex items-center gap-2"
                            onClick={() => {
                                openAddProfileModal()
                                // toggleModal({
                                //     title: "Thêm thông tin khách hàng",
                                //     type: ModalTypeEnum.MODAL_ADD_PROFILE_STYLE
                                // });
                            }}
                        >
                            <p className="text-white">Thêm mới</p>
                            <IoIosAdd className="text-sm text-white" />
                        </div>
                    </Button>
                </div>
            </div>
            

        </div>
    )
}
const CsInput = styled(Input)`
    input::placeholder{
        color: #171725;
        font-size: 14px;
    }
`