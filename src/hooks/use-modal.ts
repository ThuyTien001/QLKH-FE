import React from "react";
import { openModal, storeModal } from "@/features";
import { useAppDispatch, useAppSelector } from "@/store";
import { ModalType } from "@/type/modal-type";
import { ModalTypeEnum } from "@/constant";

export const useModal = () => {
    const resultModal = useAppSelector(storeModal);
    const dispatch = useAppDispatch();
    const toggleModal = React.useCallback((data: ModalType) => dispatch(openModal(data)), [dispatch]);

    const handleCloseModal = () => {
        toggleModal({
            title: "",
            type: ModalTypeEnum.NULL,
        });
    };

    return {
        resultModal,
        ModalTypeEnum,
        handleCloseModal,
        toggleModal,
    };
};
