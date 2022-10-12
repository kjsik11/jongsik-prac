import got from 'got';

import { withErrorHandler } from '@utils/with-error-handler';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const image = await got(
      'https://cox-tech-blog.s3.ap-northeast-2.amazonaws.com/images/original/12+(1).jpg',
    );

    if (req.headers['user-agent']?.includes('Chrome')) {
      res.status(302);
      res.redirect('/');
      return;
    } else {
      res.setHeader('Content-Type', 'image/png');
      return res.send(image.rawBody);
    }
  }
};

export default withErrorHandler(handler);
