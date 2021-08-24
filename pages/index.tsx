/**
 * @template PageComponent
 */

import { Button, Link } from '@components/ui';
import useContextWithSWR from '@lib/hooks/use-context-with-swr';

export default function IndexPage() {
  const [username, setUsername] = useContextWithSWR<string>('@username', 'kay');

  return (
    <div className="flex flex-col items-center pt-24">
      <p className="text-2xl font-semibold">Jongsik Prac</p>
      <div className="mt-8">
        <p className="text-lg font-semibold">useToggleWithSWR</p>
        <p>swrValue: {String(username)}</p>
        <div className="mt-2">
          <Button
            onClick={() => {
              setUsername('jongsik');
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
      </div>
    </div>
  );
}
