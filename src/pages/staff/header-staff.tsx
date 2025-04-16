import { Button } from "antd";
import { IoIosAdd } from "react-icons/io";
import { useModal } from "@/hooks";

export const HeaderStaff = () =>{
    const {ModalTypeEnum, toggleModal} = useModal()
    return(
        <div className="flex items-center justify-between w-full gap-5 mb-5">
            <div>
                <div className="items-center ml-12 flex">
                    {/* <CsInput
                        size="large"
                        className="rounded-3xl w-96 px-3"
                        placeholder="Nhập nội dung tìm kiếm"
                        suffix={<BiSearch />}
                        value={searchQuery}
                        onChange={handleSearchChange} // Gắn sự kiện onChange
                    /> */}
                </div>
            </div>
            <div className=" flex gap-5">
                <Button type="primary">
                    <div
                        className="flex items-center gap-2"
                        onClick={() => {
                            toggleModal({
                                title: "Thêm thông tin nhân viên",
                                type: ModalTypeEnum.MODAL_ADD_STAFF
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