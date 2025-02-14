import { useModal } from "@/hooks"
import { Button } from "antd";
import { IoIosAdd } from "react-icons/io";

export const HeaderLeadProvider = () => {
    const {ModalTypeEnum, toggleModal} = useModal();
    return(
        <div className="flex items-center justify-between w-full gap-5 mb-5">
            <div>

            </div>
            <div className="flex gap-5">
                <Button type="primary">
                    <div 
                        className="flex items-center gap-2"
                        onClick={() => {
                            toggleModal({
                                title: "Thêm đầu mối",
                                type: ModalTypeEnum.MODAL_ADD_LEAD_PROVIDER
                            })
                        }}
                    >
                        <p className="text-white">Thêm mới</p>
                        <IoIosAdd className="text-sm text-white"/>
                    </div>
                </Button>

            </div>
        </div>
    )
}