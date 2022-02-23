import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserAddOutlined, LockOutlined } from "@ant-design/icons";

import { CombinedState } from "@/store/reducers";
import { ProfileState } from "@/store/reducers/profile";
import actionCreators from "@/store/actionCreators/profile";
import NavHeader from "@/components/NavHeader";
import { LoginPayload } from "@/typings/user";

import "./index.less";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;
type Props = StateProps & DispatchProps;

function Login(props: Props) {
  const onFinish = (values: LoginPayload) => {
    props.login(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    message.error("表单验证失败" + errorInfo);
  };

  return (
    <>
      <NavHeader title="登录" />
      <Form
        className="user-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
          或者
          <Link to="/register">立刻注册!</Link>
        </Form.Item>
      </Form>
    </>
  );
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect(mapStateToProps, actionCreators)(Login);
