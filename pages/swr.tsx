import { Button, Link } from '@components/ui';
import useContextWithSWR from '@lib/hooks/use-context-with-swr';

export default function SWR() {
  const [username, setUsername] = useContextWithSWR<string>('@username', 'kay');

  return (
    <div className="flex flex-col items-center pt-24">
      <div className="mt-8">
        <p className="text-lg font-semibold">useContextWithSWR</p>
        <p>swrValue: {String(username)}</p>
        <Link href="/">
          <Button size="sm" className="ml-2">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
