/**
 * @template PageComponent
 */

import { useCallback, useState } from 'react';

import { Button, Link } from '@components/ui';

import useContextWithSWR from '@lib/hooks/use-context-with-swr';

export default function IndexPage() {
  const [username, setUsername] = useContextWithSWR<string>('@username', 'kay');
  const [nameInput, setNameInput] = useState<string>('');

  const subscriptUserToPush = useCallback(() => {
    return navigator.serviceWorker
      .register('/sw.js')
      .then(function (registration) {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey:
            'BOJY0SIfs5CJWgmYVn3o75DS3_Bvt_QaforsjzvGawakqUwcdpqYCUjxqq-qPFRg8iRAq1POivs2xGexbgTh-B8',
        };

        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(function (pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
      });
  }, []);

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
        </div>
        <Button onClick={subscriptUserToPush}>Push</Button>
      </div>
    </div>
  );
}
