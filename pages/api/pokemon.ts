import type { NextApiRequest, NextApiResponse } from "next";

import pokemon from "../../data/pokemon.json";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof pokemon>
) {
  res.status(200).json(pokemon);
}
