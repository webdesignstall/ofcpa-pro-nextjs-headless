// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {getFooter} from "../../../lib/api";

export default async function handler(req, res) {

  const footer =  await getFooter();

  res.status(200).json({ footer });
}
