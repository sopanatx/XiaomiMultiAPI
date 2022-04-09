// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import MiIOApi from "../../../lib/Api";
import MiIOAuth from "../../../lib/Auth";
let authMiIO = new MiIOAuth();
let apiMiIO = new MiIOApi();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  let { username, password, country } = req.body;
  if (!username || !password || !country) {
    res.status(400).json({
      statusCode: 400,
      message: "username,password,country is required",
    });
    return;
  }
  let { userId, token, ssecurity } = await authMiIO.login(username, password);
  res.status(200).json({
    status: 200,
    message: "login success",
    time: Date.now(),
    miio_response: {
      userId,
      token,
      ssecurity,
    },
  });
}
