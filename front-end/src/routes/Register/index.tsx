import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, message } from "antd";
import { UserAddOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import actionCreators from "@/store/actionCreators/profile";
import { CombinedState } from "@/store/reducers";
import { ProfileState } from "@/store/reducers/profile";
import { RegisterPayload } from "@/typings/user";
import NavHeader from "@/components/NavHeader";

import "./index.less";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;
type Props = StateProps & DispatchProps;

function Register(props: Props) {
  const onFinish = (values: RegisterPayload) => {
    props.register(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error("校验失败" + errorInfo);
  };
  return (
    <>
      <NavHeader title="注册" />
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="user-form"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input prefix={<UserAddOutlined />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmPassword"
          rules={[{ required: true, message: "请输入确认密码" }]}
        >
          <Input prefix={<LockOutlined />} placeholder="确认密码" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: "请输入邮箱" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          或者
          <Link to="/login">立刻登录!</Link>
        </Form.Item>
      </Form>
    </>
  );
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actionCreators)(Register);
