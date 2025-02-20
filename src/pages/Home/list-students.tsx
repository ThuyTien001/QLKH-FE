import { useModal } from "@/hooks";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { BiEditAlt } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";

export const ListStudents = ({
    data,
    onAddStudent,
    onUploadFile,
  }: {
    data: any[];
    onAddStudent: (newStudent: any) => void;
    onUploadFile: () => void // Callback được truyền từ Home
  })  => {
    // console.log("student", data);
    const {toggleModal, ModalTypeEnum} = useModal();
    return(
        <div>
            <div className="flex items-center justify-between w-full gap-5 mb-5">
                <div>
                    
                </div>
                <div className=" flex gap-5">
                <Button type="primary">
                        <div
                            className="flex items-center gap-2"
                            // onClick={() => {
                                
                            //     onUploadFile();
                            // }}
                            onClick={onUploadFile}
                            
                        >
                            <p className="text-white">Tải tệp</p>
                            <UploadOutlined  className="text-sm text-white" />
                        </div>
                    </Button>
                    <Button type="primary">
                        <div
                            className="flex items-center gap-2"
                            onClick={() => {
                                
                                onAddStudent(data);
                            }}
                        >
                            <p className="text-white">Thêm mới</p>
                            <IoIosAdd className="text-sm text-white" />
                        </div>
                    </Button>
                </div>
            </div>
            <Table 
            dataSource={data.map((student, index) => ({
                ...student,
                key: index,
            }))}
            columns={[
                {
                    title: "Mã học viên",
                    dataIndex: "student_code",
                    key: "student_code",
                },
                {
                    title: "Họ tên học viên",
                    dataIndex: "student_name",
                    key: "student_name",
                },
                {
                    title: "Ngày sinh",
                    dataIndex: "birthday",
                    key: "birthday"
                },
                {
                    title: "Đơn vị công tác",
                    dataIndex: "department",
                    key: "department",
                },
                {
                    title:"SĐT",
                    dataIndex: "phone",
                    key: "phone"
                },
                {
                    title:"Email",
                    dataIndex:"email",
                    key: "email"
                },
                {
                    title: "Địa chỉ",
                    dataIndex: "address", 
                    key: "address",
                },
                {
                    title: "Đối tượng",
                    dataIndex: "participant_name",
                },
                {
                    title: "Hành động",
                    dataIndex: "action",
                    key: "action",
                    render: (_, record) => (
                        <div className= "flex justify-between items-center">
                            <BiEditAlt
                                // className=" cursor-pointer"
                                onClick={() => {
                                    console.log("Edit clicked for record: ", record);
                                    toggleModal({
                                        title: "Chỉnh sửa thông tin học viên",
                                        type: ModalTypeEnum.MODAL_UPDATE_STUDENT,
                                        data: record,
                                    });
                                }}
                            />
                        </div>
                    ),
                },
            ]}
            // pagination={false}
            />
        </div>
    );
}