import useRecorder from '@lib/hooks/use-recoder';

export default function RecorderPage() {
  const { audioURL, isRecording, startRecording, stopRecording } = useRecorder();

  return (
    <div className="App">
      <audio src={audioURL} controls />
      <button onClick={startRecording} disabled={isRecording}>
        start recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </button>

      <p>
        <em>(On Codesandbox pop out the preview into a window to get a user media request.)</em>
      </p>
    </div>
  );
}
