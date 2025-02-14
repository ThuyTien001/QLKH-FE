import { useModal } from "@/hooks";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import styled from "styled-components";

export const HeaderBrand = ({
    data,
    onFilter,
}: {
    data: Array<{[key: string]: any}>;
    onFilter: (filteredData: any[]) => void
}) =>{
    const {ModalTypeEnum, toggleModal} = useModal()
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value.toLocaleLowerCase();
        setSearchQuery(value);
        if(data && data.length > 0){
            const filtered = data.filter((item) => 
                Object.values(item).some((field) =>
                    field?.toString().toLowerCase().includes(value)
                )
            );
            onFilter(filtered);
        }else{
            console.warn("Data is empty or undefined.")
            onFilter([]);
        }
    }
    return(
        <div className="flex items-center justify-between w-full gap-5 mb-5">
            <div>
                <div className="items-center ml-12 flex">
                    <CsInput
                        size="large"
                        className="rounded-3xl w-96 px-3"
                        placeholder="Nhập nội dung tìm kiếm"
                        suffix={<BiSearch />}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
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