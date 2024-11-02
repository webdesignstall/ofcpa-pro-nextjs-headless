// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { siteSetting} from "../../../lib/api";

export default async function handler(req, res) {

  const getSetting = await siteSetting()

  res.status(200).json( getSetting );
}
