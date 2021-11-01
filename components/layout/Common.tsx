import { useEffect, useRef } from 'react';

import { Modal, Notification } from '@components/ui';

import { useUI } from '../context';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  const { showModal, closeModal, modalFlag, modalContent, notiFlag, closeNoti, notiContent } =
    useUI();

  const deferredPrompt = useRef<any>(null);

  useEffect(() => {
    // Initialize deferredPrompt for use later to show browser install prompt.

    console.log('Listening for Install prompt');

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt.current = e;
      // Update UI notify the user they can install the PWA
      if (deferredPrompt.current)
        showModal({
          title: 'install?',
          content: 'real',
          actionButton: {
            onClick: () => {
              deferredPrompt.current.prompt();
              console.log('User accepted the prompt');
              closeModal();
            },
            label: 'yes',
          },
          cancelButton: {
            onClick: () => {
              closeModal();
              console.log('User dismissed the A2HS prompt');
            },
            label: 'no',
          },
        });
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }, [closeModal, showModal]);

  return (
    <div className="relative h-full w-full">
      <main className="relative h-full">{children}</main>

      <Modal show={modalFlag} {...modalContent} />
      <Notification show={notiFlag} close={closeNoti} {...notiContent} />
    </div>
  );
}
