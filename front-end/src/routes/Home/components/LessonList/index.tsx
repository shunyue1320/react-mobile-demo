import React, { PropsWithChildren } from 'react';
import { Lessons } from '@/store/reducers/home';
import { Lesson } from '@/typings/lesson';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Card, Button, Alert, Skeleton } from 'antd';
import './index.less';

type Props = PropsWithChildren<{
  lessons: Lessons
  getLessons: any
}>;

function LessonList(props: Props) {
  React.useEffect(() => {
    if (props.lessons.list.length === 0) {
      props.getLessons();
    }
  }, []);

  return (
    <section className='lesson-list'>
      <h2>
        <MenuOutlined />
        全部课程
      </h2>

      <Skeleton
        loading={props.lessons.loading || props.lessons.list.length == 0}
        active
        paragraph={{ rows: 8 }}
      >
        {
          props.lessons.list.map((lesson: Lesson, index: number) => {
            return (
              <Link
                key={lesson.id}
                to={{ pathname: `/detail/${lesson.id}`}}
              >
                <Card
                  hoverable={true}
                  style={{ width: "100%" }}
                  cover={<img alt={lesson.title} src={lesson.poster} />}
                >
                  <Card.Meta 
                    title={lesson.title}
                    description={`价格：${lesson.price}元`}
                  />
                </Card>
              </Link>
            )
          })
        }
      </Skeleton>

      {
        props.lessons.hasMore ? (
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
        )
      }
    </section>
  )
}

export default LessonList;