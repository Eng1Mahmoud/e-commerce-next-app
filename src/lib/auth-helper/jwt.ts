import jwt from "jsonwebtoken";

// creat token with user id
export const createToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
};

export const verifyToken = (req: any) => {
  const token = req.headers.get("authorization");
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    return decodedToken;
  } catch (error) {
    return {}
  }
};

// decode token
export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
