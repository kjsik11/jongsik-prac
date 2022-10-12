import { withErrorHandler } from '@utils/with-error-handler';

import Image from '../../public/images/404.png';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    console.log(req.headers['user-agent']);
    return res.send(Image);
  }
};

export default withErrorHandler(handler);
