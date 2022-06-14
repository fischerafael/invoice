import type { NextApiRequest, NextApiResponse } from "next";
import { clientServices } from "src/services/client";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  // MONTA OS DADOS
  const { method, headers, body } = req;
  const userId = headers.userid as string;

  if (method === "POST") {
    // TENTANDO CRIAR O CLIENT
    const { data, error } = await clientServices.create(body, userId);

    // RETORNANDO SUCESSO OU ERRO
    if (error) {
      res.status(400).json({ error });
    }
    return res.status(200).json({ data });
  }

  const { data, error } = await clientServices.getAll(userId);

  if (error) {
    res.status(400).json({ error });
  }
  return res.status(200).json({ data });
};
