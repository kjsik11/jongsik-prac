/**
 * @template PageComponent
 */

import { useState } from 'react';
import NextLink from 'next/link';

import { useUI } from '@components/context';
import { Button } from '@components/ui';
import { fetcher } from '@lib/fetcher';

export default function IndexPage() {
  const { showAlert, showModal, closeModal, showNoti } = useUI();
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="flex justify-center pt-24">
      <p className="text-2xl font-semibold">Jongsik Prac</p>
    </div>
  );
}
