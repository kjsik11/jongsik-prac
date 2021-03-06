import '@assets/main.css';
import 'nprogress/nprogress.css';

import { useRouter } from 'next/router';
import Script from 'next/script';
import NProgress from 'nprogress';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SWRConfig } from 'swr';

import ManagedUIContext from '@components/context';
import { CommonLayout } from '@components/layout';

import { swrFetcher } from '@lib/fetcher';

import type { AppProps } from 'next/app';

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 500,
  showSpinner: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
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

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <Script src="https://cdn-tailwindcss.vercel.app/" />
      )}
      <Script src="/js/redirectIE.js" strategy="beforeInteractive" />
      <ManagedUIContext>
        <SWRConfig value={{ fetcher: swrFetcher }}>
          <QueryClientProvider client={queryClient}>
            <CommonLayout>
              <Component {...pageProps} />
            </CommonLayout>
          </QueryClientProvider>
        </SWRConfig>
      </ManagedUIContext>
    </>
  );
}
