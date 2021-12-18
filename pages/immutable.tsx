import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

import { Loading } from '@components/core';

export default function SwrImmutable() {
  const { data: swrData } = useSWR('/api/time');
  const { data } = useSWRImmutable('/api/immutable');

  if (!data) return <Loading />;
  if (!swrData) return <Loading />;

  return (
    <div className="mt-4 max-w-5xl mx-auto">
      <p>SWRImmutableData: {data.currentTime}</p>
      <p>This value is never revalidate</p>

      <p className="pt-4">SWRImmutableData: {swrData.time}</p>
      <p>This value is revalidate</p>
    </div>
  );
}
