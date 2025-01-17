import React from "react";
import { Modal, Tooltip } from "antd";
import { VscClose } from "react-icons/vsc";
import { ModalAddBrand, ModalAddClass, ModalAddContract, ModalAddCourse, ModalAddProfile, ModalAddProfileBrand, ModalAddProfilePatent, ModalAddProfileStyle, ModalAddRecordBarcode, ModalAddRecordCopyright, ModalAddStatusRecordBarcode, ModalAddStatusRecordStyle, ModalAddStudent, ModalCreate, ModaleUpdateProfileBrand, ModalUpdateContract, ModalUpdateCourse, ModalUpdateCustomer, ModalUpdateProfile, ModalUpdateProfilePatent, ModalUpdateRecordBarcode, ModalUpdateStatusBrand, ModalUpdateStatusProfile, ModalUpdateStudent } from "./components";
import { ModalTypeEnum } from "@/constant";
import { useModal } from "@/hooks";

const checkModal = (modalType: string) => {
    switch (modalType) {
        case ModalTypeEnum.CREATE:
            return ModalCreate;
        case ModalTypeEnum.MODAL_ADD_CLASS:
            return ModalAddClass;
        case ModalTypeEnum.MODAL_ADD_COURSE:
            return ModalAddCourse;
        case ModalTypeEnum.MODAL_ADD_PROFILE_STYLE:
            return ModalAddProfileStyle;
        case ModalTypeEnum.MODAL_ADD_PROFILE:
            return ModalAddProfile
        case ModalTypeEnum.MODAL_UPDATE_PROFILE:
            return ModalUpdateProfile;
        case ModalTypeEnum.MODAL_UPDATE_STATUS_PROFILE:
            return ModalUpdateStatusProfile;
        case ModalTypeEnum.MODAL_ADD_BRAND:
            return ModalAddBrand;
        case ModalTypeEnum.MODAL_ADD_PROFILE_BRAND:
            return ModalAddProfileBrand;
        case ModalTypeEnum.MODAL_UPDATE_PROFILE_BRAND:
            return ModaleUpdateProfileBrand;
        case ModalTypeEnum.MODAL_UPDATE_STATUS_BRAND:
            return ModalUpdateStatusBrand;
        case ModalTypeEnum.MODAL_ADD_STUDENT:
            return ModalAddStudent;
        case ModalTypeEnum.MODAL_UPDATE_COURSE:
            return ModalUpdateCourse;
        case ModalTypeEnum.MODAL_UPDATE_STUDENT:
            return ModalUpdateStudent;
        case ModalTypeEnum.MODAL_UPDATE_CUSTOMER:
            return ModalUpdateCustomer;
        case ModalTypeEnum.MODAL_ADD_STATUS_RECORD_STYLE:
            return ModalAddStatusRecordStyle;
        case ModalTypeEnum.MODAL_ADD_STATUS_RECORD_BRAND:
            return ModalAddProfileBrand;
        case ModalTypeEnum.MODAL_ADD_PROFILE_PATENT:
            return ModalAddProfilePatent;
        case ModalTypeEnum.MODAL_UPDATE_PROFILE_PATENT:
            return ModalUpdateProfilePatent;
        case ModalTypeEnum.MODAL_ADD_RECORD_BARCODE:
            return ModalAddRecordBarcode;
        case ModalTypeEnum.MODAL_UPDATE_RECORD_BARCODE:
            return ModalUpdateRecordBarcode;
        case ModalTypeEnum.MODAL_ADD_STATUS_RECORD_BARCODE:
            return ModalAddStatusRecordBarcode;
        case ModalTypeEnum.MODAL_ADD_RECORD_COPYRIGHT:
            return ModalAddRecordCopyright;
        case ModalTypeEnum.MODAL_ADD_CONTRACT:
            return ModalAddContract;
        case ModalTypeEnum.MODAL_UPDATE_CONTRACT:
            return ModalUpdateContract;
        default:
            return null;
    }
};

export const ContainerModal = () => {
    const { resultModal, handleCloseModal } = useModal();
    const { data, modal, title, type } = resultModal;

    const WrapperModal = React.useMemo(() => checkModal(type || ""), [type]);

    React.useEffect(() => {
        if (WrapperModal) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [WrapperModal]);

    if (!WrapperModal) return null;

    return (
        <Modal
            width={500}
            open
            centered
            title={
                <div className="flex items-center justify-between gap-2">
                    <h6 className="font-bold md:text-[26px] text-xl text-[#23262F]">{title}</h6>
                    <Tooltip placement="top" title="Esc đóng">
                        <div
                            aria-hidden
                            onClick={handleCloseModal}
                            className="shadow-md cursor-pointer md:w-[40px] w-[28px] md:h-[40px] h-[28px] flex items-center justify-center rounded-full"
                            style={{ border: "2px solid #E6E8EC" }}
                        >
                            <VscClose className="text-lg md:text-base" />
                        </div>
                    </Tooltip>
                </div>
            }
            onOk={handleCloseModal}
            onCancel={handleCloseModal}
            footer={null}
            closeIcon={false}
            {...modal}
        >
            <WrapperModal {...data} />
        </Modal>
    );
};
