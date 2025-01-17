import { Header } from "@/components";
import { NavMenu } from "./nav-menu";
import { HeaderHome } from './header-home';
import { useEffect, useState } from "react";
import { apiCourse } from "@/api/api-course";
import { ListStudents } from "./list-students";
import { Modal, Table } from "antd";
import { ModalAddStudent } from "@/modal/components";
import { BiEditAlt } from "react-icons/bi";
import { useModal } from "@/hooks";
export const Home = () => {
  const {ModalTypeEnum, toggleModal} = useModal()
    const [course, setCourse]= useState<any[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await apiCourse.getAllCourse();
            if (response && response.data) {
              setCourse(response.data);
            } else {
              console.error("No data found in response.");
            }
          } catch (error) {
            console.error("Error fetching students:", error);
          }
        };
      
        fetchData();
      }, []);
      const handleOpenModal = (courseId: number) => {
        console.log("Opening Modal with Course ID:", courseId);
        setSelectedCourseId(courseId); // Lưu Course ID được chọn
        setIsModalVisible(true); // Hiển thị Modal
      };
    
      const handleCloseModal = () => {
        setIsModalVisible(false); // Đóng Modal
        setSelectedCourseId(null); // Reset Course ID
      };
      return(
        <div>
            <Header />
            <div className="p-5 flex min-h-screen">
                <div className="basis-1/5 bg-[#F9F9F9] rounded-xl">
                    <NavMenu />
                </div>
                <div className="basis-4/5 ml-3">
                    <div>
                        <HeaderHome/>
                    </div>
                    <div>
                        <Table
                            dataSource={course}
                            rowKey="course_id" 
                            columns={[
                              {
                                title: "ID",
                                dataIndex: "course_id",
                                key: "course_id",
                                sorter: (a: any, b: any) => a.course_id - b.course_id,
                              },
                                {
                                    title: "Mã khóa học",
                                    dataIndex: "course_code",
                                    key: "course_code",
                                    
                                },
                                {
                                    title: "Tên lớp học",
                                    dataIndex: "class_name",
                                    key: "class_name",
                                },
                                {
                                    title: "Thời hạn (năm)",
                                    dataIndex:"timelimit",
                                    key: "timelimit",
                                },
                                {
                                    title: "Ngày bắt đầu",
                                    dataIndex: "start_time",
                                    key: "start_time",
                                },
                                {
                                    title: "Ngày kết thúc",
                                    dataIndex: "end_time",
                                    key: "end_time",
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
                                                      title: "Chỉnh sửa khóa học",
                                                      type: ModalTypeEnum.MODAL_UPDATE_COURSE,
                                                      data: record,
                                                  });
                                              }}
                                          />
                                      </div>
                                  ),
                              },
                            ]}
                            // pagination={false}
                            // expandable={{
                            //     expandedRowRender: (record) => (
                            //       <ListStudents data={record.students} />
                            //     ),
                            //   }}
                            expandable={{
                              expandedRowRender: (record) => (
                                <ListStudents data={record.students} onAddStudent={() => handleOpenModal(record.course_id)} />
                              ),
                              onExpand: (expanded, record) => {
                                if (expanded) {
                                  console.log("Selected Course ID:", record.course_id);
                                  setSelectedCourseId(record.course_id);
                                }
                              },
                            }}
                        />
                        {/* Modal hiển thị thêm học viên */}
                        <Modal
                          visible={isModalVisible}
                          onCancel={handleCloseModal}
                          footer={null} // Tùy chọn: Không có nút mặc định trong footer
                        >
                          <ModalAddStudent courseId={selectedCourseId} />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};
