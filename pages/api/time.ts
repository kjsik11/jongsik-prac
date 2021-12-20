import { withErrorHandler } from '@utils/with-error-handler';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const currentTime = new Date();
    return res.json({ time: currentTime });
  }
};

export default withErrorHandler(handler);
