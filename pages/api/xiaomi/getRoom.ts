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
  if (req.method != "POST") {
    res.status(400).json({
      statusCode: 400,
      message: "method is not POST",
    });
    return;
  }
  let { userId, token, ssecurity, country } = req.body;
  if (!userId || !token || !ssecurity) {
    res.status(400).json({
      statusCode: 400,
      message: "userId,token,ssecurity is required",
    });
    return;
  }
  let room = await apiMiIO.getRoom(userId, ssecurity, token, country);
  res.status(200).json({
    status: "success",
    time: Date.now().toString(),
    room,
  });
}
