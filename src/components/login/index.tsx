import { apiStaff } from "@/api/api-staff";
import { LoginData } from "@/type";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); 

    const onFinish = async (values: LoginData) => {
        try{
            // console.log("Dữ liệu gửi lên: ", {
            //     staff_username: values.staff_username,
            //     staff_password: values.staff_password,
            // });
            const response = await apiStaff.login({
                staff_username: values.staff_username,
                staff_password: values.staff_password
            });
            if(response && response.staff){
                localStorage.setItem("token", response.token);
                message.success("Đăng nhập thành công");
                navigate("/");
            }
        } catch(error){
            console.error("Lỗi khi đăng nhập: ", error);
            alert("Sai tên đăng nhâậpc hoặc mật khẩu, vui lòng đăng nhập lại")
            message.error("Sai tên đăng nhập hoặc mật khẩu, vui lòng đăng nhập lại!");
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-[36rem] gap-x-4 bg-white rounded-lg p-12 flex items-center justify-center shadow-lg">
                <div className="max-w-2xl px-3 m-auto md:px-5">
                    <div className="flex flex-col md:flex-row">
                        {/* <div className="flex items-center justify-center w-full min-h-screen md:basis-2/5 basis-full"> */}
                            <div className="w-full">
                                <h3 className="text-3xl font-semibold text-center uppercase mb-14">Đăng nhập</h3>
                                <Form
                                    form={form}
                                    size="large"
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout="vertical"
                                >
                                    <Form.Item
                                        hasFeedback
                                        className="mb-8"
                                        name="staff_username"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui nhập nhập tên đăng nhập!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="py-2"
                                            prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="Tên đăng nhập"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        hasFeedback
                                        className="mb-8"
                                        name="staff_password"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Vui lòng nhập mật khẩu!",
                                            },
                                        ]}
                                    >
                                        <Input.Password
                                            className="py-2"
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="staff_password"
                                            placeholder="Mật khẩu"
                                        />
                                    </Form.Item>
                                    {/* <Form.Item>
                                        <Button type="primary" htmlType="submit" className="w-full">
                                            Đăng nhập
                                        </Button>
                                    </Form.Item> */}
                                    <Form.Item shouldUpdate>
                                        {() => (
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="w-full"
                                                disabled={
                                                    !form.isFieldsTouched(true) ||
                                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                                }
                                            >
                                                Đăng nhập
                                            </Button>
                                        )}
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        {/* <div className="hidden md:basis-3/5 basis-full md:flex"></div> */}
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
};
