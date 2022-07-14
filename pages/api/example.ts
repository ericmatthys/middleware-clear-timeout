import { NextApiRequest, NextApiResponse } from 'next';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await delay(500);
  res.status(200).json({ name: 'calvin' })
}
