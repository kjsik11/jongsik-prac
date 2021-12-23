import { debounce } from 'lodash';
import NextLink from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { SpringValue } from 'react-spring';
import { useSpring, animated } from 'react-spring';

import { Button } from '@components/ui';

interface TextProps {
  children: string;
  offset: SpringValue<number>;
  pos: number;
  start: number;
  end: number;
}

export default function SpringTestPage() {
  const [styles, api] = useSpring<{ x: number }>(() => ({
    from: { x: 1000 },
  }));

  const { ref, inView, entry } = useInView({ rootMargin: '-230px' });

  useEffect(() => {
    const handler = debounce(() => {
      if (
        inView &&
        entry &&
        (entry.target as any).offsetTop - window.scrollY < 500 &&
        (entry.target as any).offsetTop - window.scrollY > 0
      ) {
        api({
          x: ((entry.target as any).offsetTop - window.scrollY) * 2,
        });
      }
    });

    window.addEventListener('scroll', handler, { passive: false });

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [inView, entry, api]);

  return (
    <div className="mt-40 mx-auto flex flex-col items-center">
      <div className="h-[1000px]" />
      <div
        ref={ref}
        className="relative w-full h-full overflow-y-scroll text-justify text-white bg-black font-bold text-lg"
      >
        <div
          className="p-4"
          style={{ position: 'relative', height: '80vh', width: '100%', overflow: 'hidden' }}
        >
          <animated.div className="w-80 h-80 mt-20 bg-green-300 rounded-md" style={styles} />
        </div>
      </div>
      <div className="mt-4">
        <NextLink passHref href="/">
          <Button className="my-40" as="a">
            Go Home
          </Button>
        </NextLink>
      </div>
    </div>
  );
}
