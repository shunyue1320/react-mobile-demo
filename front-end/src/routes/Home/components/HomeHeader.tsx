import React from "react";
import classnames from "classnames";

import logo from "@/assets/images/logo.png";
import { BarsOutlined } from "@ant-design/icons";
import { Transition } from "react-transition-group";
import "./index.less";

const duration = 1000;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
interface TransitionStyles {
  entering: React.CSSProperties; //进入时的样式
  entered: React.CSSProperties; //进入成功时的样式
  exiting: React.CSSProperties; //退出时的样式
  exited: React.CSSProperties; //退出成功时的样式
}
const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
interface Props {
  currentCategory: string;
  setCurrentCategory: Function;
}

function HomeHeader(props: Props) {
  let [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLLIElement = event.target as HTMLLIElement;
    let category = target.dataset.category;
    props.setCurrentCategory(category);
    setIsMenuVisible(false);
  };

  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo} />
        <BarsOutlined onClick={() => setIsMenuVisible(!isMenuVisible)} />
      </div>
      <Transition in={isMenuVisible} timeout={duration}>
        {(state: keyof TransitionStyles) => (
          <ul
            className="category"
            onClick={setCurrentCategory}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <li
              data-category="all"
              className={classnames({
                active: props.currentCategory === "all",
              })}
            >
              全部课程
            </li>
            <li
              data-category="react"
              className={classnames({
                active: props.currentCategory === "react",
              })}
            >
              React课程
            </li>
            <li
              data-category="vue"
              className={classnames({
                active: props.currentCategory === "vue",
              })}
            >
              Vue课程
            </li>
          </ul>
        )}
      </Transition>
    </header>
  );
}

export default HomeHeader;
