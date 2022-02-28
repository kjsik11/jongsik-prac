import { useRef, useState } from 'react';
import { useMouse } from 'react-use';

import { Button, MemoTestButton, TestButton, TestModal } from '@components/ui';

export default function ReactMemoPage() {
  const [openModal, setOpenModal] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useMouse(divRef);

  return (
    <div ref={divRef} className="text-center pt-20 text-xl">
      <p>This page is re-rendering everytime</p>
      <div className="mt-4 space-x-2">
        <MemoTestButton>Memo Button</MemoTestButton>
        <TestButton>Normal Button</TestButton>
        <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
        <TestModal open={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </div>
  );
}
