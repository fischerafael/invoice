import type { NextApiRequest, NextApiResponse } from "next";
import { clientServices } from "src/services/client";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { query } = req;
  const { id } = query;

  const { data, error } = await clientServices.getOne(id as string);

  if (error) {
    res.status(400).json({ error });
  }
  return res.status(200).json({ data });
};
