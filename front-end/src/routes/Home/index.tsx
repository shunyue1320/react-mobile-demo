import React from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import HomeHeader from "./components/HomeHeader";
import LessonList from "./components/LessonList";
import HomeSliders from "./components/HomeSliders";
import actionCreators from "@/store/actionCreators/home";

import { loadMore, downRefresh, throttle } from "@/utils";
import type { CombinedState } from "@/store/reducers";
import type { HomeState } from "@/store/reducers/home";
import "./index.less";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;
type Props = StateProps & DispatchProps;

function Home(props: Props) {
  const homeContainerRef = React.useRef(null);
  const lessonListRef = React.useRef(null);

  React.useEffect(() => {
    loadMore(homeContainerRef.current, props.getLessons);
    downRefresh(homeContainerRef.current, props.refreshLesson);

    lessonListRef.current();
    //监听容器的滚动事件，当滚动发生时重新计算要渲染的DOM元素
    homeContainerRef.current.addEventListener(
      "scroll",
      throttle(lessonListRef.current, 16)
    );
    homeContainerRef.current.addEventListener(
      "scroll",
      throttle(() => {
        sessionStorage.setItem("scrollTop", homeContainerRef.current.scrollTop);
      }, 16)
    );
  }, []);

  React.useEffect(() => {
    let scrollTop = sessionStorage.getItem("scrollTop");
    if (scrollTop) {
      homeContainerRef.current.scrollTop = scrollTop;
    }
  });

  return (
    <>
      {/* <Spin size="large" /> */}
      <HomeHeader
        setCurrentCategory={props.setCurrentCategory}
        currentCategory={props.currentCategory}
      />
      <div className="home-container" ref={homeContainerRef}>
        <HomeSliders sliders={props.sliders} getSliders={props.getSliders} />
        <LessonList
          ref={lessonListRef}
          homeContainerRef={homeContainerRef}
          lessons={props.lessons}
          getLessons={props.getLessons}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(mapStateToProps, actionCreators)(Home);
