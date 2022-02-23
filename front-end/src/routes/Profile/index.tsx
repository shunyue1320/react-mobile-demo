import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { message, Descriptions, Button, Alert, Upload } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";

import { CombinedState } from "@/store/reducers";
import { ProfileState } from "@/store/reducers/profile";
import actionCreators from "@/store/actionCreators/profile";
import LOGIN_TYPES from "@/typings/login-types";
import NavHeader from "@/components/NavHeader";

import "./index.less";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;
type Props = StateProps & DispatchProps;

function Profile(props: Props) {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    (props.validate() as any).catch((error: AxiosError) => message.error(error.message));
  }, []);

  //每当上传文件的状态发生改变就会调用回调
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      setLoading(false);
      let { success, data, message } = info.file.response;
      if (success) {
        props.changeAvatar(data);
      } else {
        message.error(message);
      }
    }
  };

  let content; //存放将要显示的内容

  if (props.loginState === LOGIN_TYPES.UN_VALIDATE) {
    content = null;
  } else if (props.loginState === LOGIN_TYPES.LOGIN_ED) {
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <UploadOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    );

    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="http://ketang.zhufengpeixun.com/user/uploadAvatar"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {props.user.avatar ? (
                <img
                  src={props.user.avatar}
                  alt="头像"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary" onClick={() => props.logout()}>
          退出登录
        </Button>
      </div>
    );
  } else {
    content = (
      <>
        <Alert
          type="warning"
          message="你尚未登录"
          description="请选择注册或登录"
        />
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Button type="dashed" onClick={() => navigate("/login")}>
            登录
          </Button>
          <Button
            type="dashed"
            style={{ marginLeft: "50px" }}
            onClick={() => navigate("/register")}
          >
            注册
          </Button>
        </div>
      </>
    );
  }

  return (
    <section>
      <NavHeader title="个人中心" />
      {content}
    </section>
  );
}

function beforeUpload(file: any) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) message.error('你只能上传JPG或PNG');
	const isLessThan2M = file.size < 2 * 1024 * 1024;
	if (!isLessThan2M) message.error('图片不能大于2M');
	return isJpgOrPng && isLessThan2M;
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile;
export default connect(mapStateToProps, actionCreators)(Profile);
