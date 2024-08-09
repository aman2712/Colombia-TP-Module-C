import jwt from "jsonwebtoken";

export default function generateToken(payload) {
  const token = jwt.sign(
    {
      ...payload,
      password: undefined,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return token
}
