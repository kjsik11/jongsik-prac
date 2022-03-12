import NextLink from 'next/link';
import { useState } from 'react';

import { Button } from '@components/ui';

import useContextWithSWR from '@lib/hooks/use-context-with-swr';

export default function IndexPage() {
  const [username, setUsername] = useContextWithSWR<string>('@username', 'kay');
  const [nameInput, setNameInput] = useState<string>('');

  return (
    <div className="flex flex-col items-center pt-24">
      <p className="text-2xl font-semibold">Jongsik Prac</p>
      <div className="mt-8">
        <input
          placeholder="input name"
          onChange={(e) => setNameInput(e.target.value)}
          value={nameInput}
          className="border w-60 p-2 border-black rounded-md"
        />
        <p>swrValue: {String(username)}</p>
        <div className="mt-2">
          <Button
            onClick={() => {
              setUsername(nameInput);
            }}
            size="sm"
          >
            change name
          </Button>
          <NextLink href="/swr">
            <Button size="sm" className="ml-2">
              go another page
            </Button>
          </NextLink>
        </div>
        <div className="mt-12">
          <p className="text-lg mb-2 font-bold">Other practices</p>
          <NextLink passHref href="/spring">
            <Button as="a" size="sm">
              react-spring
            </Button>
          </NextLink>
          <NextLink passHref href="/docs">
            <Button as="a" size="sm" className="ml-2">
              docs
            </Button>
          </NextLink>
          <NextLink passHref href="/recorder">
            <Button as="a" size="sm" className="ml-2">
              media-recorder
            </Button>
          </NextLink>
          <NextLink passHref href="/immutable">
            <Button as="a" size="sm" className="ml-2">
              useSwrImmutable test
            </Button>
          </NextLink>
        </div>
        <div className="mt-4 space-x-2">
          <NextLink passHref href="/react-query">
            <Button as="a" size="sm">
              SWR vs React Query
            </Button>
          </NextLink>
          <NextLink passHref href="/react-memo">
            <Button as="a" size="sm">
              React.Memo
            </Button>
          </NextLink>
          <NextLink passHref href="/transition-test">
            <Button as="a" size="sm">
              Trasition Test
            </Button>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
