import { useEffect } from 'react';

import { Modal, Notification } from '@components/ui';

import { useUI } from '../context';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  const { showModal, closeModal, modalFlag, modalContent, notiFlag, closeNoti, notiContent } =
    useUI();

  useEffect(() => {
    // Initialize deferredPrompt for use later to show browser install prompt.
    let deferredPrompt;
    console.log('hello2');
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('hello');
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      showModal({
        title: 'install?',
        content: 'real',
        actionButton: { onClick: () => {}, label: 'yes' },
        cancelButton: { onClick: () => closeModal(), label: 'no' },
      });
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }, []);

  return (
    <div className="relative h-full w-full">
      <main className="relative h-full">{children}</main>

      <Modal show={modalFlag} {...modalContent} />
      <Notification show={notiFlag} close={closeNoti} {...notiContent} />
    </div>
  );
}
