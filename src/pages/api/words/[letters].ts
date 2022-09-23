// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import rawWords from "../../../words.json";
const words = rawWords as Array<string>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  let { letters } = req.query;
  if (!letters) {
    return res.status(400).json(["no amount"]);
  }

  if (Array.isArray(letters)) {
    letters = letters.join("");
  }
  const length = parseInt(letters);
  if (isNaN(length)) {
    return res.status(400).json(["not a number"]);
  }

  const filteredWords = words.filter((word) => word.length === length);

  res.status(200).json(filteredWords);
}
