import { Button, Input } from "antd"
import { IoIosAdd } from "react-icons/io"
import styled from "styled-components"
interface HeaderHomeProps {
    openAddCourseModal: () => void;
}

export const HeaderHome = ({ openAddCourseModal }: HeaderHomeProps) => {
    // const {ModalTypeEnum, toggleModal} = useModal()
    return (
        <div className="flex items-center justify-between w-full gap-5 mb-5">
            <div>
                {/* <div className="items-center ml-12 flex">
                    <CsInput
                        size="large"
                        className="rounded-3xl w-96 px-3"
                        placeholder="Nhập nội dung tìm kiếm"
                        suffix={<BiSearch />}
                    />
                </div> */}
            </div>
            <div className=" flex gap-5">
                <Button type="primary">
                    <div
                        className="flex items-center gap-2"
                        onClick={
                            openAddCourseModal
                            // toggleModal({
                            //     title: "Thêm khóa học",
                            //     type: ModalTypeEnum.MODAL_ADD_COURSE
                            // });
                        }
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