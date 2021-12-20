import { Button } from '@components/ui';

import useRecorder from '@lib/hooks/use-recoder';

export default function RecorderPage() {
  const { audioURL, isRecording, startRecording, stopRecording } = useRecorder();

  return (
    <div className="mx-auto max-w-2xl mt-20">
      <audio src={audioURL} controls />
      <div className="space-x-2 my-4">
        <Button onClick={startRecording} disabled={isRecording}>
          start recording
        </Button>
        <Button onClick={stopRecording} disabled={!isRecording}>
          stop recording
        </Button>
      </div>
    </div>
  );
}
