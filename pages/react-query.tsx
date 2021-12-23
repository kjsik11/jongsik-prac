import { useState } from 'react';
import { QueryClient, useQuery } from 'react-query';

import { Loading } from '@components/core';

import { fetcher } from '@lib/fetcher';

export default function ReactQuery() {
  const queryClient = new QueryClient();
  const [text, setText] = useState('');

  const { data, isLoading } = useQuery('time', () => fetcher.get('/api/time').json());
  const { data: myData, isLoading: isLoading2 } = useQuery(
    'imuTime',
    () => fetcher.get('/api/time').json(),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading || isLoading2) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto mt-20">
      <p>React query test data</p>
      <p>{JSON.stringify(data)}</p>
      <p>React query immutable test data</p>
      <p>{JSON.stringify(myData)}</p>
    </div>
  );
}
