import { memo } from 'react';

interface Props {
  children: React.ReactChild;
}

function MemoTestButton({ children }: Props) {
  console.log('memo button re-rendered');
  return <button className="bg-sky-400 rounded-md text-white p-4">{children}</button>;
}

const MemoizedMemoTestButton = memo(MemoTestButton);
export default MemoizedMemoTestButton;
