import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken"; 

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const tokenData = await getToken({ req, secret });

  if (!tokenData) {
    return res.status(401).json({ error: "No token found" });
  }

  const jwtToken = jwt.sign(tokenData, secret);
  res.status(200).json({ token: jwtToken });
}