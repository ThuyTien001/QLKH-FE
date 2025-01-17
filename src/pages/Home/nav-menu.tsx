import { IconTypeProduction, } from "@/assets";
import { Menu } from "antd";
import { IoIosAdd } from "react-icons/io";
import styled from "styled-components";
import { useModal } from "@/hooks";
import { useEffect, useState } from "react";
import { apiClass } from "@/api";

export const NavMenu = () => {
    const{toggleModal, ModalTypeEnum} = useModal();
    const [classes, setClasses] = useState<any[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await apiClass.getAllClass();
            if (response && response.data) {
                setClasses(response.data); // Lưu dữ liệu vào state
            } else {
              console.error("No data found in response.");
            }
          } catch (error) {
            console.error("Error fetching students:", error);
          }
        };
      
        fetchData();
      }, []);
    return (
        <div>
            <div className="flex justify-center p-5 border-b">
                <a href="#" className="flex items-center gap-2 text-[#171725] font-bold text-base">
                    {/* <img className="w-8 h-8" src={imgLogo} alt={imgLogo} /> */}
                    Lớp Tập Huấn
                </a>
            </div>
            <nav className="pt-5">
                <CsMenu
                    mode="inline"
                >
                    <Menu.SubMenu
                        key="sub1"
                        title={
                            <div className="flex items-center gap-2 group-menu-sub">
                                <IconTypeProduction />
                                <p className="text-[#757B8C] text-base font-semibold">Lớp tập huấn</p>
                                <IoIosAdd className=" text-xl" 
                                    onClick={() => {
                                        toggleModal({
                                            title: "Thêm lớp học mới",
                                            type: ModalTypeEnum.MODAL_ADD_CLASS
                                        })
                                    }}
                                />
                            </div>
                        }
                    >
                        {classes.length > 0 ? (
                            classes.map((classItem: any) => (
                                <Menu.Item key={classItem.id_class}>{classItem.class_name}</Menu.Item> // Dùng id và name của lớp
                            ))
                            ) : (
                            <Menu.Item key="loading">Đang tải dữ liệu...</Menu.Item> // Hiển thị khi đang tải dữ liệu
                        )}
                    </Menu.SubMenu>
                </CsMenu>
            </nav>
        </div>
    )
};

const CsMenu = styled(Menu)`
    .ant-menu-submenu,.ant-menu-root{
        background: #F9F9F9 !important;
        border: none !important;
        border-radius: 0 !important;
    }
    .ant-menu-submenu-title{
        margin: 0 !important;
        width: 100% !important;
        border-radius: 0 !important;
    }
    .ant-menu-item{
        margin: 0 !important;
        width: 100% !important;
        border-radius: 0 !important;
        color: #757B8C;
        font-weight: 600;
    }
    .ant-menu-item-selected{
        background-color: #e6e6e6 !important;
        color: #171725;
    }
    .ant-menu-submenu-open{
        .group-menu-sub{
            p{
                color:#171725;
            }
            path{
                fill: #A1D40A !important;
            }
        }
    }
`