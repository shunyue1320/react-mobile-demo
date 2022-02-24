import React, { PropsWithChildren } from "react";
import { Card, Button } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { getLesson } from "@/api/home";
import NavHeader from "@/components/NavHeader";
import { Lesson, LessonResult } from "@/typings/lesson";
import actionCreators from "@/store/actionCreators/cart";
import { CombinedState } from "@/store/reducers";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;
type Props = StateProps & DispatchProps;

function Detail(props: Props) {
  const [lesson, setLesson] = React.useState<Partial<Lesson>>({});
  const params = useParams();

  React.useEffect(() => {
    (async function () {
      const { id } = params;
      const result = await getLesson<LessonResult>(id);
      setLesson(result.data);
    })();
  }, []);

  const addCartItem = (lesson: Lesson) => {
    let video: HTMLVideoElement = document.querySelector("#lesson-video");
    let cart: HTMLSpanElement = document.querySelector(
      ".anticon.anticon-shopping"
    );
    let { offsetWidth: videoOffsetWidth, offsetHeight: videoOffsetHeight } =
      video;
    let { left: videoLeft, top: videoTop } = video.getBoundingClientRect();

    let { offsetWidth: cartOffsetWidth, offsetHeight: cartOffsetHeight } = cart;
    let { right: cartRight, bottom: cartBottom } = cart.getBoundingClientRect();

    let clonedVideo: HTMLVideoElement = video.cloneNode(
      true
    ) as HTMLVideoElement;
    clonedVideo.style.cssText = `
       z-index: 1000;
       opacity: .8;
       position:fixed;
       width:${videoOffsetWidth}px;
       height:${videoOffsetHeight}px;
       top:${videoTop}px;
       left:${videoLeft}px;
       transition:all 2s ease-in-out;
    `;
    document.body.appendChild(clonedVideo);
    setTimeout(() => {
      clonedVideo.style.left = cartRight - cartOffsetWidth / 2 + "px";
      clonedVideo.style.top = cartBottom - cartOffsetHeight / 2 + "px";
      clonedVideo.style.width = "0px";
      clonedVideo.style.height = "0px";
      clonedVideo.style.opacity = "0";
    }, 16);
    props.addCartItem(lesson);
  };

  return (
    <>
      <NavHeader title={lesson.title} />
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={<video src={lesson.video} controls autoPlay={false} />}
        id="lesson-video"
      >
        <Card.Meta
          title={lesson.title}
          description={
            <>
              <p>价格:{lesson.price}</p>
              <p>
                <Button
                  className="add-cart"
                  onClick={() => addCartItem(lesson as Lesson)}
                >
                  加入购物车
                </Button>
              </p>
            </>
          }
        />
      </Card>
    </>
  );
}

const mapStateToProps = (state: CombinedState): CombinedState => state;
export default connect(mapStateToProps, actionCreators)(Detail);
