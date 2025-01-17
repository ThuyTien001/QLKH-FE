import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "@/type/modal-type";

const initialStateModal: ModalType = {
    title: "",
    data: {},
    modal: {},
    type: "",
    isPauseClose: false,
};
export const modalSlice = createSlice({
    name: "modal",
    initialState: initialStateModal,
    reducers: {
        openModal: (state: ModalType, action: PayloadAction<ModalType>) => {
            const { title, data, modal, type } = action.payload;
            state.title = title;
            state.data = data;
            state.modal = modal;
            state.type = type;
        },
    },
});
const { actions, reducer } = modalSlice;
export const { openModal } = actions;
export default reducer;
