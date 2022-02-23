import React, { PropsWithChildren } from 'react';
import { Carousel } from 'antd';
import { Slider } from '@/typings/slider';
import './index.less';

type Props = PropsWithChildren<{
  sliders: Slider[]
  getSliders: Function
}>

function HomeSliders(props: Props) {
  React.useEffect(() => {
    if (props.sliders.length == 0) {
      props.getSliders();
    }
  }, [])

  return (
    <Carousel effect="scrollx" autoplay>
      {
        props.sliders.map((item: Slider, index: number) => {
          <div key={index}>
            <img src={item.url} />
          </div>
        })
      }
    </Carousel>
  )
}

export default HomeSliders;