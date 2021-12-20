import { useCallback, useEffect, useState } from 'react';

export default function useRecorder() {
  const [audioURL, setAudioURL] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const resetRecorder = useCallback(async () => {
    setAudioURL('');
    setIsRecording(false);
    setRecorder(null);
    if (recorder) recorder.stream.getTracks().forEach((track) => track.stop());
  }, [recorder]);

  const requestRecorder = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    return new MediaRecorder(stream);
  }, []);

  const startRecording = useCallback(() => {
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    const handleData = (e: MediaRecorderEventMap['dataavailable']) => {
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener('dataavailable', handleData);
    return () => recorder.removeEventListener('dataavailable', handleData);
  }, [recorder, isRecording, requestRecorder]);

  return { audioURL, isRecording, startRecording, stopRecording, resetRecorder };
}
