import { Dropdown, } from 'antd';
import { AiOutlineUser } from "react-icons/ai";
import { LuLogOut } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useModal } from '@/hooks';
import { imgLogo } from '@/assets';
// import { logocasti } from '@/assets';
// import styled from 'styled-components';


const defaultClassName = "text-sm cursor-pointer uppercase font-medium";
const paramClass = ["/style-products", "/brand"];
export const Header = () => {
    // const [activeMenu, setActiveMenu] = React.useState<number>(0)
    const location = useLocation();
    const {ModalTypeEnum, toggleModal} = useModal()
    return (
        <div className="px-5 py-6 border-b border-[#F3F3F3]">
            <div className="flex flex-row items-center">
                <div className="basis-2/5 flex items-center">
                    <a href="#" className="text-[#171725] font-extrabold text-2xl">
                        <img className="w-20" src={imgLogo} alt={imgLogo} />
                    </a>
                    {/* <div className="items-center ml-12 flex">
                        <CsInput
                            size="large"
                            className="rounded-3xl w-96 px-3"
                            placeholder="Nhập nội dung tìm kiếm"
                            suffix={<BiSearch />}
                        />
                    </div> */}
                </div>
                <div className="basis-3/5 flex justify-between items-center">
                    <div className='flex gap-7'>
                        <Link
                            to="/trainning"
                            className={clsx(
                                defaultClassName,
                                "/trainning" === location.pathname ? "text-[#A1D40A]" : "text-[#171725]"
                            )}
                        >
                            Lớp Tập Huấn
                            
                            
                        </Link>
                        <Dropdown 
                            placement='bottom'
                            menu={{
                                items: [
                                    {
                                        key: 1,
                                        label: (
                                            <Link 
                                                to="/style-products"
                                                style={{
                                                    color: 
                                                        "/style-products" === location.pathname ? "#A1D40A" : "#171725",
                                                }}
                                            >
                                                Kiểu dáng
                                            </Link>
                                        ),
                                    },
                                    {
                                        key: 2,
                                        label: (
                                            <Link 
                                                to="/brand"
                                                style={{
                                                    color: 
                                                        "/brand" === location.pathname ? "#A1D40A" : "#171725",
                                                }}
                                            >
                                            Nhãn hiệu
                                            </Link>
                                        )
                                    },
                                    {
                                        key: 3,
                                        label: (
                                            <Link 
                                                to="/patent"
                                                style={{
                                                    color: 
                                                        "/patent" === location.pathname ? "#A1D40A" : "#171725",
                                                }}
                                            >
                                            SC/GPHI
                                            </Link>
                                        )
                                    },
                                    {
                                        key: 4,
                                        label: (
                                            <Link 
                                                to="/barcode"
                                                style={{
                                                    color: 
                                                        "/barcode" === location.pathname ? "#A1D40A" : "#171725",
                                                }}
                                            >
                                            MSMV
                                            </Link>
                                        )
                                    },
                                    {
                                        key: 5,
                                        label: (
                                            <Link 
                                                to="/copyright"
                                                style={{
                                                    color: 
                                                        "/copyright" === location.pathname ? "#A1D40A" : "#171725",
                                                }}
                                            >
                                            Quyền Tác Giả
                                            </Link>
                                        )
                                    },
                                ]
                            }}
                        >
                            <p className={clsx(
                                defaultClassName,
                                paramClass.includes(location.pathname) ? "text-[#A1D40A]" : "text-[#171725]"
                            )}
                            
                            >
                                Sở Hữu Trí Tuệ
                            </p>
                            
                        </Dropdown>
                        <Link
                            to="/staff"
                            className={clsx(
                                defaultClassName,
                                "/staff" === location.pathname ? "text-[#A1D40A]" : "text-[#171725]"
                            )}
                        >
                            Nhân viên
                            
                            
                        </Link>
                        <Link
                            to="/partner"
                            className={clsx(
                                defaultClassName,
                                "/partner" === location.pathname ? "text-[#A1D40A]" : "text-[#171725]"
                            )}
                        >
                            Đối tác
                        </Link>
                        <Link
                            to="/lead-provider"
                            className={clsx(
                                defaultClassName,
                                "/lead-provider" === location.pathname ? "text-[#A1D40A]" : "text-[#171725]"
                            )}
                        >
                            Đầu mối
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <Dropdown
                            placement="bottomRight"
                            dropdownRender={() => {
                                return (
                                    <div className="bg-white mt-2 rounded-lg shadow-xl border border-slate-100 py-2">
                                        <div className="flex items-center px-3 py-2 gap-2 hover:bg-slate-100 cursor-pointer">
                                            <AiOutlineUser className="text-black" />
                                            <p className="text-sm"
                                                onClick={() => {
                                                    toggleModal({
                                                        type: ModalTypeEnum.MODAL_ACCOUNT,
                                                        title: "Thông tin tài khoản"
                                                    })
                                                }}
                                            >Thông tin cá nhân</p>
                                        </div>
                                        <div
                                            className="flex items-center px-3 py-2 gap-2 hover:bg-slate-100 cursor-pointer"
                                            onClick={() => {
                                                localStorage.removeItem("token");
                                                window.location.reload();
                                            }}
                                        >
                                            <LuLogOut className="text-red-600 font-semibold" />
                                            <p className="text-sm text-red-600 font-semibold">Đăng xuất</p>
                                        </div>
                                    </div>
                                )
                            }}
                        >
                            <div className="bg-[#171725] cursor-pointer w-10 h-10 rounded-full flex items-center justify-center">
                                <AiOutlineUser className="text-white" />
                            </div>
                        </Dropdown>.
                    </div>
                </div>
            </div>
        </div>
    )
};


// const CsInput = styled(Input)`
//     input::placeholder{
//         color: #171725;
//         font-size: 14px;
//     }
// `
