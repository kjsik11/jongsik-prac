import { memo } from 'react';

function MemoTestButton() {
  console.log('memo button re-rendered');
  return <button className="bg-sky-400 rounded-md text-white p-4">Memo Button</button>;
}

const MemoizedMemoTestButton = memo(MemoTestButton);
export default MemoizedMemoTestButton;
