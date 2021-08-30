import useSWR from 'swr';
import { KeyedMutator } from 'swr/dist/types';

export default function useContextWithSWR<T>(key: string, initial: T): [T, KeyedMutator<T>] {
  const { data: state, mutate: setState } = useSWR<T>(key, {
    fallbackData: initial,
    fetcher: undefined,
  });

  return [state as never, setState];
}
