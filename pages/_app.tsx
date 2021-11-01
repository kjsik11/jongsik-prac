import '@assets/main.css';
import 'nprogress/nprogress.css';

import { useRouter } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import { useCallback, useEffect, useState } from 'react';
import { SWRConfig } from 'swr';

import ManagedUIContext from '@components/context';
import { CommonLayout } from '@components/layout';

import { fetcher, swrFetcher } from '@lib/fetcher';

import type { AppProps } from 'next/app';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const [check, setCheck] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', NProgress.start);
    router.events.on('routeChangeComplete', NProgress.done);
    router.events.on('routeChangeError', NProgress.done);

    return () => {
      router.events.off('routeChangeStart', NProgress.start);
      router.events.off('routeChangeComplete', NProgress.done);
      router.events.off('routeChangeError', NProgress.done);
    };
  }, [router]);

  useEffect(() => {
    function askPermission() {
      return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
          resolve(result);
        });

        if (permissionResult) {
          permissionResult.then(resolve, reject);
        }
      }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
          throw new Error("We weren't granted permission.");
        }
      });
    }

    askPermission();
  }, []);

  const saveSubscription = useCallback(async (subscriptionOption: any) => {
    try {
      await fetcher
        .post('/api/save-subscription', {
          json: { sub: subscriptionOption },
        })
        .json();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    function subscribeUserToPush() {
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
    }

    subscribeUserToPush().then((subscriptionObject) => {
      setCheck(subscriptionObject);
      saveSubscription(subscriptionObject);
    });
  }, [saveSubscription]);

  return (
    <>
      <Script src="/js/redirectIE.js" strategy="beforeInteractive" />
      <ManagedUIContext>
        <SWRConfig value={{ fetcher: swrFetcher }}>
          <CommonLayout>
            {JSON.stringify(check)}
            <Component {...pageProps} />
          </CommonLayout>
        </SWRConfig>
      </ManagedUIContext>
    </>
  );
}
