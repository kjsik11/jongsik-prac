/**
 * @template PageComponent
 */

import { useState } from 'react';

import { Button, Link } from '@components/ui';

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
          <Link href="/swr">
            <Button size="sm" className="ml-2">
              go another page
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          <Link href="/spring">
            <Button size="sm" className="ml-2">
              react-spring
            </Button>
          </Link>
          <Link href="/docs">
            <Button size="sm" className="ml-2">
              docs
            </Button>
          </Link>
          <Link href="/recorder">
            <Button size="sm" className="ml-2">
              media-recorder
            </Button>
          </Link>
          <Link href="/immutable">
            <Button size="sm" className="ml-2">
              useSwrImmutable test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
