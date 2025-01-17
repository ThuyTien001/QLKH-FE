import { useModal } from "@/hooks";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import styled from "styled-components";

export const HeaderStyleProducts = ({ data }: { data: Array<{ customer_name: string }> }) => {
        const {ModalTypeEnum, toggleModal} = useModal()
        const [searchQuery, setSearchQuery] = useState("");
        const [filteredData, setFilteredData] = useState(data);
 // Cập nhật filteredData khi data thay đổi
        useEffect(() => {
            console.log("data search", data);
            setFilteredData(data);
        }, [data]);

        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setSearchQuery(value);

            // Lọc danh sách dựa trên nội dung tìm kiếm
            const filtered = data.filter((item) =>
                item.customer_name?.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredData(filtered);
        };
    return (
        <div className="flex items-center justify-between w-full gap-5 mb-5">
            <div>
                {/* <div className="items-center ml-12 flex">
                    <CsInput
                        size="large"
                        className="rounded-3xl w-96 px-3"
                        placeholder="Nhập nội dung tìm kiếm"
                        suffix={<BiSearch />}
                        value={searchQuery}
                        onChange={handleSearchChange} // Gắn sự kiện onChange
                    />
                </div> */}
            </div>
            <div className=" flex gap-5">
                <Button type="primary">
                    <div
                        className="flex items-center gap-2"
                        onClick={() => {
                            toggleModal({
                                title: "Thêm thông tin khách hàng",
                                type: ModalTypeEnum.MODAL_ADD_PROFILE_STYLE
                            });
                        }}
                    >
                        <p className="text-white">Thêm mới</p>
                        <IoIosAdd className="text-sm text-white" />
                    </div>
                </Button>
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