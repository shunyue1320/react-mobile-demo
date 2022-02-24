import React, { PropsWithChildren, RefObject } from "react";
import { Lessons } from "@/store/reducers/home";
import { Lesson } from "@/typings/lesson";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Card, Button, Alert, Skeleton } from "antd";
import "./index.less";

type Props = PropsWithChildren<{
  lessons: Lessons;
  getLessons: any;
  homeContainerRef: RefObject<any>;
}>;

function LessonList(props: Props, forwardRef: any) {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    if (props.lessons.list.length === 0) {
      props.getLessons();
    }
    forwardRef.current = forceUpdate;
  }, []);

  //计算start和end值，然后根据start和end获取要渲染的元素
  const homeContainer = props.homeContainerRef.current;
  //start=向上卷去的高度/每项的高度
  //320轮播图的高度 + 65是h2标题的高度/75=多少个rem
  //一个rem等于多少个像素px
  const remSize: number = parseFloat(document.documentElement.style.fontSize);
  //获取每个条目的高度
  const itemSize = (650 / 75) * remSize;
  let start = 0,
    end = 0;
  if (homeContainer) {
    //向上卷去的高度 homeContainer总卷去的高度减去轮播图和h2标题的高度就是课程列表向上卷去的高度
    const scrollTop = homeContainer.scrollTop - ((320 + 65) / 75) * remSize;
    //从哪个索引开始显示
    start = Math.floor(scrollTop / itemSize);
    const screenHeight = window.innerHeight - (220 / 75) * remSize;
    end = start + Math.floor(screenHeight / itemSize);
    start -= 2;
    end += 2;
    start = start < 0 ? 0 : start;
    end = end > props.lessons.list.length ? props.lessons.list.length : end;
  }
  const visibleLessonList: VisibleLesson[] = props.lessons.list
    .map((item: Lesson, index: number) => ({ ...item, index }))
    .slice(start, end);
  const itemStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: itemSize,
  };

  return (
    <section className="lesson-list">
      <h2>
        <MenuOutlined />
        全部课程
      </h2>

      <Skeleton
        loading={props.lessons.loading && props.lessons.list.length === 0}
        active
        paragraph={{ rows: 8 }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${props.lessons.list.length * itemSize}px`,
          }}
        >
          {visibleLessonList.map((lesson: VisibleLesson) => {
            return (
              <Link
                key={lesson.id}
                to={{ pathname: `/detail/${lesson.id}` }}
                style={{ ...itemStyle, top: `${itemSize * lesson.index}px` }}
              >
                <Card
                  hoverable={true}
                  style={{ width: "100%" }}
                  cover={<img alt={lesson.title} src={lesson.poster} />}
                >
                  <Card.Meta
                    title={lesson.title}
                    description={`价格:${lesson.price}元`}
                  />
                </Card>
              </Link>
            );
          })}
        </div>
      </Skeleton>

      {props.lessons.hasMore ? (
        <Button
          block
          type="primary"
          loading={props.lessons.loading}
          onClick={props.getLessons}
        >
          {props.lessons.loading ? "" : "加载更多"}
        </Button>
      ) : (
        <Alert
          style={{ textAlign: "center" }}
          message="到底了"
          type="warning"
        />
      )}
    </section>
  );
}

export default LessonList;
