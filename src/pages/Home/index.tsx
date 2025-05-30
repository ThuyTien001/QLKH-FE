import { Header } from "@/components";
import { NavMenu } from "./nav-menu";
import { HeaderHome } from './header-home';
import { useEffect, useState } from "react";
import { apiCourse } from "@/api/api-course";
import { ListStudents } from "./list-students";
import { Modal, Table } from "antd";
import { ModalAddCourse, ModalAddStudent } from "@/modal/components";
import { BiEditAlt } from "react-icons/bi";
import { useModal } from "@/hooks";
import dayjs from "dayjs";
import { ModalAddStudentFile } from "@/modal/components/modal-add-student-file";
export const Home = () => {
  const {ModalTypeEnum, toggleModal} = useModal()
    const [course, setCourse]= useState<any[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedCourseIdFile, setSelectedCourseIdFile] = useState<number | null>(null);
    const [isStudentModalVisible, setIsStudentModalVisible] = useState(false);
    const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
    const [isStudentFileModalVisible, setIsStudentFileModalVisible] = useState(false);
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
        setIsStudentModalVisible(true); // Hiển thị Modal
      };
      const handleOpenModalFile = (courseId: number) => {
        setSelectedCourseIdFile(courseId);
        setIsStudentFileModalVisible(true);
      }
      const handleCloseStudentModal = () => {
        setIsStudentModalVisible(false);
        setSelectedCourseId(null);
    };
    
    const handleCloseStudentFileModal = () => {
        setIsStudentFileModalVisible(false);
        setSelectedCourseIdFile(null);
    };
    
    const handleCloseCourseModal = () => {
      setIsCourseModalVisible(false);
  };

      const isNearExpiration = (record: any) => {
        // console.log("record: ", record)
        // if(!record?.end_time){
        //   return false;
        // }
        // const threeMonthLater = dayjs().add(3, "months");
        // const expirationDate = dayjs(record.end_time, "DD-MM-YYYY");
        // return expirationDate.isBefore(threeMonthLater) || expirationDate.isSame(threeMonthLater);

        if (!record?.end_time || !record?.timelimit) {
          return false;
        }
      
        const endDate = dayjs(record.end_time, "DD-MM-YYYY");
        const expirationDate = endDate.add(record.timelimit, "year"); // Ngày hết hạn thực tế
        const threeMonthsBeforeExpiration = expirationDate.subtract(3, "months"); // 3 tháng trước khi hết hạn
        const currentDate = dayjs();
      
        return currentDate.isAfter(threeMonthsBeforeExpiration) && currentDate.isBefore(expirationDate);
        
      }
      // Hàm thêm lớp học mới vào danh sách
      const addCourseToList = (newCourse: any) => {
        setCourse((prevCourses) => [...prevCourses, newCourse]);
    };
    const fetchCourses = async () => {
      try {
        const response = await apiCourse.getAllCourse();
        if (response && response.data) {
          setCourse(response.data);
        } else {
          console.error("No data found in response.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
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
                        <HeaderHome openAddCourseModal={() => setIsCourseModalVisible(true)}/>
                    </div>
                    <div>
                        <Table
                            dataSource={course}
                            rowKey="course_id" 
                            columns={[
                              // {
                              //   title: "ID",
                              //   dataIndex: "course_id",
                              //   key: "course_id",
                              //   sorter: (a: any, b: any) => a.course_id - b.course_id,
                              // },
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
                                          {/* <div className="cursor-pointer">
                                            <Dropdown
                                                placement="bottomRight"
                                                menu={{
                                                    items: [
                                                        {
                                                            key: "1",
                                                            label: (
                                                                <p
                                                                onClick={() => {
                                                                  
                                                                      Modal.confirm({
                                                                          title: record.status === "Khách hàng tiềm năng"
                                                                              ? "Hủy trạng thái khách hàng tiềm năng"
                                                                              : "Đánh dấu là khách hàng tiềm năng",
                                                                          content: record.status
                                                                              ? `Bạn có chắc chắn muốn hủy trạng thái khách hàng tiềm nằn chó khách hàng có mã số ${record.student_code} này không?`
                                                                              : `Bạn có chắc chắn muốn đánh dấu khách hàng "${record.class_name}" này là khách hàng tiềm năng không?`,
                                                                          centered: true,
                                                                          onOk() {
                                                                              // handleUpdateStatusSupplier({
                                                                              //     status: !item.status,
                                                                              //     id_supplier: item._id,
                                                                              message.success("Trạng thái đã được cập nhật!")
                                                                              // });
                                                                          },
                                                                          okText: (
                                                                              <p>
                                                                                  {record.status
                                                                                      ? "Hủy trạng thái"
                                                                                      : "Xác nhận"}
                                                                              </p>
                                                                          ),
                                                                          onCancel() {},
                                                                          okButtonProps: {
                                                                              danger: !record.status,
                                                                          },
                                                                      });
                                                              }}
                                                                >Khách hàng tiềm năng</p>
                                                            ),
                                                        },
                                                    ],
                                                }}
                                            >
                                                <BiDotsVerticalRounded />
                                            </Dropdown>
                                        </div> */}
                                      </div>
                                  ),
                              },
                            ]}
                            rowClassName={(record) => (isNearExpiration(record) ? "bg-yellow-100" : "")} //Tô màu vàng
                            // pagination={false}
                            // expandable={{
                            //     expandedRowRender: (record) => (
                            //       <ListStudents data={record.students} />
                            //     ),
                            //   }}
                            expandable={{
                              expandedRowRender: (record) => (
                                <ListStudents data={record.students} onAddStudent={() => handleOpenModal(record.course_id)} onUploadFile = {() => handleOpenModalFile(record.course_id)} />
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
                        {/* <Modal
                          visible={isModalVisible}
                          onCancel={handleCloseModal}
                          footer={null} // Tùy chọn: Không có nút mặc định trong footer
                        >
                              {selectedCourseId && (
                                  <ModalAddStudent courseId={selectedCourseId} />
                              )}
                              {selectedCourseIdFile && (
                                  <ModalAddStudentFile courseId={selectedCourseIdFile} />
                              )}
                        </Modal>
                        <Modal title="Thêm Khóa học" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                          <ModalAddCourse fetchCourses={fetchCourses} addCourseToList={addCourseToList} onClose={() => setIsModalVisible(false)}/>
                      </Modal> */}
                      <Modal
                        visible={isStudentModalVisible}
                        onCancel={handleCloseStudentModal}
                        footer={null}
                      >
                        {selectedCourseId && <ModalAddStudent fetchStudent={fetchCourses} courseId={selectedCourseId} onAddStudent={handleOpenModal} onClose={handleCloseStudentModal}/>}
                      </Modal>

                      {/* Modal Thêm File Học Viên */}
                      <Modal
                        visible={isStudentFileModalVisible}
                        onCancel={handleCloseStudentFileModal}
                        footer={null}
                      >
                        {selectedCourseIdFile && <ModalAddStudentFile courseId={selectedCourseIdFile} />}
                      </Modal>

                      {/* Modal Thêm Khóa Học */}
                      <Modal 
                        title="Thêm Khóa học" 
                        open={isCourseModalVisible} 
                        onCancel={handleCloseCourseModal} 
                        footer={null}
                      >
                        <ModalAddCourse fetchCourses={fetchCourses} addCourseToList={addCourseToList} onClose={handleCloseCourseModal}/>
                      </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};
