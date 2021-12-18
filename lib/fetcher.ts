import ky from 'ky';

export const fetcher = ky.extend({
  hooks: {
    afterResponse: [
      async (_req, _opt, res) => {
        console.log('fetched');
        if (!res.ok) {
          const contentType = res.headers.get('Content-Type');
          if (!contentType || contentType.indexOf('application/json') === -1)
            throw await res.text();
          throw await res.json();
        }
      },
    ],
  },
});

export const swrFetcher: <T>(url: string, init?: RequestInit) => Promise<T> = async (url, init) => {
  return await fetcher(url, init).json();
};
