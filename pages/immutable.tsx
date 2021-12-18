import moment from 'moment';
import useSWRImmutable from 'swr/immutable';

import { Loading } from '@components/core';
import 'moment/locale/ko';

export default function SwrImmutable() {
  const { data } = useSWRImmutable('/api/immutable');

  if (!data) return <Loading />;

  return (
    <div className="mt-4 max-w-5xl mx-auto">
      <p>SWRImmutableData: {moment(new Date(data.currentTime)).fromNow()}</p>
      <p>This value is never revalidate</p>
    </div>
  );
}
