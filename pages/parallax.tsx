import cn from 'classnames';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';

export default function ParallaxPage() {
  const [inViewRef, inView] = useInView({ rootMargin: '300px' });
  const [inViewRef2, inView2] = useInView({ rootMargin: '300px' });
  const [inViewRef3, inView3] = useInView({ rootMargin: '300px' });
  const [inViewRef4, inView4] = useInView({ rootMargin: '300px' });
  const [inViewRef5, inView5] = useInView({ rootMargin: '300px' });

  const [{ x }, api] = useSpring(() => ({
    x: 100,
    config: { duration: 300 },
  }));

  useEffect(() => {
    if (inView) {
      api({
        x: 100,
      });
    } else {
      api({
        x: 0,
      });
    }
  }, [inView, api]);

  useEffect(() => {
    if (inView2) {
      api({
        x: 0,
      });
    } else {
      api({
        x: 100,
      });
    }
  }, [inView2, api]);

  useEffect(() => {
    if (inView3) {
      api({
        x: 100,
      });
    } else {
      api({
        x: 0,
      });
    }
  }, [inView3, api]);

  useEffect(() => {
    if (inView4) {
      api({
        x: 0,
      });
    } else {
      api({
        x: 100,
      });
    }
  }, [inView4, api]);

  useEffect(() => {
    if (inView5) {
      api({
        x: 100,
      });
    } else {
      api({
        x: 0,
      });
    }
  }, [inView5, api]);

  return (
    <div>
      <div className="h-[1200px]" />

      <animated.div
        style={{ left: x.to((x) => `${x}%`) }}
        className={'mx-60 w-60 h-40 bg-red-400 rounded-md sticky top-40'}
      >
        <p className="text-center text-2xl">a sticky layer</p>
      </animated.div>

      <div className="h-[1200px] flex bg-gray-100 items-center">
        <p ref={inViewRef} className="text-4xl ml-60">
          Hello
        </p>
      </div>
      <div className="h-[1200px] flex justify-end bg-gray-200 items-center">
        <p ref={inViewRef2} className="text-4xl mr-60">
          Hello2
        </p>
      </div>
      <div className="h-[1200px] flex bg-gray-300 items-center">
        <p ref={inViewRef3} className="text-4xl ml-60">
          Hello3
        </p>
      </div>
      <div className="h-[1200px] flex justify-end bg-gray-400 items-center">
        <p ref={inViewRef4} className="text-4xl mr-60">
          Hello4
        </p>
      </div>
      <div className={cn('h-[1200px] flex bg-gray-500 items-center')}>
        <p ref={inViewRef5} className="text-4xl ml-60">
          Hello5
        </p>
      </div>
    </div>
  );
}
