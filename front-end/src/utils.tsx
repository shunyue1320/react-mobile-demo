export function loadMore(element: HTMLElement, callback: Function) {
  function _loadMore() {
    let clientHeight = element.clientHeight;
    let scrollTop = element.scrollTop;
    let scrollHeight = element.scrollHeight;
    if (clientHeight + scrollTop + 10 >= scrollHeight) {
      callback();
    }
  }
  element.addEventListener("scroll", debounce(_loadMore, 300));
}

export function debounce(fn: Function, wait: number) {
  let timeout: any = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, wait);
  };
}

export function downRefresh(element: HTMLElement, callback: Function) {
  //存放下拉的时候的起始纵坐标
  let startY: number;
  // 本次下拉的距离
  let distance: number;
  //在下拉前此元素距离 顶部的距离 100px;
  let originTop = element.offsetTop;
  //开始的top值
  let startTop: number;

  //移动端 touchstart touchmove touchend
  element.addEventListener("touchstart", (event: TouchEvent) => {
    const touchMove = throttle(_touchMove, 50);
    if (element.scrollTop === 0) {
      startTop = element.offsetTop; //刚开始下拉的offsetTop
      startY = event.touches[0].pageY; //开始下拉时的纵坐标

      element.addEventListener("touchmove", touchMove);
      element.addEventListener("touchend", touchEnd);
    }

    function _touchMove(event: TouchEvent) {
      //在移动过程中获取最新的pageY
      let pageY = event.touches[0].pageY;
      //新纵坐标大于开始的纵坐标说明是下拉
      if (pageY > startY) {
        distance = pageY - startY;
        element.style.top = startTop + distance + "px";
      } else {
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
      }
    }
    function touchEnd(event: TouchEvent) {
      element.removeEventListener("touchmove", touchMove);
      element.removeEventListener("touchend", touchEnd);
      if (distance > 30) {
        callback();
      }
      /* const timer = setInterval(() => {
            let currentTop = element.offsetTop;
            if (currentTop - originTop >= 1) {
                element.style.top = currentTop - 1 + 'px'
            } else {
                element.style.top = originTop + 'px';
                clearInterval(timer);
            }
        }, 16); */
      //你这个间隔时间改成多少都没用
      //1.浏览 器每一帧的时间不一样。

      function back() {
        let currentTop = element.offsetTop;
        if (currentTop - originTop >= 1) {
          element.style.top = currentTop - 1 + "px";
          requestAnimationFrame(back);
        } else {
          element.style.top = originTop + "px";
        }
      }
      requestAnimationFrame(back);
    }
  });
}


export function throttle(func: Function, delay: number) {
  let prev = Date.now();
  return function (...args: any[]) {
    let context = this;
    let now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = now;
    }
  }
}