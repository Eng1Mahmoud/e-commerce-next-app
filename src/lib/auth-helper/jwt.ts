import jwt from 'jsonwebtoken';

// creat token with user id
export const createToken = (userId: string,role:string) => {
  return jwt.sign({ userId,role }, process.env.NEXTAUTH_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as string,
  });
};

// verify token
export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
};

// decode token
export const decodeToken = (token: string) => {
  return jwt.decode(token);
};

