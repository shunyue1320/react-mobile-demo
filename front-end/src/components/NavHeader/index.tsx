import React, { PropsWithChildren } from "react";
import "./index.less";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type Props = PropsWithChildren<{ title: string }>;

function NavHeader(props: Props) {
  const navigate = useNavigate();

  return (
    <div className="nav-header">
      <LeftOutlined onClick={() => navigate(-1)} />
      {props.title}
    </div>
  )
}

export default NavHeader;