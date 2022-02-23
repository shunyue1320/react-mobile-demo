import NavHeader from '@/components/NavHeader';
import React, { PropsWithChildren } from 'react';
import { Lesson, LessonResult } from "@/typings/lesson";
import { Card } from "antd";
import { useParams } from 'react-router-dom';
import { getLesson } from "@/api/home";
type Props = PropsWithChildren<{}>

function Detail(props: Props) {
  const [ lesson, setLesson ] = React.useState<Partial<Lesson>>({});
  const params = useParams();
  React.useEffect(() => {
    (async function () {
      const { id } = params;
      const result = await getLesson<LessonResult>(id);
      setLesson(result.data);
    })();
  }, []);

  return (
    <>
      <NavHeader title={lesson.title} />
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={<video src={lesson.video} controls autoPlay={false} />}
      >
        <Card.Meta title={lesson.title} description={<p>价格：{lesson.price}</p>} />
      </Card>
    </>
  )
}

export default Detail;