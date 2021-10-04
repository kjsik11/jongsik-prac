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
    x: 0,
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
      <div className="h-[1000px] flex justify-center items-center max-w-3xl mx-auto">
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use
          it? It is a long established fact that a reader will be distracted by the readable content
          of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using Content here, content
          here, making it look like readable English. Many desktop publishing packages and web page
          editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will
          uncover many web sites still in their infancy. Various versions have evolved over the
          years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
      </div>
      <animated.div
        style={{ left: x.to((x) => `${x}%`) }}
        className={
          'mx-60 w-60 h-40 bg-red-400 rounded-md sticky top-40 flex items-center justify-center'
        }
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
