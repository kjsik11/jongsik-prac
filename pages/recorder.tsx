import { Button } from '@components/ui';

import useRecorder from '@lib/hooks/use-recoder';

export default function RecorderPage() {
  const { audioURL, isRecording, startRecording, stopRecording, resetRecorder } = useRecorder();

  return (
    <div className="mx-auto max-w-2xl mt-20">
      <audio src={audioURL} controls />
      <div className="space-x-2 my-4">
        <Button
          className="flex justify-center w-40"
          onClick={isRecording ? stopRecording : startRecording}
          color={isRecording ? 'red' : 'blue'}
        >
          {isRecording ? 'stop' : 'start'}
        </Button>
        <Button onClick={resetRecorder}>Reset</Button>
      </div>
    </div>
  );
}
