import { BlockFrostAPI } from '@blockfrost/blockfrost-js';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const API = new BlockFrostAPI({
    projectId: process.env.BLOCKFROST_API || '',
  });
  const Data = await API.poolsByIdDelegators(req.headers.api_key as string);
  res.status(200).json(Data);
}
