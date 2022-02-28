import { useRef } from 'react';
import { useMouse } from 'react-use';

import { MemoTestButton, TestButton } from '@components/ui';

export default function ReactMemoPage() {
  const divRef = useRef<HTMLDivElement>(null);

  useMouse(divRef);

  return (
    <div ref={divRef} className="text-center pt-20 text-xl">
      <p>This page is re-rendering everytime</p>
      <div className="mt-4 space-x-2">
        <MemoTestButton />
        <TestButton />
      </div>
    </div>
  );
}
